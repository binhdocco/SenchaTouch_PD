Ext.define('PatientDiary.view.tab.appointment.AppointmentAdd', {
    extend: 'Ext.Container',
    xtype: 'tab_appointment_appointmentadd',
    requires: [
    		     
    ],
    config: {
		title: '',//New Appointment 
		localize:true,
	    locales:{
	    	title:'NEW_APPOINTMENT_LABEL'
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
				cls:'appointmentadd_form',
				defaults:{
					labelWidth: '45%',
					clearIcon:false,
					//height: '50px'
				},
				items:[
					{
	                    xtype: 'textfield',
	                    placeHolder:'Time',	                    
	                    cls:'appointmentadd_time_field',
						name:'time',
						readOnly: true
	                },
	                {
	                    xtype: 'textfield',
	                    placeHolder:'Date',	                    
	                    cls:'appointmentadd_date_field',
						name: 'date',
						readOnly: true	                    
	                },
					{
	                    xtype: 'textfield',
	                    placeHolder:'',	//Doctor name*	                    
	                    localize:true,
					    locales:{
					    	placeHolder:'DOCTOR_NAME_TEXT',
							label: null
					    },                  
	                    cls:'appointmentadd_doctorname_field',
						name: 'doctorname'	                    
	                },
					{
	                    xtype: 'textfield',
						label: '',
	                    placeHolder:'',//Phone	
						localize:true,
					    locales:{
					    	placeHolder:'PHONE_TEXT',
							label: null
					    },                     
	                    cls:'appointmentadd_phone_field',
						name: 'phone'	                    
	                },
					{
	                    xtype: 'textfield',
						label: '',
	                    placeHolder:'',//Location	 
						localize:true,
					    locales:{
					    	placeHolder:'LOCATION_TEXT',
							label: null
					    },                    
	                    cls:'appointmentadd_location_field',
						name: 'location'	                    
	                },
					{
	                    xtype: 'textareafield',
						label: '',
	                    placeHolder:'',//Note on required pre-tests	    
	                    localize:true,
					    locales:{
					    	placeHolder:'NOTE_TEXT',
							label: null
					    },                
	                    cls:'appointmentadd_note_field',
						name: 'note',
						maxRows: 6			                    
	                },
					{
						xtype: 'selectfield',
	                    label: '',//Add reminder
	                    localize:true,
					    locales:{
					    	label:'ADD_REMINDER_LABEL'
					    },
						cls: 'appointmentadd_reminder_field',
	                    options: [						
							{text: '1 minute before',  value: '1'},	//minute
							{text: '30 minutes before',  value: '30'},
	                        {text: '1 hour before',  value: '60'},
							{text: '2 hours before',  value: '120'},
							{text: '3 hours before',  value: '360'},
							{text: '1 day before', value: '1440'},
							{text: '2 days before', value: '2880'},
							{text: '3 days before', value: '4320'}
						],	
						style: {
							'margin-top': '100px',
							'font-size': '14px',
							'margin-left': '-12px'
						},
						name: 'reminderoptions'
					},
					{
						xtype:'container',
						layout:'hbox',
						items:[
							{
								xtype: 'button',
								text: '',//SUBMIT
								localize:true,
							    locales:{
							    	text:'SUBMIT_BUTTON_LABEL'
							    },
								cls:'submit_button',
								flex: 1,
								title: 'appointmentaddsubmitbutton'
							},
							{
								xtype: 'button',
								text: '',//CANCEL
								localize:true,
							    locales:{
							    	text:'CANCEL_BUTTON_LABEL'
							    },
								cls:'cancel_button',
								flex: 1,
								title: 'appointmentaddcancelbutton'
							}
						]	
					}
					
				]
			}
		]
    },
	initialize: function() {
		this.callParent(arguments);
		//this.assignFields(true, true);
		Ux.locale.Manager.applyLocaleForCmp(this);
		Ux.locale.Manager.applyLocaleForCmp(this.down('button[title = "appointmentaddsubmitbutton"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('button[title = "appointmentaddcancelbutton"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('selectfield'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('textareafield[name = "note"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('textfield[name = "doctorname"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('textfield[name = "phone"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('textfield[name = "location"]'));
	},
	
	checkDataField: function() {
		var doctorname = this._doctorField.getValue().trim();
		return (doctorname != '');
	},
	
	saveData: function(callback) {
		var me = this;
		if (me._selectedDate.getTime() < (new Date()).getTime()) {
			//Ext.Msg.alert('Error', 'The date or time has passed', Ext.emptyFn);
			PatientDiary.app.fireEvent('show_alert', "Error","The date or time has passed");
			return;
		}
		var doctorname = me._doctorField.getValue().trim();
		var location = me._locationField.getValue().trim();
		var phone = me._phoneField.getValue().trim();
		var note = me._noteField.getValue().trim();
		var time = me._timeField.getValue();
		var date = me._dateField.getValue();
		var reminder = me._reminderField.getValue();
		
		
		var data = {
			doctorname: doctorname,
			phone: phone,
			location: location,
			note: note,
			hourminute: time,
			date: date,
			remindertime: reminder,
			doctorname: doctorname,
			didreminder: 'false',
			time: me._selectedDate.getTime(),
			dd: me._selectedDate.getDate().toString(),
			mm: me._selectedDate.getMonth().toString(),
			yy: me._selectedDate.getFullYear().toString(),
			localetime: me._selectedDate.toLocaleTimeString(),
			dayname: me._selectedDate.getDayName(),
			monthname: me._selectedDate.getShortMonthName().toUpperCase()
		};
		
		//console.log(data);
		
		var appModel = Ext.create('PatientDiary.model.Appointment', data);
		appModel.save(function() {
			
			//PatientDiary.util.CommonUtil.prevDoctorData = data;
			if (!PatientDiary.util.CommonUtil.doctorModel) {
				PatientDiary.util.CommonUtil.doctorModel = Ext.create('PatientDiary.model.System');			
				PatientDiary.util.CommonUtil.doctorModel.data.name = 'doctor';
			}
			PatientDiary.util.CommonUtil.doctorModel.data.value = doctorname + ';;' + phone + ';;' + location;		
			PatientDiary.util.CommonUtil.doctorModel.save();
			
			callback(me._selectedDate);
		});
	},
	updateSelectedDate: function(date) {		
		//this._selectedDate = date;
		if (!this._selectedDate) this._selectedDate = new Date();
		this._selectedDate.setDate(date.getDate());
		this._selectedDate.setMonth(date.getMonth());
		this._selectedDate.setFullYear(date.getFullYear());
		this._dateField.setValue(date.format('dd/mm/yyyy'));
	},
	updateSelectedTime: function(time) {
		if (!this._selectedDate) this._selectedDate = new Date();
		if (time.daynight == 'AM')
			this._selectedDate.setHours(time.hour);
		else
			this._selectedDate.setHours(time.hour + 12);
			
		this._selectedDate.setMinutes(time.minute);
		this._selectedDate.setSeconds(0);
		this._timeField.setValue(this._selectedDate.format('h:MM TT'));
		
		//console.log('xx: ' + this._selectedDate.toLocaleTimeString());
	},
	resetView: function() {
		//this.getScrollable().getScroller().scrollToTop();
		this.assignFields(true, true);
	},
	
	assignFields: function(reset, usetodaydate) {
		var me = this;
		var today = new Date();
		today.setMinutes(parseInt(Math.ceil(today.getMinutes()/5))*5);
		
		if (!me._dateField)
			me._dateField = me.down('textfield[name = "date"]');			
		if (reset && usetodaydate) me.updateSelectedDate(today);
		
		if (!me._timeField)
			me._timeField = me.down('textfield[name = "time"]');
		if (reset && usetodaydate) me.updateSelectedTime({hour: today.getHours(), minute: today.getMinutes(), daynight: 'AM'});
		
		if (!me._doctorField)
			me._doctorField = me.down('textfield[name = "doctorname"]');
		if (reset) me._doctorField.setValue('');
		
		if (!me._phoneField)
			me._phoneField = me.down('textfield[name = "phone"]');
		if (reset) me._phoneField.setValue('');
		
		if (!me._locationField)
			me._locationField = me.down('textfield[name = "location"]');
		if (reset) me._locationField.setValue('');
		
		if (!me._noteField)
			me._noteField = me.down('textareafield[name = "note"]');
		if (reset) me._noteField.setValue('');	
		
		if (!me._reminderField)
			me._reminderField = me.down('selectfield[name = "reminderoptions"]');
		if (reset) me._reminderField.setValue('0.01');	
		
		//show previous doctor data 
		if (PatientDiary.util.CommonUtil.doctorModel) {
			var doctorInfo = PatientDiary.util.CommonUtil.doctorModel.data.value.split(';;');
			//console.log(doctorInfo);
			me._doctorField.setValue(doctorInfo[0]);
			me._phoneField.setValue(doctorInfo[1]);
			me._locationField.setValue(doctorInfo[2]);			
		}
	}
 });   