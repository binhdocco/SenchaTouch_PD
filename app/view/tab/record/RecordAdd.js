Ext.define('PatientDiary.view.tab.record.RecordAdd', {
    extend: 'Ext.Container',
    xtype: 'tab_record_recordadd',
    requires: [
    		     
    ],
    config: {
		title: '',
		localize:true,
        locales:{
        	title:'YOUR_BLOOD_TEST_READING_TITLE'
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
					/*{
                        xtype: 'datepickerfield',
                        name: 'date',
                        label: 'Start Date',
                        value: new Date(),
                        picker: {
                            yearFrom: 1980
                        }
                    },*/
					{
						xtype:'numberfield',
						label: '',//Fasting glucose<br/>(mmol/L)
						/*localize:true,
				        locales:{
				        	label:'FASTING_GLUCOSE_LABEL'
				        },*/
						name: 'fasting_glucose',
						value:'0',												
					},
					{
						xtype:'numberfield',
						//label: 'Total cholesterol<br/>(mmol/L)',
						label: '',//Fasting glucose<br/>(mmol/L)
						/*localize:true,
				        locales:{
				        	label:'TOTAL_CHOLESTEROL_LABEL'
				        },*/
						value:'0',
						name: 'total_cholesterol'	
					},
					{
						xtype:'numberfield',
						//label: "LDL 'Bad' cholesterol<br/>(mmol/L)",
						label: '',//Fasting glucose<br/>(mmol/L)
						/*localize:true,
				        locales:{
				        	label:'LDL_BAD_CHOLESTEROL_LABEL'
				        },*/
						value:'0',
						name: 'ldl_bad_cholesterol'						
					},
					{
						xtype:'numberfield',
						//label: "HDL 'Good' cholesterol<br/>(mmol/L)",
						label: '',//Fasting glucose<br/>(mmol/L)
						/*localize:true,
				        locales:{
				        	label:'HDL_GOOD_CHOLESTEROL_LABEL'
				        },*/
						value:'0',
						name: 'hdl_good_cholesterol'	
					},
					{
						xtype:'numberfield',
						//label: 'Triglycerides<br/>(mmol/L)',
						/*label: '',//Fasting glucose<br/>(mmol/L)
						localize:true,
				        locales:{
				        	label:'TRIGLYCERIDES_LABEL'
				        },*/
						value:'0',
						name: 'trigycerides'	
					},
					{
						xtype:'numberfield',
						//label: 'Total cholesterol/HDL<br/>ratio',
						/*label: '',//Fasting glucose<br/>(mmol/L)
						localize:true,
				        locales:{
				        	label:'TOTAL_CHOLESTEROL_HDL_LABEL'
				        },*/
						value:'0',
						name: 'total_cholesterol_hdl_ratio'
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
								title: 'recordaddsubmitbutton'
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
								title: 'recordaddcancelbutton'
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
			var submitBtn = this.down('button[title = "recordaddsubmitbutton"]');
			Ux.locale.Manager.applyLocaleForCmp(submitBtn);
			var cancelBtn = this.down('button[title = "recordaddcancelbutton"]');
			Ux.locale.Manager.applyLocaleForCmp(cancelBtn);
			this._localized = true;
		}
	},
	
	setLocale : function(locale) {
		var me = this;
		me.callParent(arguments);
		me._FASTING_GLUCOSE_LABEL = Ux.locale.Manager.get('FASTING_GLUCOSE_LABEL', locale);
		me._fastingGlucoseField.setLabel(me._FASTING_GLUCOSE_LABEL + '<br/>(mmol/L)');
		
		me._TOTAL_CHOLESTEROL_LABEL = Ux.locale.Manager.get('TOTAL_CHOLESTEROL_LABEL', locale);
		me._totalCholesterolField.setLabel(me._TOTAL_CHOLESTEROL_LABEL + '<br/>(mmol/L)');
		
		me._LDL_BAD_CHOLESTEROL_LABEL = Ux.locale.Manager.get('LDL_BAD_CHOLESTEROL_LABEL', locale);
		me._ldlBadCholesterolField.setLabel(me._LDL_BAD_CHOLESTEROL_LABEL + '<br/>(mmol/L)');
		
		me._HDL_GOOD_CHOLESTEROL_LABEL = Ux.locale.Manager.get('HDL_GOOD_CHOLESTEROL_LABEL', locale);
		me._hdlGoodCholesterolField.setLabel(me._HDL_GOOD_CHOLESTEROL_LABEL + '<br/>(mmol/L)');
		
		me._TRIGLYCERIDES_LABEL = Ux.locale.Manager.get('TRIGLYCERIDES_LABEL', locale);
		me._trigyceridesField.setLabel(me._TRIGLYCERIDES_LABEL  + '<br/>(mmol/L)');
		
		me._TOTAL_CHOLESTEROL_HDL_LABEL = Ux.locale.Manager.get('TOTAL_CHOLESTEROL_HDL_LABEL', locale);
		me._totalCholesterolHdlRatioField.setLabel(me._TOTAL_CHOLESTEROL_HDL_LABEL);
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
					if (record.data.type == 'blood') {
						switch (record.data.pos) {
							case 1:
								me._fastingGlucoseField.setValue(record.data.value);
							break;
							case 2:
								me._totalCholesterolField.setValue(record.data.value);
							break;
							case 3:
								me._ldlBadCholesterolField.setValue(record.data.value);
							break;
							case 4:
								me._hdlGoodCholesterolField.setValue(record.data.value);
							break;
							case 5:
								me._trigyceridesField.setValue(record.data.value);
							break;
							case 6:
								me._totalCholesterolHdlRatioField.setValue(record.data.value);
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
		
		if (!me._fastingGlucoseField)
			me._fastingGlucoseField = me.down('numberfield[name = "fasting_glucose"]');
		if (reset) me._fastingGlucoseField.setValue('0');
		
		if (!me._totalCholesterolField)
			me._totalCholesterolField = me.down('numberfield[name = "total_cholesterol"]');
		if (reset) me._totalCholesterolField.setValue('0');
		
		if (!me._ldlBadCholesterolField)
			me._ldlBadCholesterolField = me.down('numberfield[name = "ldl_bad_cholesterol"]');
		if (reset) me._ldlBadCholesterolField.setValue('0');
		
		if (!me._hdlGoodCholesterolField)
			me._hdlGoodCholesterolField = me.down('numberfield[name = "hdl_good_cholesterol"]');
		if (reset) me._hdlGoodCholesterolField.setValue('0');
		
		if (!me._trigyceridesField)
			me._trigyceridesField = me.down('numberfield[name = "trigycerides"]');
		if (reset) me._trigyceridesField.setValue('0');
		
		if (!me._totalCholesterolHdlRatioField)
			me._totalCholesterolHdlRatioField = me.down('numberfield[name = "total_cholesterol_hdl_ratio"]');
		if (reset) me._totalCholesterolHdlRatioField.setValue('0');
		
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
		
		var fastingGlucoseValue = me._fastingGlucoseField.getValue();				
		var totalCholesterolValue = me._totalCholesterolField.getValue();
		var ldlBadCholesterolValue = me._ldlBadCholesterolField.getValue();
		var hdlGoodCholesterolValue = me._hdlGoodCholesterolField.getValue();
		var trigyceridesValue = me._trigyceridesField.getValue();
		var totalCholesterolHdlRatioValue = me._totalCholesterolHdlRatioField.getValue();
		return {
			dateValue: dateValue,
			data:[
				{
					title: me._FASTING_GLUCOSE_LABEL,//'Fasting glucose',
					unit: '(mmol/L)',
					value: fastingGlucoseValue,
					color: 'orange',
					date: dateValue,
					pos: 1,
					time: time,
					type: 'blood',
					dd: dd,
					mm: mm,
					yy: yy,
					dayname: dayname,
					monthname: monthname,
					localetime:localetime
				},
				{
					title: me._TOTAL_CHOLESTEROL_LABEL,//'Total cholesterol',
					unit: '(mmol/L)',
					value: totalCholesterolValue,
					color: 'blue',
					date: dateValue,
					pos: 2,
					time: time,
					type: 'blood',
					dd: dd,
					mm: mm,
					yy: yy,
					dayname: dayname,
					monthname: monthname,
					localetime:localetime
				},{
					title: me._LDL_BAD_CHOLESTEROL_LABEL,//"LDL 'Bad' cholesterol",
					unit: '(mmol/L)',
					value: ldlBadCholesterolValue,
					color: 'blue',
					date: dateValue,
					pos: 3,
					time: time,
					type: 'blood',
					dd: dd,
					mm: mm,
					yy: yy,
					dayname: dayname,
					monthname: monthname,
					localetime:localetime
				},{
					title: me._HDL_GOOD_CHOLESTEROL_LABEL,//"HDL 'Good' cholesterol",
					unit: '(mmol/L)',
					value: hdlGoodCholesterolValue,
					color: 'blue',
					date: dateValue,
					pos: 4,
					time: time,
					type: 'blood',
					dd: dd,
					mm: mm,
					yy: yy,
					dayname: dayname,
					monthname: monthname,
					localetime:localetime
				},{
					title: me._TRIGLYCERIDES_LABEL,//'Trigycerides',
					unit: '(mmol/L)',
					value: trigyceridesValue,
					color: 'orange',
					date: dateValue,
					pos: 5,
					time: time,
					type: 'blood',
					dd: dd,
					mm: mm,
					yy: yy,
					dayname: dayname,
					monthname: monthname,
					localetime:localetime
				},{
					title: me._TOTAL_CHOLESTEROL_HDL_LABEL,//'Total cholesterol/HDL ratio',
					unit: '',
					value: totalCholesterolHdlRatioValue,
					color: 'blue',
					date: dateValue,
					pos: 6,
					time: time,
					type: 'blood',
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