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
		this._today = new Date();
		this._needRefreshAppointmentList = false;
		
		Ux.locale.Manager.setConfig({
            ajaxConfig : {
                method : 'GET'
            },
            language   :PatientDiary.util.CommonUtil.getLang(),
            tpl        : 'locales/{locale}.json',
            type       : 'ajax'
   		});
        Ux.locale.Manager.init(function(){
			if (PatientDiary.util.CommonUtil.getLang() != 'en') {
				PatientDiary.util.CommonUtil.offline.reloadData();				
			}
		});		 
		PatientDiary.app.on('user_logged', this.onUserLogged, this);
		PatientDiary.app.on('user_logout', this.onUserLogout, this);
	},
	
	onUserLogged: function() {
		var me = this;
		me.checkNextAppointment();		
		me._interval = setInterval(function(){
			me.loop();
		}, 4*1000);//automatic refresh each 60s
	},
	
	onUserLogout: function() {
		clearInterval(this._interval);
	},
	
	loop: function() {
		var me = this;
		me.checkNextAppointment();
		me.checkReminder();
		me.checkDayPassed();
	},
	
	checkNextAppointment: function() {
		//if (!PatientDiary.util.CommonUtil.userLogged) return;
		var me = this;
		if (!me._nextStore)
			me._nextStore = Ext.getStore('Appointments_Next');
		me._nextStore.updateDBQuery();
		me._nextStore.load(function(records){
			//console.log(records);
			if (records.length > 0) {
				var model = records[0];
				me.getTabHome().updateNextAppointmentInfo(model.data);
				var nowtime = (new Date()).getTime() - model.data.time;	
				//console.log(nowtime);
				if (nowtime >= 1000 && nowtime <= 6000) {
					PatientDiary.app.fireEvent('appointment_passed', model.data);
				}
			} else {
				me.getTabHome().updateEmptyAppointmentInfo();
			}
		});
	},
	
	checkReminder: function() {
		var me = this;
		if (!me._reminderStore)
			me._reminderStore = Ext.getStore('Appointments_Reminder');
		me._reminderStore.updateDBQuery();
		me._reminderStore.load(function(records){
			//console.log(records);
			if (records.length > 0) {
				Ext.Array.each(records, function(model, index){
					//check reminder time
					if (model.data.didreminder == 'false') {
						var remindertime = parseFloat(model.data.remindertime);//*60;//*1000;
						var nowtime = (new Date()).getTime();
						var difftime = Math.abs(model.data.time - nowtime);//remindertime + 
						difftime = Math.round(difftime/60000);
						//remindertime = Math.round(remindertime/(1000));
						//console.log('difftime: ' + difftime + ' remindertime: ' + remindertime);
						if (difftime <= remindertime) {
							model.data.didreminder = 'true';
							model.save();
							//Ext.Msg.alert('Reminder', 'Appointment with Doctor ' + model.data.doctorname + ' is comming at ' + model.data.hourminute, Ext.emptyFn);
							//PatientDiary.app.fireEvent('show_alert', "Reminder",'Appointment with Doctor <span>' + model.data.doctorname + '</span> is comming at <span>' + model.data.hourminute + '</span>');
							var msg = Ux.locale.Manager.get('MESSAGE_REMINDER_TEXT');
							msg = msg.replace('{0}', model.data.doctorname);
							msg = msg.replace('{1}',model.data.hourminute);
							PatientDiary.app.fireEvent('show_alert', Ux.locale.Manager.get('MESSAGE_REMINDER_TITLE'), msg);
						}
						
					}
				});
				
			}
		});
	},
	
	checkDayPassed: function() {
		var me = this;
		var now = new Date();
		//console.log('checkDayPassed --');
		//console.log(now);
		//console.log(me._today);
		if (now.getDate() != me._today.getDate() ||
			now.getMonth() != me._today.getMonth() ||
			now.getFullYear() != me._today.getFullYear()) {
				me._today = new Date();
				PatientDiary.app.fireEvent('day_changed');
				//console.log('DAY CHANGED =====');
			}
	}
});