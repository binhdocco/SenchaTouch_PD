Ext.define('PatientDiary.view.AppMain', {
    extend: 'Ext.Container',
    xtype: 'appmain',
    requires: [
    	'PatientDiary.view.AppTab',
		'PatientDiary.view.tab.menu.About',
		'PatientDiary.view.tab.menu.Settings',
		'PatientDiary.view.tab.menu.Terms'	     
    ],
    config: {
        layout:{
			type:'card'
		},
		items:[
			{
				xtype:'apptab'
			},
			{
				xtype: 'tab_menu_about'
			},
			{
				xtype: 'tab_menu_settings'
			},
			{
				xtype: 'tab_menu_terms'
			}
		]
    }
 });   