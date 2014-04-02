Ext.define('PatientDiary.controller.AppMenu', {
    extend: 'Ext.app.Controller',
	requires:[		
	],
    config: {
        refs: {		
			app: 'app',
			appMain: 'appmain',
			appTab: 'apptab'
        },//end refs
        control: {
			'appmain component_menutoolbarbase button[iconCls = "crestor-toolbar-icon-menu"]': {
				tap: 'onToggleMenu'
			},
			
			'appmenu button[menu = "home"]':{
				tap: function(button) {
					this.showMenuViewAtIndex(button.config.viewIndex);
				}
			},
			
			'appmenu button[menu = "about"]':{
				tap: function(button) {
					this.showMenuViewAtIndex(button.config.viewIndex);
				}
			},
			
			'appmenu button[menu = "settings"]':{
				tap: function(button) {
					this.showMenuViewAtIndex(button.config.viewIndex);
				}
			},
			
			'appmenu button[menu = "terms"]':{
				tap: function(button) {
					this.showMenuViewAtIndex(button.config.viewIndex);
				}
			},
			'appmenu button[menu = "logout"]':{
				tap: function(button) {
					this.getApp().setActiveItem(0);
					this.showMenuViewAtIndex(0);					
					this.getAppTab().setActiveItem(0);
					this.onToggleMenu();
				}
			},
			
			'tab_menu_settings radiofield[value=en]': {
				check: function() {
					//console.log('man checked');
					this.onChangeLanguage('en');
				}
			},
			'tab_menu_settings radiofield[value=vi]': {
				check: function() {
					//console.log('woman checked');
					this.onChangeLanguage('vi');
				}
			}
		}
    },//end controls
    onToggleMenu:function(){
		Ext.Viewport.toggleMenu("left");		
	},	
	
	showMenuViewAtIndex:function(viewIndex){		
		this.getAppMain().setActiveItem(viewIndex);
		this.onToggleMenu();
	},
	
	hideMenuView:function(){		
	},
	
	onChangeLanguage: function(lang) {
		var me = this;
		console.log('lang changed: ', lang);
		
		PatientDiary.util.CommonUtil.setLang(lang);
		Ux.locale.Manager.updateLocale(lang, function(){			
			PatientDiary.util.CommonUtil.offline.reloadData();	
		});		
		
		if (!PatientDiary.util.CommonUtil.langModel) {
			PatientDiary.util.CommonUtil.langModel = Ext.create('PatientDiary.model.System');			
			PatientDiary.util.CommonUtil.langModel.data.name = 'language';
		}
		PatientDiary.util.CommonUtil.langModel.data.value = lang;		
		PatientDiary.util.CommonUtil.langModel.save();
		
		//this.getApplication().fireEvent('language_changed', lang);
	}
});