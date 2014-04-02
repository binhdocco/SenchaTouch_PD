Ext.define('PatientDiary.view.tab.popup.PopupBackground', {
    extend: 'Ext.Container',
    xtype: 'tab_popup_popupbackground',
    requires: [

	],
    config: {
		hidden: true,
        /*showAnimation: {
            type: "slideIn",
            direction: "up",
            duration: 200
        },
        hideAnimation: {
            type: "slideOut",
            direction: "down",
            duration: 200
        },*/
		cls: 'popup-container',	
		layout:{
			type:'vbox'
		},	
		/*localize:true,
		locales : {
            title : 'TAB_RESULT_TITLE'
        }*/
   }
});
