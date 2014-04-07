Ext.define('PatientDiary.controller.TabAppointment', {
    extend: 'Ext.app.Controller',
	requires:[	
		'PatientDiary.view.tab.appointment.AppointmentAdd',
		'PatientDiary.view.tab.appointment.AppointmentEdit',
		'PatientDiary.view.tab.appointment.AppointmentAllList',
		'PatientDiary.view.tab.appointment.AppointmentDetail'	
	],
    config: {
        refs: {		
			tabAppointment: 'tab_appointment',
			tabAppointmentMenuButton: 'tab_appointment button[iconCls = "crestor-toolbar-icon-menu"]',
			tabAppointmentAddButton: 'tab_appointment button[title = "toolbar_appointmentadd_button"]',
			appointmentAdd: 'tab_appointment_appointmentadd',
			appointmentEdit: 'tab_appointment_appointmentedit'
        },//end refs
        control: {
			tabAppointment: {
				initialize: function() {
					PatientDiary.app.on('appointment_passed', this.onAppointmentPassed, this);
				},
				pop: function(me, view, level) {
					if (level != 3) {
						this.getTabAppointmentMenuButton().show(); 
						this.getTabAppointmentAddButton().show();
					}					
				},
				push: function() {
					this.getTabAppointmentMenuButton().hide();
					this.getTabAppointmentAddButton().hide();
				}
			},		
			tabAppointmentAddButton : {
				tap: 'onAppointmentAddClicked'
			},
			'tab_appointment_appointmentadd textfield[name = "date"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var dp = this.getDatePicker(new Date(), this.getAppointmentAdd(), tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			'tab_appointment_appointmentadd textfield[name = "time"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var dp = this.getTimePicker(new Date(), this.getAppointmentAdd(), tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			'tab_appointment_appointmentedit textfield[name = "date"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var dp = this.getDatePicker(new Date(), this.getAppointmentEdit(), tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			'tab_appointment_appointmentedit textfield[name = "time"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var dp = this.getTimePicker(new Date(), this.getAppointmentEdit(), tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			'tab_appointment_appointmentadd button[title = "appointmentaddsubmitbutton"]': {
				tap: 'onCreateNewAppointmentClicked'
			},
			'tab_appointment_appointmentadd button[title = "appointmentaddcancelbutton"]': {
				tap: function() {
					this.getTabAppointment().onBackButtonTap();
				}
			},
			'tab_appointment_appointmentedit button[title = "appointmenteditsubmitbutton"]': {
				tap: 'onEditAppointmentClicked'
			},
			'tab_appointment_appointmentedit button[title = "appointmenteditcancelbutton"]': {
				tap: function() {
					this.getTabAppointment().onBackButtonTap();
				}
			},
			'tab_appointment list': {
				disclose: function(list, record, node, index, event, eOpts) {
					var editview;	
					if (record.data.time >= (new Date()).getTime()) {			
						editview = this.getAppointmentEditView();						
					} else {
						editview = this.getAppointmentDetailView();						
					
					}			   
					editview.setAppointmentModel(record);		
					this.getTabAppointment().push(editview);
				}			
			},
			'tab_appointment button[title = "tabappointment_viewallappointments_button"]': {
				tap: function() {
					var allview = this.getAppointmentAllView();							
					this.getTabAppointment().push(allview);
				}			
			},
		}
    },
	
	onAppointmentPassed: function(appointmentdata) {
		this.getTabAppointment().refreshList();
		Ext.getStore('Appointments').load();
	},
	
	onEditAppointmentClicked: function() {
		var editview = this.getAppointmentEditView();
		var me = this;
		if (editview.checkDataField()) {
			editview.saveData(function(date) {
				me.refreshData(date);
			});
		} else {
			//Ext.Msg.alert('Error', 'Required doctor name', Ext.emptyFn);
			PatientDiary.app.fireEvent('show_alert', "Error","Require doctor name");
		}
	},
	
	onCreateNewAppointmentClicked: function() {
		var addview = this.getAppointmentAddView();
		var me = this;
		if (addview.checkDataField()) {
			addview.saveData(function(date) {
				me.refreshData(date);					
			});
		} else {
			//Ext.Msg.alert('Error', 'Required doctor name', Ext.emptyFn);
			PatientDiary.app.fireEvent('show_alert', "Error","Require doctor name");
		}
	},
	
	refreshData: function(date) {
		Ext.getStore('Appointments').load();
		this.getTabAppointment().refreshListDataForDate(date);
		this.getTabAppointment().onBackButtonTap();	
	},

	onAppointmentAddClicked: function() {
		var addview = this.getAppointmentAddView();
		addview.resetView(true, true);		
		this.getTabAppointment().push(addview);
	},
	
	onDatePickerDone: function(dp, date, opts) {
		//console.log('onDatePickerDone: ' + date.format('dd/mm/yyyy'));
		if (opts) {
			//opts.tf.setValue(date.format('dd/mm/yyyy'));
			opts.view.updateSelectedDate(date);
		}
	},
	
	onTimePickerDone: function(dp, time, opts) {
		//console.log('onTimePickerDone: ');
		//console.log(time);
		if (opts) {
			//opts.tf.setValue(time.hour + ':' + time.minute + ' ' + time.daynight);
			opts.view.updateSelectedTime(time);
		}
	},
	
	
	getTimePicker: function(date, view, tf) {
		//console.log(tf.getValue());
		if (!this._timepicker) {
			this._timepicker = Ext.create('Ext.ux.TimePicker', {
				useTitles : true,
				value : tf.getValue() //date.format('h:MM TT')//"11:30 AM"
			});			
		}		
		this._timepicker.un('change', this.onTimePickerDone, this);
		this._timepicker.on('change', this.onTimePickerDone, this, {view: view});
		this._timepicker.setValue(tf.getValue());
		return this._timepicker;
	},
	
	getDatePicker: function(date, view, tf) {
		if (!this._datepicker) {
			this._datepicker = Ext.create('Ext.picker.Date', {
				value: date
			});			
		}		
		this._datepicker.un('change', this.onDatePickerDone, this);
		this._datepicker.on('change', this.onDatePickerDone, this, {view: view});
		var st = tf.getValue();
		this._datepicker.setValue(new Date(st.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1')));//26/04/2013 -> 2013/04/26
		return this._datepicker;
	},


	getAppointmentAddView: function() {
		if (!this._appoinmentAddView) {
			this._appoinmentAddView = Ext.create('PatientDiary.view.tab.appointment.AppointmentAdd');			
		}
		return this._appoinmentAddView;
	},
	getAppointmentDetailView: function() {
		if (!this._appoinmentDetailView) {
			this._appoinmentDetailView = Ext.create('PatientDiary.view.tab.appointment.AppointmentDetail');			
		}
		return this._appoinmentDetailView;
	},
	getAppointmentEditView: function() {
		if (!this._appoinmentEditView) {
			this._appoinmentEditView = Ext.create('PatientDiary.view.tab.appointment.AppointmentEdit');			
		}
		return this._appoinmentEditView;
	},
	getAppointmentAllView: function() {
		if (!this._appoinmentAllView) {
			this._appoinmentAllView = Ext.create('PatientDiary.view.tab.appointment.AppointmentAllList');			
		}
		return this._appoinmentAllView;
	}
});