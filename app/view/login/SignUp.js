Ext.define('PatientDiary.view.login.SignUp', {
    extend: 'Ext.Container',
    xtype: 'sign_up',
    requires: [
    		     
    ],
    config: {		
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
        layout:{
			type:'vbox'
		},
		items:[
			{
				xtype:'titlebar',
				//title:'New Account',
				localize:true,
		        locales:{
		        	title:'NEW_ACCOUNT_TITLE'
		        }, 
				docked:'top',
				items:[
					{
						xtype:'button',
						ui:'plain',
						iconCls:'crestor-toolbar-icon-back',
						id:'sign_up_back_button'
					}
				]
			},
			{
				xtype:'container',
				layout:{
					type:'vbox'
				},
				cls:'sign_up_form',
				defaults:{
					labelWidth: '45%',
					clearIcon:false,
					//height: '50px'
				},
				items:[
					{
						xtype:'textfield',
						//label: 'Username',
						localize:true,
				        locales:{
				        	label:'USERNAME_TEXT'
				        }, 
						id:'sign_up_username',
						required:true
					},
					{
						xtype:'passwordfield',
						//label: 'Password',
						localize:true,
				        locales:{
				        	label:'PASSWORD_TEXT'
				        },
						id:'sign_up_password',
						required:true
					},
					{
						xtype:'passwordfield',
						//label: 'Re-Password',
						localize:true,
				        locales:{
				        	label:'REPASSWORD_TEXT'
				        },
						id:'sign_up_re_password',
						required:true
					},
					{
						xtype:'textfield',
						//label: 'First name',
						localize:true,
				        locales:{
				        	label:'FIRSTNAME_TEXT'
				        },
						id:'sign_up_first_name'
						
					},
					{
						xtype:'textfield',
						//label: 'Last name',
						localize:true,
				        locales:{
				        	label:'LASTNAME_TEXT'
				        },
						id:'sign_up_last_name'
					},
					{
						xtype:'textfield',
						//label: 'Email',
						localize:true,
				        locales:{
				        	label:'EMAIL_TEXT'
				        },
						id:'sign_up_email'
					},
					/*{
						xtype:'container',
						layout:'hbox',
						defaults:{
							labelWidth: '60%',
							labelAlign:'right'
						},
						items:[
							{
								xtype:'radiofield',
								checked:true,
								labelAlign:'right',
								name:'sex',
								label:'Male',
								id:'sign_up_male'
							},
							{
								xtype:'radiofield',
								labelAlign:'right',
								name:'sex',
								label:'Female',
								id:'sign_up_female'
							}
						]	
					},*/
					{
						xtype: 'button',
						//text: 'CREATE ACCOUNT',
						localize:true,
				        locales:{
				        	text:'CREAT_ACCOUNT_TEXT'
				        },
						cls:'create_account_button',
						id:'create_account_button'
					}
					
				]
			}
		]
    }
 });   