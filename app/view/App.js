Ext.define('PatientDiary.view.App', {
    extend: 'Ext.Container',
    xtype: 'app',
    requires: [
    	'PatientDiary.view.AppLogin',	
    	'PatientDiary.view.AppMain'	     
    ],
    config: {
        layout:{
			type:'card',
			animation:{type:'fade'}
		},
		items:[
			{
				xtype:'applogin'	
			},{
				xtype:'appmain'
			}
		]
    }
 });   