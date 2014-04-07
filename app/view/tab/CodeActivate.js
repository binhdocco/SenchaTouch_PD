Ext.define('PatientDiary.view.tab.CodeActivate', {
    extend: 'Ext.Container',
    xtype: 'tab_codeactivate',
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
		cls: 'code-activation-container',	
		layout:{
			type:'vbox'
		},	
		/*localize:true,
		locales : {
            title : 'TAB_RESULT_TITLE'
        }*/
   },
   
   initialize: function() {
   		this.callParent(arguments);
		this.createView();
   },
 
   createView: function() {

   		var con = Ext.create('Ext.Container', {			
			flex: 1,
			style: {
				'background-color': '#f5ece3'
			},		
			layout:{
				type:'vbox',
				align: 'center',
				pack: 'center'
			}
		});
		
		var text = this.getText();
		con.add(text);
				
		con.add({
					xtype: 'container',
					cls: 'code-activation-buttons',
					layout:{
						type:'vbox',
						align: 'center',
						//pack: 'start'
					},
	
					items: [						
						{
							xtype: 'searchfield',
							placeHolder: 'xxxxxxxx',
							clearIcon:false,
							title: 'codelabel',
							maxLength: 8
						},
						{
							xtype: 'button',
							cls: 'activate-submit-btn',
							text: 'SUBMIT',
							title: 'codesubmitbutton'
						}
					]
				});
		
		this.add(con);
		//var concierger = this.getConcierge();
		//concierger.setCls('avatar-concierge-person ' + PatientConcierge.util.CommonUtil.avatarName + ' normal');		
		//this.add(concierger);		
   },
   
    getText: function() {
   		if (!this._text) {
			this._text = Ext.create('Ext.Container', {				
				cls: 'code-activation-intro',
				html: 'Enter Activation Code'							
			});
		}
		return this._text;
   }/*,
   
   getConcierge: function() {
   		if (!this._concierger) {
			this._concierger = Ext.create('PatientConcierge.view.tab.faq.Concierge', {				
				cls: 'avatar-concierge',
				items: [
					{
						xtype: 'container',
						cls: 'avatar-concierge-person msrose normal',
						style: {
							'height': '160px',
							'margin-left': '145px'
						}
					}
				]
			});
		}
		return this._concierger;
   }*/
});
