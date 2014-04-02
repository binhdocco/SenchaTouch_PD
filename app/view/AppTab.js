Ext.define('PatientDiary.view.AppTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'apptab',
    requires: [
       'PatientDiary.view.tab.Home',
       'PatientDiary.view.tab.Record',
       'PatientDiary.view.tab.Progress',
       'PatientDiary.view.tab.Appointment'
    ],
    config: {
        tabBarPosition: 'bottom',
		layout:{
			animation:{
				type:'fade'
			}
		},
		items: [
			{xtype:'tab_home'},
			{xtype:'tab_record'},
			{xtype:'tab_progress'},
			{xtype:'tab_appointment'}
        ]
    }
});
