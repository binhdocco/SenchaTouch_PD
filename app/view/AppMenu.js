Ext.define('PatientDiary.view.AppMenu', {
    extend: 'Ext.Menu',
    xtype: 'appmenu',
    requires: [  
    	'PatientDiary.view.component.MenuButton'
    ],
    config: {
        defaults:{
        	 xtype: "component_menubutton"
        },
        width: '80%',
        cls :'menu',
        items: [
            {
            	localize:true,
                locales:{
                	text:'HOME_TITLE'
                },
                text: 'Home',
                iconCls: 'crestor-tabbar-icon-home-menu',
                menu:"home",
				viewIndex: 0
            },
			{
            	localize:true,
                locales:{
                	text:'ABOUT_TITLE'
                },
                text: 'About',
                iconCls: 'crestor-toolbar-icon-users',
                menu:"about",
				viewIndex: 1
            },
			{
            	localize:true,
                locales:{
                	text:'SETTINGS_TITLE'
                },
                text: 'Settings',
                iconCls: 'crestor-toolbar-icon-settings',
                menu:"settings",
				viewIndex: 2
            },
			{
            	localize:true,
                locales:{
                	text:'TERMSANDAGREEMENTS_TITLE'
                },
                text: 'Terms & Agreements',
                iconCls: 'crestor-toolbar-icon-terms',
                menu:"terms",
				viewIndex: 3
            },
			{
            	localize:true,
                locales:{
                	text:'LOGOUT_TITLE'
                },
                text: 'Logout',
                iconCls: 'crestor-toolbar-icon-signout',
                menu:"logout",
				viewIndex: 4
            }
        ]
    }
 });   