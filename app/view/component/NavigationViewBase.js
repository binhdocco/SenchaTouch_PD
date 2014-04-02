Ext.define('PatientDiary.view.component.NavigationViewBase', {
    extend: 'Ext.navigation.View',
    xtype: 'component_navigationviewbase',
    requires: [
	],
    config: {
		defaultBackButtonText:'',
        autoDestroy: false,
        layout:{
			type:'card',
			animation:{
				type:'fade'
			}
		},
		navigationBar:{
			 backButton: {
	            iconCls: 'app-nav-back-icon',
	            ui: 'plain'
	        },
        	defaults:{
				xtype:'button',
				ui:'plain'
			},
        	items:[
        		{
					iconCls:'crestor-toolbar-icon-menu',
					align: 'left',
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 100
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 100
                    }
				},
				/*{
					iconCls:'add_icon',
					align: 'right',
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 100
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 100
                    }
				}*/
			]
       }
   }
});
