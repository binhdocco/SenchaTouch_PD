Ext.define('PatientDiary.controller.AppLogin', {
    extend: 'Ext.app.Controller',
	requires:[		
	],
    config: {
        refs: {		
			app: 'app',
			login:'applogin',
			signInUsername:'applogin sign_in #sign_in_username',
			signInPassword:'applogin sign_in #sign_in_password',
			signUpUsername:'applogin sign_up #sign_up_username',
			signUpPassword:'applogin sign_up #sign_up_password',
			signUpRePassword:'applogin sign_up #sign_up_re_password',
			signUpFirstname:'applogin sign_up #sign_up_first_name',
			signUpLastname:'applogin sign_up #sign_up_last_name',
			signUpEmail:'applogin sign_up #sign_up_email',
			signUpButton:'applogin sign_in #sign_up_button',
			signInButton:'applogin sign_in #sign_in_button'
			
        },//end refs
        control: {	
        	app:{
        		initialize:'appLoginInitialize'
        	},
			'applogin sign_in #sign_in_button':{
				tap:'signInHandler'
			},
			'applogin sign_in #sign_up_button':{
				tap:'signUpHandler'
			},
			'applogin sign_up #sign_up_back_button':{
				tap:'backToSignInHandler'
			},
			'applogin sign_up #create_account_button':{
				tap:'createAccountHandler'
			},
			signInUsername:{
				 keyup: 'keyUpHandler'

			},
			signInPassword:{
				 keyup:'keyUpHandler'
			}
			
			
		}
    },//end controls
    appLoginInitialize:function(){
    	var store = Ext.getStore('Users');
    	var me = this;
    	store.load(function(){
    		if(!store.getData().items.length){
    			//Ext.Msg.alert("Sign In","Please create a new account before sign in");
				//PatientDiary.app.fireEvent('show_alert', "Welcome","You need to create an account to login");
				PatientDiary.app.fireEvent('show_alert', Ux.locale.Manager.get('MESSAGE_WELCOME_TITLE'),Ux.locale.Manager.get('MESSAGE_NEED_ACCOUNT_TEXT'));
				me.getSignUpButton().setHidden(false);
				me.getSignInButton().setHidden(false);
    		}else{
				var loggedUser = store.data.items[0].data;
				//console.log(loggedUser);
				me.getSignInUsername().setValue(loggedUser.username);
				me.getSignInPassword().setValue(loggedUser.password);				
    			me.getSignInButton().setHidden(false);
    		}
    	});
    },
    keyUpHandler:function (field, e) {
        var key = e.browserEvent.keyCode;
        if (key == 13) {
        	this.signInHandler();
        }
	},
    signInHandler:function(){
    	var username = this.getSignInUsername().getValue();
    	var password = this.getSignInPassword().getValue();
    	if(username.trim() == "" || password.trim() == ""){
    		//Ext.Msg.alert("Sign In","Please enter username and password!");
			//PatientDiary.app.fireEvent('show_alert', "Login","Enter username and password");
			PatientDiary.app.fireEvent('show_alert', Ux.locale.Manager.get('MESSAGE_SIGNIN_TITLE'),Ux.locale.Manager.get('MESSAGE_ENTER_USERNAME_PASSWORD_TEXT'));
    	}else{
    		var store = Ext.getStore('Users');
    		var users = store.getData().items;
    		var isCorrect = false;
    		console.log(username +"="+password);
    		Ext.Array.each(users,function(item,index){
    			if(item.data.username == username && item.data.password == password){
    				isCorrect = true;
    			}
    		});
    		if(isCorrect){
    			//this.getSignInUsername().setValue("");
    			//this.getSignInPassword().setValue("");
				PatientDiary.util.CommonUtil.userLogged = true;
				PatientDiary.app.fireEvent('user_logged');
    			this.getApp().setActiveItem(1);
    		}else{
    			//Ext.Msg.alert("Sign In","Username and password is invalid");
				//PatientDiary.app.fireEvent('show_alert', "Login","Invalid username or password");
				PatientDiary.app.fireEvent('show_alert', Ux.locale.Manager.get('MESSAGE_SIGNIN_TITLE'),Ux.locale.Manager.get('MESSAGE_INVALID_USERNAME_PASSWORD_TEXT'));
    		}
    	}
    	
    },
    signUpHandler:function(){
    	this.getLogin().setActiveItem(1);
    },
    backToSignInHandler:function(){
    	this.getLogin().setActiveItem(0);		
    },
	fillUserInfo: function() {
		var store = Ext.getStore('Users');
    	var me = this;
    	store.load(function(){
			var loggedUser = store.data.items[0].data;
			//console.log(loggedUser);
			me.getSignInUsername().setValue(loggedUser.username);
			me.getSignInPassword().setValue(loggedUser.password);				
			me.getSignUpButton().setHidden(true);
    		me.getLogin().setActiveItem(0);
    	});
	},
    createAccountHandler:function(){
    	var username = this.getSignUpUsername().getValue();
    	var password = this.getSignUpPassword().getValue();
    	var rePassword = this.getSignUpRePassword().getValue();
    	var firstname = this.getSignUpFirstname().getValue();
    	var lastname = this.getSignUpLastname().getValue();
    	var email = this.getSignUpEmail().getValue();
    	
    	if(username.trim() == "")
    	{	
			//Ext.Msg.alert("Sign Up","User name is not valid");
			//PatientDiary.app.fireEvent('show_alert', "Sign Up","Invalid username");
			PatientDiary.app.fireEvent('show_alert', Ux.locale.Manager.get('MESSAGE_REGISTER_TITLE'),Ux.locale.Manager.get('MESSAGE_INVALID_USERNAME_TEXT'));
    	}else if(password.trim() == "" || rePassword.trim() == "" || (password.trim() !=  rePassword.trim())){
    		//Ext.Msg.alert("Sign Up","Password is not valid");
			//PatientDiary.app.fireEvent('show_alert', "Sign Up","Invalid password");
			PatientDiary.app.fireEvent('show_alert', Ux.locale.Manager.get('MESSAGE_REGISTER_TITLE'),Ux.locale.Manager.get('MESSAGE_INVALID_PASSWORD_TEXT'));
    	}else{
    		var user = Ext.create('PatientDiary.model.User', 
    			{
    				username:username,
    				password:password,
    				first_name:firstname,
    				last_name:lastname,
    				email:email
    			});
    		var me = this;	
    		user.save(function(){
    			me.resetSignUpForm();
    			//Ext.Msg.alert("Sign Up","New account has created sucessful!",function(){				    				
				//me.fillUserInfo();
    			//},this);
				//PatientDiary.app.fireEvent('show_alert', "Sign Up","Your account has been created.");
				PatientDiary.app.fireEvent('show_alert', Ux.locale.Manager.get('MESSAGE_REGISTER_TITLE'),Ux.locale.Manager.get('MESSAGE_ACCOUNT_CREATED_TEXT'));
				me.fillUserInfo();
    		});
    	}
    	
    },
    resetSignUpForm:function(){
    	this.getSignUpUsername().setValue("");
    	this.getSignUpPassword().setValue("");
    	this.getSignUpRePassword().setValue("");
    	this.getSignUpFirstname().setValue("");
    	this.getSignUpLastname().setValue("");
    	this.getSignUpEmail().setValue("");
    }
	
});