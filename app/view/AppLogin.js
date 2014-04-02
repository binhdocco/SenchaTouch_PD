Ext.define('PatientDiary.view.AppLogin', {
    extend: 'Ext.Container',
    xtype: 'applogin',
    requires: [
		'PatientDiary.view.login.SignIn',
		'PatientDiary.view.login.SignUp'
	],
    config: {
    	layout:{
    		type:'card',
    		animation:false
    	},
    	items:[
    	{
       		xtype:'sign_in'
       	},
       	{
       		xtype:'sign_up'
       	}
       	]				
   }
   
});
