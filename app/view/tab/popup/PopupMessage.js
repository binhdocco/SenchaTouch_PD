Ext.define('PatientDiary.view.tab.popup.PopupMessage', {
    extend: 'Ext.Container',
    xtype: 'tab_popup_popupmessage',
    requires: [

	],
    config: {	
		hidden: true,
        showAnimation: {
            type: "fadeIn",
           //direction: "down",
            duration: 200
        },
        hideAnimation: {
            type: "fadeOut",
            //direction: "up",
            duration: 200
        },
		data: null,	
		cls: 'popup-message-container',
		layout: {
			type:'vbox',
			pack: 'center'
		}
   },
   initialize: function() {
   		this.callParent(arguments);
		this.createView();
   },
   
   updateData: function() {
   		var text = this.getTextView();
		var msgText = text.down('container[cls = "popup-message-text-box"]');
		msgText.setHtml(this.getData()['msg']);
		var titleText = text.down('container[cls = "popup-message-title-box"]');
		titleText.setHtml(this.getData()['title']);
   },
   
   createView: function() {
   		var text = this.getTextView();
		this.add(text);
   },
   
   getTextView: function() {
   		if (!this._text) {
			this._text = Ext.create('Ext.Container', {
				cls:'popup-message-box',
				layout: {
					type:'vbox',
					pack: 'center'
				},
				items: [
					{
						xtype: 'container',
						cls: 'popup-message-title-box',
						html: 'YOUR TITLE HERE'					
					},
					{
						xtype: 'container',
						cls: 'popup-message-text-box',
						html: 'YOUR MESSAGES HERE',
						flex: 1
					},
					{
						xtype: 'button',
						cls: 'popup-message-close-btn',
						text: 'OK'
					}
				]
			});
		}
		return this._text;
   }
});
