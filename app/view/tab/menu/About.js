Ext.define('PatientDiary.view.tab.menu.About',{
	extend: 'Ext.Container',
	xtype: 'tab_menu_about',
	requires: [
		'PatientDiary.view.component.MenuToolbarBase'
	],
	config: {		
		layout: 'vbox',
		
		items: [
			{
				xtype: 'component_menutoolbarbase',
				title: 'About'
			}, {
				xtype: 'container',
				cls: 'menu-about',
				html: [
					'<span>Patient Diary</span><br/><br/>',
					"@Copyright 2014<br/>",
					"<span>drcomhealth</span>"
				].join('')
			}
		]
	}
});
