Ext.define('PatientDiary.view.tab.menu.Settings',{
	extend: 'Ext.Container',
	xtype: 'tab_menu_settings',
	requires: [
		'PatientDiary.view.component.MenuToolbarBase'
	],
	config: {		
		layout: 'vbox',
		style: {
			'text-align': 'center'
		}		
	},
	
	initialize: function() {
		this.callParent(arguments);
		this.createView();
	},
	
	createView: function() {
		
		this.add({
				xtype: 'component_menutoolbarbase',
				title: 'Settings',
				localize:true,
				locales : {
			         title : 'SETTINGS_TITLE'
			   	}
			});
		this.add({
				xtype: 'label',
				html: 'Change language',
				localize:true,
				locales : {
			         html : 'CHANGE_LANGUAGE_TEXT'
			   	},
				cls: 'menu-settings-title'
			});
			
		var lang = this.getLanguage();		
		this.add(lang);
		
		var langer = Ext.ComponentQuery.query('radiofield[name=language]');
		//console.log('settings xxx: ' + PatientConcierge.util.CommonUtil.getLang());		
		//console.log(langer);
		if (PatientDiary.util.CommonUtil.getLang() == 'en') {		
			langer[0].setChecked(true);
		}
		else {			
			langer[1].setChecked(true);
		}
		
		/*this.add({
				xtype: 'label',
				//html: 'Change concierge',
				localize:true,
				locales : {
			         html : 'CHANGE_CONCIERGE_TEXT'
			   	},
				cls: 'menu-settings-title'
			});*/
		
	},
	
	getLanguage: function() {
		if (!this._language) {
			this._language = Ext.create('Ext.Container', {
				defaults: { xtype: 'radiofield', labelWidth: '70%' },	
				id:'languageRadioField',	
				items:[
					{ name: 'language', label: 'English', value: 'en' },
		            { name: 'language', label: 'Vietnamese',  value: 'vi'}		            
				]
			});
		}
		return this._language;
	}
});
