Ext.define('PatientDiary.view.tab.appointment.AppointmentAllList', {
    extend: 'PatientDiary.view.tab.appointment.AppointmentSelectedDateList',
    xtype:'tab_appointment_appointmentalllist',
    config: {    	
		title: '',//All Appointments
		enableLocale:true,
	    locales:{
	    	title:'ALL_APPOINTMENTS_LABEL'
	    },
   		store:'Appointments'
		
    },
	initialize: function() {
		this.callParent(arguments);
		
		//Ux.locale.Manager.applyLocaleForCmp(this);
	}
});
