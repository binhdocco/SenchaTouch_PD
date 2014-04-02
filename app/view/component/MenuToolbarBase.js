Ext.define('PatientDiary.view.component.MenuToolbarBase',{
	extend: 'Ext.Toolbar',
	xtype:'component_menutoolbarbase',
	
	config: {		
		cls: 'menu-toolbar',
		
		items: [
			{
				xtype: 'button',
				iconCls:'crestor-toolbar-icon-menu',
				align: 'left'
			}
		]
	}
});
