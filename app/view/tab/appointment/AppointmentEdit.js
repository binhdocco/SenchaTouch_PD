Ext.define('PatientDiary.view.tab.appointment.AppointmentEdit', {
    extend: 'Ext.Container',
    xtype: 'tab_appointment_appointmentedit',
    requires: [
    		     
    ],
    config: {
		appointmentModel: null,
		title: '',//Edit Appointment
		localize:true,
	    locales:{
	    	title:'EDIT_APPOINTMENT_LABEL'
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
								text: '',//SAVE
								localize:true,
							    locales:{
							    	text:'SAVE_BUTTON_LABEL'
							    },
								cls:'submit_button',
								flex: 1,
								title: 'appointmenteditsubmitbutton'
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
								title: 'appointmenteditcancelbutton'
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
		
		Ux.locale.Manager.applyLocaleForCmp(this);
		Ux.locale.Manager.applyLocaleForCmp(this.down('button[title = "appointmenteditsubmitbutton"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('button[title = "appointmenteditcancelbutton"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('selectfield'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('textareafield[name = "note"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('textfield[name = "doctorname"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('textfield[name = "phone"]'));
		Ux.locale.Manager.applyLocaleForCmp(this.down('textfield[name = "location"]'));
	},
	
	updateAppointmentModel: function() {
		var me = this;		
		var data = me.getAppointmentModel().data;
		var date = new Date(data.time);
		//console.log(date);
		
		me.updateSelectedDate(date);	
		me._selectedDate.setHours(date.getHours());
		me._selectedDate.setMinutes(date.getMinutes());
		me._selectedDate.setSeconds(0);	
		me._timeField.setValue(me._selectedDate.format('h:MM TT'));
		
		me._doctorField.setValue(data.doctorname);
		//me._timeField.setValue(data.hourminute);
		//me._dateField.setValue(data.date);
		me._noteField.setValue('');
		me._locationField.setValue('');
		me._phoneField.setValue('');
		
		if (data.note) {
			me._noteField.setValue(data.note);
		}
		if (data.location) {
			me._locationField.setValue(data.location);
		}
		if (data.phone) {
			me._phoneField.setValue(data.phone);
		}
		
		me._reminderField.setValue(data.remindertime);
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
		var model = me.getAppointmentModel();
		var doctorname = me._doctorField.getValue().trim();
		var phone = me._phoneField.getValue().trim();
		var location = me._locationField.getValue().trim();
		var note = me._noteField.getValue().trim();
		var time = me._timeField.getValue();
		var date = me._dateField.getValue();
		var reminder = me._reminderField.getValue();
		
		
		var data = {
			id: model.data.id,
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
		
		model.data = data;	
		model.save(function() {
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
		if (reset) me._reminderField.setValue('0.5');	
	}
 });   