Ext.Loader.setPath({
    'PatientDiary': 'app'
});
Ext.require([
		'PatientDiary.util.CommonUtil',
		'PatientDiary.util.offline.Connection',
		'PatientDiary.util.offline.Proxy',
		'PatientDiary.util.offline.Data'
]);
Ext.onReady(function(){
	var dbconnval = {
        dbName: "patientdiary",
        dbDescription: "Patient Diary"
    };
   PatientDiary.util.CommonUtil.dbConnection = Ext.create('PatientDiary.util.offline.Connection',dbconnval);
   PatientDiary.util.CommonUtil.offline = Ext.create('PatientDiary.util.offline.Data',{});
});
Ext.application({
    name:'PatientDiary',
	 requires: [
	 	'Ext.ux.Deferred',
	 	'Ux.locale.Manager',
        'Ux.locale.override.st.Component',
		'Ux.locale.override.st.Container',
        'Ux.locale.override.st.Button',
        'Ux.locale.override.st.navigation.View',
        'Ux.locale.override.st.field.Field',
        'Ux.locale.override.st.field.DatePicker',
        'Ux.locale.override.st.form.FieldSet',
        'Ux.locale.override.st.picker.Picker',
        'Ux.locale.override.st.picker.Date',
        'Ux.locale.override.st.DataView',
        'Ux.locale.override.st.tab.Panel',
		'Ux.locale.override.st.SegmentedButton',
	 	'Ext.ux.TouchCalendarView',
		'Ext.ux.TimePicker'
    ],   
    models:[
    	'Record',
    	'User',
    	'Type',
    	'Appointment',
		'System'
    ],
    stores:[
    	'Records',
    	'Users',
		'Records_Lastest_Blood',
		'Records_Lastest_Other',
		'Records_Lastest_Delete',
		'Records_Date',
		'Records_Filter_Month',
		'Records_Detail_Record',
		'Records_History_Record',
		'Appointments_Selected_Date',
		'Appointments',
		'Appointments_Next',
		'Systems'
	],
	startupImage: {
        '320x460': 'resources/startup/Default.png', // Non-retina iPhone, iPod touch, and all Android devices
        '640x920': 'resources/startup/Default@2x~iphone.png', // Retina iPhone and iPod touch
        '640x1096': 'resources/startup/Default-568h@2x~iphone.png', // iPhone 5 and iPod touch (fifth generation)
        '768x1004': 'resources/startup/Default@2x~iphone.png' //  Non-retina iPad (first and second generation) in portrait orientation
    },
    isIconPrecomposed: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@144.png'
    },
	views: ['App','AppMenu'],
    controllers: ['App', 'AppLogin', 'AppMenu', 'TabRecord', 'TabProgress', 'TabAppointment', 'TabHome'],
    launch: function() {
    	if(!PatientDiary.util.CommonUtil.runningDevice()){
    		this.onDeviceReady();
    	}else{
    		document.addEventListener("deviceready", this.onDeviceReady, false);
    	}
    	
    },
    onDeviceReady:function(){
    	PatientDiary.util.CommonUtil.preferredLanguage();
		
		var storeSystem = Ext.getStore('Systems');
		storeSystem.load(function(){				
			if(storeSystem.getCount()){					
				Ext.Array.each(storeSystem.getData().items, function(item, index) {	
					if (item)	{
						var sname = item.data.name;										
						if (sname == 'language') {					
							
							PatientDiary.util.CommonUtil.langModel = item;
							if (PatientDiary.util.CommonUtil.getLang() != item.data.value) {
								PatientDiary.util.CommonUtil.setLang(item.data.value);
							}
							
						}
					}				
					
				});				
        	}
			console.log('[check system starts] lang = ', PatientDiary.util.CommonUtil.getLang());
	    	Ext.Viewport.add({
	        	xtype: 'app'
	    	});
	    	var menu = Ext.create('PatientDiary.view.AppMenu');
	    	Ext.Viewport.setMenu(menu, {
	            side: 'left',
	            reveal: true
	        });
	   });   
    }
});
