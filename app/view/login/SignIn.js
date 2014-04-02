Ext.define('PatientDiary.view.login.SignIn', {
    extend: 'Ext.Container',
    xtype: 'sign_in',
    requires: [
    		     
    ],
    config: {
        layout:{
			type:'vbox',
			pack:'center'
		},
		cls:'applogin',
		items:[
			{
				xtype:'container',
				cls:'login_header'
			},{
				xtype:'container',
				flex:1,
				layout:{
					type:'vbox'
				},
				items:[{
					xtype:'container',
					cls:'login_logo_text'
				}]
				
			},{
				xtype:'container',
				flex:4,
				layout:{
					type:'vbox'
				},
				items:[
					{
	                    xtype: 'emailfield',
	                    placeHolder:'username',
	                    id:'sign_in_username',
	                    cls:'email_field'
	                },
	                {
	                    xtype: 'passwordfield',
	                    cls:'password_field',
						placeHolder:'password',
	                    id:'sign_in_password'
	                }
					,{
			        	xtype:'button',
			        	id:'sign_in_button',
			        	text:'SIGN IN',
			        	cls:'signin_button'
			        },
			        {
			        	xtype:'button',
			        	text: 'REGISTER',
			        	id:'sign_up_button',
			        	cls:'register_button'
				   	}

				]
			}
		]
    }
 });   