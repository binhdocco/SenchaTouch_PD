Ext.define('PatientDiary.view.tab.appointment.AppointmentSelectedDateList', {
    extend: 'PatientDiary.view.component.RecordList',
    xtype:'tab_appointment_appointmentselecteddatelist',
    config: {    	
   		store:'Appointments_Selected_Date',
		cls:'appointment-list recorddetail-list',
		/*itemTpl: [
				'<div class="thumb">{dd}<br/>{monthname}</div>',
				'<div class="info">',
					'<div class="weekday">{dayname}, {hourminute}</div>',
					'<div class="yourreading">with Dr. {doctorname}</div>',
				'</div>',
				'<div class="arrow"></div>'].join(""),*/
		onItemDisclosure:true
    },
	
	initialize: function() {
		this.callParent(arguments);
		
	},
	setLocale:function(locale){
		this.callParent(arguments);
		var str = [
				'<tpl if="this.checkPassed(time)">',
					'<div class="thumb passed">{dd}<br/>{monthname}</div>',
				'<tpl else>', 
					'<div class="thumb">{dd}<br/>{monthname}</div>',
				'</tpl>',
				'<div class="info">',
					'<div class="weekday">{dayname}, {hourminute}</div>',
					'<div class="yourreading">{0} {doctorname}</div>',
				'</div>',
				'<div class="arrow"></div>'].join("");
		str = str.replace('{0}', Ux.locale.Manager.get('WITH_TEXT'));
		var tpl = new Ext.XTemplate(//'<div class= "thumb" id ="{id}_{info_id}">{[this.counter()]}</div>',
			str, 
			{
				checkPassed: function(time) {
					return (time < (new Date()).getTime());
				}
			}   	
        );
		
		this.setItemTpl(tpl);		
	},
});
