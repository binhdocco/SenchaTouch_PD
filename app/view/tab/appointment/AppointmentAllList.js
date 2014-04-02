Ext.define('PatientDiary.view.tab.appointment.AppointmentAllList', {
    extend: 'PatientDiary.view.tab.appointment.AppointmentSelectedDateList',
    xtype:'tab_appointment_appointmentalllist',
    config: {    	
		title: 'All Appointments',
   		store:'Appointments'
    }
});
