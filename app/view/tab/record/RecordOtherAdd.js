Ext.define('PatientDiary.view.tab.record.RecordOtherAdd', {
    extend: 'Ext.Container',
    xtype: 'tab_record_recordotheradd',
    requires: [
    		     
    ],
    config: {
		title: '',
		localize:true,
        locales:{
        	title:'YOUR_OTHER_TEST_READING_TITLE'
        },
        layout:{
			type:'vbox'
		},
		scrollable:true,
		items:[
			{
				xtype:'container',
				layout:{
					type:'vbox'
				},
				cls:'add_record_detail',
				defaults:{
					labelWidth: '70%',
					clearIcon:false,
					height: '50px',
					cls: 'input_center',
					style:{
						'font-size':'12px',
						'color':'#b6b2ad',						
					}
				},
				items:[
					{
						xtype: 'textfield',
	                    value:'',
	                    cls:'date_field',
						name: 'date',
						readOnly: true
					},					
					{
						xtype:'numberfield',
						label: '',//Blood pressure<br/>(mmHg)
						value:'0',
						name: 'blood_pressure'
					},
					{
						xtype:'numberfield',
						label: '',//Body Mass Index (BMI)
						value:'0',
						name: 'bmi'
					},
					{
						xtype:'numberfield',
						label: '',//Waist circumference<br/>(inches)
						value:'0',
						name: 'waist_circumference'
					},
					{
						xtype:'container',
						layout:'hbox',
						items:[
							{
								xtype: 'button',
								text: '',
								localize:true,
						        locales:{
						        	text:'SUBMIT_BUTTON_LABEL'
						        },
								cls:'submit_button',
								flex: 1,
								title: 'recordotheraddsubmitbutton'
							},
							{
								xtype: 'button',
								text: '',
								localize:true,
						        locales:{
						        	text:'CANCEL_BUTTON_LABEL'
						        },
								cls:'cancel_button',
								flex: 1,
								title: 'recordotheraddcancelbutton'
							}
						]	
					}
					
				]
			}
		]
    },
	initialize: function() {
		this.callParent(arguments);
		this.resetView();
		if (!this._localized) {
			Ux.locale.Manager.applyLocaleForCmp(this);
			var submitBtn = this.down('button[title = "recordotheraddsubmitbutton"]');
			Ux.locale.Manager.applyLocaleForCmp(submitBtn);
			var cancelBtn = this.down('button[title = "recordotheraddcancelbutton"]');
			Ux.locale.Manager.applyLocaleForCmp(cancelBtn);
			this._localized = true;
		}
	},
	
	setLocale : function(locale) {
		var me = this;
		me.callParent(arguments);
		me._BLOOD_PRESSURE_LABEL = Ux.locale.Manager.get('BLOOD_PRESSURE_LABEL', locale);
		me._bloodPressureField.setLabel(me._BLOOD_PRESSURE_LABEL + '<br/>(mmHg)');
		
		me._BMI_LABEL = Ux.locale.Manager.get('BMI_LABEL', locale);
		me._bmiField.setLabel(me._BMI_LABEL);
		
		me._WAIST_CIRCUMFERENCE_LABEL = Ux.locale.Manager.get('WAIST_CIRCUMFERENCE_LABEL', locale);
		me._waistCircumferenceField.setLabel(me._WAIST_CIRCUMFERENCE_LABEL + '<br/>(inches)');	
	},
	
	updateSelectedDate: function(date) {
		var me = this;
		me._selectedDate = date;
		var dateStr = date.format('dd/mm/yyyy');
		me._dateField.setValue(dateStr);
		//get data for this day
		if (!me._dataStore) {
			me._dataStore = Ext.getStore('Records_Date');
		}
		me._dataStore.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Date",PatientDiary.util.CommonUtil.getLang(),dateStr)
		me._dataStore.load(function(records){
			
			if (records.length == 0) {
				me.assignFields(true, false);
			} else {
				Ext.Array.each(records, function(record, index){
					if (record.data.type == 'other') {
						switch (record.data.pos) {
							case 1:
								me._bloodPressureField.setValue(record.data.value);
							break;
							case 2:
								me._bmiField.setValue(record.data.value);
							break;
							case 3:
								me._waistCircumferenceField.setValue(record.data.value);
							break;						
						}
					}
				});
			}
			
		});
	},
	resetView: function() {
		this.getScrollable().getScroller().scrollToTop();
		this.assignFields(true, true);
	},
	assignFields: function(reset, usetodaydate) {
		var me = this;
		var today = new Date();
		
		if (!me._dateField)
			me._dateField = me.down('textfield[name = "date"]');			
		if (reset && usetodaydate) me.updateSelectedDate(today);
		
		if (!me._bloodPressureField)
			me._bloodPressureField = me.down('numberfield[name = "blood_pressure"]');
		if (reset) me._bloodPressureField.setValue('0');
		
		if (!me._bmiField)
			me._bmiField = me.down('numberfield[name = "bmi"]');
		if (reset) me._bmiField.setValue('0');
		
		if (!me._waistCircumferenceField)
			me._waistCircumferenceField = me.down('numberfield[name = "waist_circumference"]');
		if (reset) me._waistCircumferenceField.setValue('0');
		
		
	},
	getRecordData: function() {
		var me = this;
		var time = me._selectedDate.getTime();
		var dateValue = me._dateField.getValue();
		var dd = me._selectedDate.getDate().toString();
		var mm = me._selectedDate.getMonth().toString();
		var yy = me._selectedDate.getFullYear().toString();
		var dayname = me._selectedDate.getDayName();
		var localetime = (new Date()).format('h:MM TT');//toLocaleTimeString();
		var monthname = me._selectedDate.getShortMonthName().toUpperCase();
		
		var bloodPressureValue = me._bloodPressureField.getValue();
		var bmiValue = me._bmiField.getValue();
		var waistCircumferenceValue = me._waistCircumferenceField.getValue();
		return {
			dateValue: dateValue,
			data:[
				{
					title: me._BLOOD_PRESSURE_LABEL,//'Blood pressure',
					unit: '(mmHg)',
					value: bloodPressureValue,
					color: 'blue',
					date: dateValue,
					pos: 1,
					time: time,
					type: 'other',
					dd: dd,
					mm: mm,
					yy: yy,
					dayname: dayname,
					monthname: monthname,
					localetime:localetime
				},{
					title: me._BMI_LABEL,//'Body Mass Index (BMI)',
					unit: '',
					value: bmiValue,
					color: 'blue',
					date: dateValue,
					pos: 2,
					time: time,
					type: 'other',
					dd: dd,
					mm: mm,
					yy: yy,
					dayname: dayname,
					monthname: monthname,
					localetime:localetime
				},{
					title: me._WAIST_CIRCUMFERENCE_LABEL,//'Waist circumference',
					unit: '(inches)',
					value: waistCircumferenceValue,
					color: 'blue',
					date: dateValue,
					pos: 3,
					time: time,
					type: 'other',
					dd: dd,
					mm: mm,
					yy: yy,
					dayname: dayname,
					monthname: monthname,
					localetime:localetime
				}
			]
		};
	}
 });   