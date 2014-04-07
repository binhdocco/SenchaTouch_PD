Ext.define('PatientDiary.view.tab.appointment.AppointmentDetail', {
    extend: 'Ext.Container',
    xtype: 'tab_appointment_appointmentdetail',
    requires: [
    		     
    ],
    config: {
		appointmentModel: null,
		title: '',//Edit Appointment
		localize:true,
	    locales:{
	    	title:'DETAIL_APPOINTMENT_LABEL'
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
						name: 'doctorname',
						readOnly: true	                    
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
						name: 'phone',
						readOnly: true	                    
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
						name: 'location',
						readOnly: true	                    
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
						maxRows: 10,
						readOnly: true			                    
	                }
				]
			}
		]
    },
	initialize: function() {
		this.callParent(arguments);
		this.resetView();
		
		Ux.locale.Manager.applyLocaleForCmp(this);
		//Ux.locale.Manager.applyLocaleForCmp(this.down('selectfield'));
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
		
		//me._reminderField.setValue(data.remindertime);
	},
	
	checkDataField: function() {
		var doctorname = this._doctorField.getValue().trim();
		return (doctorname != '');
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
		this.assignFields(true, false);
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
	}
 });   