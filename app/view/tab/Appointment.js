Ext.define('PatientDiary.view.tab.Appointment', {
    extend: 'PatientDiary.view.component.NavigationViewBase',
    xtype: 'tab_appointment',
    requires: [
		'PatientDiary.view.tab.appointment.AppointmentSelectedDateList'
	],
    config: {   
		title:'',    //
		localize:true,
	    locales:{
        	title:'APPOINTMENT_TITLE'
        },  
		autoDestroy: false,
		navigationBar:{
			 backButton: {
	            iconCls: 'app-nav-back-icon',
	            ui: 'plain'
	        },
        	defaults:{
				xtype:'button',
				ui:'plain'
			},
        	items:[
        		{
					iconCls:'crestor-toolbar-icon-menu',
					align: 'left',
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 100
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 100
                    }
				},
				{
					iconCls:'add_icon_menu',
					align: 'right',
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 100
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 100
                    },
					title: 'toolbar_appointmentadd_button'
				}
			]
       },
        iconCls: 'crestor-tabbar-icon-appointment'					
   },
   initialize:function(){
   		this.callParent(arguments);
		
		PatientDiary.app.on('day_changed', this.onDayChanged, this);
		//PatientDiary.app.on('appointment_passed', this.onAppointmentPassed, this);
		
		var list = this.getList();
   		var calendarView = this.getCalendarView();
		var thisObj = this;
        calendarView.addListener("selectionchange",function(me,newDate){
        	//Ext.Msg.alert('Date', newDate, Ext.emptyFn);
			thisObj.getListDataForDate(newDate);
        },this);
         /*calendarView.addListener("add",function(me,newDate){
        	Ext.Msg.alert('Add', "New Item", Ext.emptyFn);
        },this);*/
		var cmp = Ext.create('Ext.Container', {
        	//xtype:'container',
        	
        	layout:{
        		type:'vbox'
        	},
        	items:[
				calendarView,
				list, 
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					items: [
						{
							xtype: 'button',
							text: '',//View all appointments
							localize:true,
					        locales:{
					        	text:'VIEW_ALL_APPOINTMENTS_BUTTON_LABEL'
					        },  
							cls: 'crestor-button-rectangle',
							style: {
								'margin-bottom': '6px',
								'margin-right': '20px',
								'margin-top': '2px'		
							},
							title: 'tabappointment_viewallappointments_button'
						}
					]
				}
			]
		});
        this.add(cmp);
	
		
		//show list appointments of today
		var today = new Date();
		this.getListDataForDate(today);
		
		//Ux.locale.Manager.applyLocaleForCmp(this);
		
		var viewAllBtn = this.down('button');
		Ux.locale.Manager.applyLocaleForCmp(viewAllBtn);
   },
   
   onDayChanged: function() {
   		var calendarView = this.getCalendarView();
		calendarView.refresh();
   },
   
   refreshList: function(appointmentdata) {
   		//console.log('onAppointmentPassed');
		var list = this.getList();
		list.getStore().load();
   },
   
   getListDataForDate: function(date) {
   		this._selectedDate = date;
   		var list = this.getList();
		list.getScrollable().getScroller().scrollToTop();
   		var store = list.getStore();
		store.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Appointments_Selected_Date",
														PatientDiary.util.CommonUtil.getLang(),
														{dd: date.getDate(), mm: date.getMonth(),yy: date.getFullYear()})
		store.load();
   },
   
   refreshListDataForDate: function(date) {
   		if (this._selectedDate.getDate() == date.getDate() &&
			this._selectedDate.getMonth() == date.getMonth() &&
			this._selectedDate.getFullYear() == date.getFullYear() ) {
				//this._calendarView.setValue(date);
				this.getListDataForDate(date);
			}
   		//this._calendarView.setValue(date);
		//this.getListDataForDate(date);
   },
   
   /*createView: function() {
   		var calendarView = this.getCalendarView();
   },*/
   
   getCalendarView: function() {
   		if (!this._calendarView) {
			this._calendarView = Ext.create('Ext.ux.TouchCalendarView', {
					viewMode: 'month',
					weekStart: 1,
					flex: 1,
					value: new Date()
	        });
		}
		return this._calendarView;
   },
   
   getList: function() {
   		if (!this._list) {
			this._list = Ext.create('PatientDiary.view.tab.appointment.AppointmentSelectedDateList');
		}
		return this._list;
   }
   
});
