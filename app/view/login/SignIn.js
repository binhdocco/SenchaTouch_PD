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
	                    //placeHolder:'username',
						localize:true,
				        locales:{
				        	placeHolder:'USERNAME_TEXT'
				        }, 
	                    id:'sign_in_username',
	                    cls:'email_field'
	                },
	                {
	                    xtype: 'passwordfield',
	                    cls:'password_field',
						//placeHolder:'password',
						localize:true,
				        locales:{
				        	placeHolder:'PASSWORD_TEXT'
				        },
	                    id:'sign_in_password'
	                }
					,{
			        	xtype:'button',
			        	id:'sign_in_button',
			        	//text:'SIGN IN',
						localize:true,
				        locales:{
				        	text:'SIGNIN_BUTTON_LABEL'
				        }, 
			        	cls:'signin_button',
						hidden: true
			        },
			        {
			        	xtype:'button',
			        	//text: 'REGISTER',
						localize:true,
				        locales:{
				        	text:'REGISTER_BUTTON_LABEL'
				        }, 
			        	id:'sign_up_button',
			        	cls:'register_button',
						hidden: true
				   	}

				]
			}
		]
    }
 });   