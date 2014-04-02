Ext.define('PatientDiary.view.tab.menu.Terms',{
	extend: 'Ext.Container',
	xtype: 'tab_menu_terms',
	requires: [
		'PatientDiary.view.component.MenuToolbarBase'
	],
	config: {		
		layout: 'vbox',
		
		items: [
			{
				xtype: 'component_menutoolbarbase',
				title: 'Terms & Agreements'
			}, {
				xtype: 'container',	
				cls: 'menu-about',			
				html: 'Terms & Agreements'
			}
		]
	}
});
