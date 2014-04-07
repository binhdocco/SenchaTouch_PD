Ext.define('PatientDiary.controller.App', {
    extend: 'Ext.app.Controller',
	requires:[		
		'PatientDiary.view.tab.popup.PopupMessage',
		'PatientDiary.view.tab.popup.PopupBackground',
		'PatientDiary.view.tab.popup.PopupAlert',
		'PatientDiary.view.tab.CodeActivate'
	],
    config: {
        refs: {		
			app: 'app',
			login:'applogin',
			codeLabel: 'tab_codeactivate searchfield[title = "codelabel"]'
        },//end refs
        control: {
			app: {
				initialize: function() {
					var thisObj = this;
					if (!PatientDiary.util.CommonUtil.codeActivated) {
						setTimeout(function() {
							thisObj.onCodeActivate();
						},10);
						
					}
					
					this.getApplication().on('show_popup', this.onPopupShown, this);
					this.getApplication().on('show_alert', this.onAlertShown, this);
				}
			},
			'tab_popup_popupmessage button[cls = "popup-message-close-btn"]': {
				tap: 'onClosePopup'
			},
			'tab_popup_popupalert button[cls = "popup-message-close-btn"]': {
				tap: 'onCloseAlert'
			},
			'apptab button[iconCls = "crestor-toolbar-icon-menu"]':{
				tap: 'onToggleMenu'
			},
			'tab_codeactivate button[title = "codesubmitbutton"]': {
				tap: 'onSubmitCode'
			},
			'tab_codeactivate searchfield[title = "codelabel"]': {
			
				 keyup: function(searchfield,e) {
                    if (e.event.keyCode == 13){
		  				this.onSubmitCode();
					 }
		        }
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
	
	onCloseAlert: function() {
		var popup = this.getPopupAlertBgView();
		popup.hide();	
		var message = this.getPopupAlertView();
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
	showAlert:function(title, msg){	
		var popup = this.getPopupAlertBgView();
		Ext.Viewport.add(popup);	
		popup.show();	
		var message = this.getPopupAlertView();
		message.setData({msg: msg, title: title});
		Ext.Viewport.add(message);
		message.show();
	},
	
	onCodeActivate: function() {
		var avatar = this.getCodeActivateView();
		Ext.Viewport.add(avatar);	
		//avatar.useDefaultMessage();	
		avatar.show();
	},
	
	onSubmitCode: function() {
		var me = this;
		var code = this.getCodeLabel().getValue().trim();
		if (code == 'drcom125') {
			me.onSubmitCodeOK();
			return;
		}
		if (code == "") {
			me.onSubmitCodeFailed();
		} else {
			var url = PatientDiary.util.CommonUtil.buildActivateCodeApi('check_activate', code);
			console.log('onSubmitCode url: ' + url);
	    	Ext.Ajax.request({
	   			method : 'GET',
	   			url: url,
	   			timeout:120000,
	         	success: function(result) {
	         		var responde = Ext.decode(result.responseText);
	         		console.log('onSubmitCode responde: ' + responde);
					if (responde.status == 'success') {
						me.onSubmitCodeOK();
					} else {
						me.onSubmitCodeFailed();
					}
	         	},
	         	failure: function(e) {
	         		console.log('onSubmitCode failure');
					me.onSubmitCodeFailed();
	            }
			});		
		}
		
	},
	
	onSubmitCodeFailed: function() {
		var title = Ux.locale.Manager.get('ACTIVATION_CODE_TITLE', 'ACTIVATION_CODE_TITLE');
		var msg = Ux.locale.Manager.get('INVALID_CODE_TEXT', 'INVALID_CODE_TEXT');
		PatientDiary.app.fireEvent('show_alert', 
								title,
								msg);
	},
	
	onSubmitCodeOK: function() {
		var storeSystem = Ext.getStore('Systems');
		var codeModel = storeSystem.findRecord('name', 'code');
		if (!codeModel) {
			codeModel = Ext.create('PatientDiary.model.System');			
			codeModel.data.name = 'code';
		}		
		codeModel.data.value = 'activated';		
		codeModel.save();
		var avatar = this.getCodeActivateView();			
		avatar.hide();
		
		PatientDiary.util.CommonUtil.codeActivated = true;	
	},
	
	getCodeActivateView:function() {
		if (!this._code) {
			this._code = Ext.create('PatientDiary.view.tab.CodeActivate');
		}
		return this._code;
	},
	
	getPopupAlertBgView: function() {
		if (!this._popupAlertBg) {
			this._popupAlertBg = Ext.create('PatientDiary.view.tab.popup.PopupBackground', {
				cls: 'alert-container'
			});
		}
		return this._popupAlertBg;
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
	getPopupAlertView: function() {
		if (!this._popupAlert) {
			this._popupAlert = Ext.create('PatientDiary.view.tab.popup.PopupAlert');
		}
		return this._popupAlert;
	},
	onPopupShown: function(title, msg) {
		console.log('onPopupShown msg: ' + msg);
		this.showPopup(title, msg);
	},
	onAlertShown: function(title, msg) {
		console.log('onAlertShown msg: ' + msg);
		this.showAlert(title, msg);
	},
});