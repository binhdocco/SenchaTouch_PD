Ext.define('PatientDiary.controller.TabHome', {
    extend: 'Ext.app.Controller',
	requires:[		
	],
    config: {
        refs: {		
			tabHome: 'tab_home'
        },//end refs
        control: {
			tabHome: {
				initialize: 'homeInit'
			},
			
			'tab_home segmentedbutton': {
				toggle: function(container, button, pressed){
					if (pressed) {
						if (button.config.viewIndex == 0) {
							this.getTabHome().showBloddPressureChart();
						} else {
							this.getTabHome().showTotalCholesterolChart();
						}
					}
				}
			}
		}
    },
	
	homeInit: function() {		
		Ux.locale.Manager.setConfig({
            ajaxConfig : {
                method : 'GET'
            },
            language   :PatientDiary.util.CommonUtil.getLang(),
            tpl        : 'locales/{locale}.json',
            type       : 'ajax'
   		});
        Ux.locale.Manager.init(function(){
			/*Ext.getStore('Info_Category_Faqs').updateDBQuery();
			Ext.getStore('Info_Category_Faqs').load();
			Ext.getStore('Info_Categories').updateDBQuery();
			Ext.getStore('Info_Categories').load();*/
			if (PatientDiary.util.CommonUtil.getLang() != 'en') {
				PatientDiary.util.CommonUtil.offline.reloadData();				
			}
		});		 
		PatientDiary.app.on('user_logged', this.onUserLogged, this);
	},
	
	onUserLogged: function() {
		var me = this;
		me.getNextAppointment();		
		me._interval = setInterval(function(){
			me.getNextAppointment();
		}, 4*1000);//automatic refresh each 60s
	},
	
	getNextAppointment: function() {
		if (!PatientDiary.util.CommonUtil.userLogged) return;
		var me = this;
		if (!me._nextStore)
			me._nextStore = Ext.getStore('Appointments_Next');
		me._nextStore.updateDBQuery();
		me._nextStore.load(function(records){
			//console.log(records);
			if (records.length > 0) {
				var model = records[0];
				me.getTabHome().updateNextAppointmentInfo(model.data);
			
				//check reminder time
				if (model.data.didreminder == 'false') {
					var remindertime = parseFloat(model.data.remindertime)*60*1000;
					var nowtime = (new Date()).getTime();
					var difftime = Math.abs(nowtime - (model.data.time));//remindertime + 
					difftime = Math.round(difftime/(1000));
					remindertime = Math.round(remindertime/(1000));
					//console.log('difftime: ' + difftime + ' remindertime: ' + remindertime);
					if (difftime < (remindertime + 20)) {
						model.data.didreminder = 'true';
						model.save();
						Ext.Msg.alert('Reminder', 'Appointment with Doctor ' + model.data.doctorname + ' is comming at ' + model.data.hourminute, Ext.emptyFn);
					}
					
				}
			}
		});
	}
});