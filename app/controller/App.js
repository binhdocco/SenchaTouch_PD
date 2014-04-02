Ext.define('PatientDiary.controller.App', {
    extend: 'Ext.app.Controller',
	requires:[		
		'PatientDiary.view.tab.popup.PopupMessage',
		'PatientDiary.view.tab.popup.PopupBackground'
	],
    config: {
        refs: {		
			app: 'app',
			login:'applogin'
        },//end refs
        control: {
			app: {
				initialize: function() {
					this.getApplication().on('show_popup', this.onPopupShown, this);
				}
			},
			'tab_popup_popupmessage button[cls = "popup-message-close-btn"]': {
				tap: 'onClosePopup'
			},
			'apptab button[iconCls = "crestor-toolbar-icon-menu"]':{
				tap: 'onToggleMenu'
			}
		}
    },
	
	onToggleMenu:function(){
		Ext.Viewport.toggleMenu("left");		
	},
	
	onClosePopup: function() {
		var popup = this.getPopupBgView();
		popup.hide();	
		var message = this.getPopupMessageView();
		message.hide();		
	},
	
	showPopup:function(title, msg){	
		var popup = this.getPopupBgView();
		Ext.Viewport.add(popup);	
		popup.show();	
		var message = this.getPopupMessageView();
		message.setData({msg: msg, title: title});
		Ext.Viewport.add(message);
		message.show();
	},
	
	getPopupBgView: function() {
		if (!this._popupBg) {
			this._popupBg = Ext.create('PatientDiary.view.tab.popup.PopupBackground');
		}
		return this._popupBg;
	},
	
	getPopupMessageView: function() {
		if (!this._popupMessage) {
			this._popupMessage = Ext.create('PatientDiary.view.tab.popup.PopupMessage');
		}
		return this._popupMessage;
	},
	onPopupShown: function(title, msg) {
		console.log('onPopupShown msg: ' + msg);
		this.showPopup(title, msg);
	}
});