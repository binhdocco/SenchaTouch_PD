Ext.define('PatientDiary.view.tab.popup.PopupAlert', {
    extend: 'Ext.Container',
    xtype: 'tab_popup_popupalert',
    requires: [

	],
    config: {	
		hidden: true,
        showAnimation: {
            type: "fadeIn",
           //direction: "down",
            duration: 100
        },
        hideAnimation: {
            type: "fadeOut",
            //direction: "up",
            duration: 100
        },
		data: null,	
		cls: 'popup-alert-container',
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
		var msgText = text.down('container[cls = "popup-message-text-box alert"]');
		msgText.setHtml('<div class="content">' + this.getData()['msg'] + '</div>');
				
		var titleText = text.down('container[cls = "popup-alert-title-box"]');
		titleText.setHtml(this.getData()['title']);
		
   },
   
   createView: function() {
   		var text = this.getTextView();
		this.add(text);
   },
   
   getTextView: function() {
   		if (!this._text) {
			this._text = Ext.create('Ext.Container', {
				cls:'popup-alert-box',
				layout: {
					type:'vbox',
					pack: 'center'
				},
				items: [
					{
						xtype: 'container',
						cls: 'popup-alert-title-box',
						html: 'YOUR TITLE HERE'					
					},
					{
						xtype: 'container',
						cls: 'popup-message-text-box alert',
						html: 'YOUR MESSAGES HERE'						
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
