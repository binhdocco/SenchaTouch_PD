Ext.define('PatientDiary.view.tab.Home', {
    extend: 'PatientDiary.view.component.NavigationViewBase',
    xtype: 'tab_home',
    requires: [
		'PatientDiary.view.tab.home.HistoryChart'
	],
    config: {      
		localize:true,
        locales:{
        	title:'HOME_TITLE'
        }, 
		scrollable:true,
		autoDestroy: false,
        iconCls: 'crestor-tabbar-icon-home',
        items:[{
       		xtype:'container',
       		//title:'Home',
       		layout:{
       			type:'vbox'
       		},
       		items:[{
       			xtype:'container',
       			cls:'home_calendar',
       			layout:{
       				type:'hbox'
       			},
       			items:[
       			{
       				xtype:'container',
       				cls:'calendar_icon',
       				flex: 2
       			},{
       				xtype:'container',
       				cls:'new_appointment',
       				flex:4,
       				layout:{
       					type:'vbox'
       				},
       				items:[
       				{
       					xtype:'label',
       					//html:'Next appointment',
						localize:true,
				        locales:{
				        	html:'NEXT_APPOINTMENT_LABEL'
				        }, 
       					cls:'title_text'
       				},{
       					xtype:'label',
       					cls:'date_text',
       					html: '...',
						name: 'appointment_date'
       				},{
       					xtype:'label',
       					html:'...',
       					cls:'time_text',
						name: 'appointment_time'
       				}]	
       			}]
       		},{
       			xtype:'container',
       			cls:'home_doctor',
       			layout:{
       				type:'hbox'
       			},
       			items:[{
       				xtype:'container',
       				cls:'doctor_icon',
       				flex:2 
       			},{
       				xtype:'container',
       				cls:'doctor_info',
       				flex:4,
       				layout:{
       					type:'vbox'
       				},
       				items:[
       				{
       					xtype:'label',
       					html:'...',
       					cls:'doctor_name',						
						name: 'appointment_doctorname'
       				},{
       					xtype:'container',
       					cls:'phone',
       					layout:{
       						type:'hbox'
       					},
       					items:[{
       						xtype:'container',
       						cls:'icon',
       						flex:1
       					},{
       						xtype:'label',
       						html:'...',
       						flex:6,
							style: {
								'margin-top': '4px'
							},
							name: 'appointment_phone'
       					}]
       				},{
       					xtype:'container',
       					cls:'address',
       					layout:{
       						type:'hbox'
       					},
       					items:[{
       						xtype:'container',
       						cls:'icon',
       						flex:1
       					},{
       						xtype:'label',
       						html:'...',
       						flex:6,
							style: {
								'line-height': '15px'
							},
							name: 'appointment_location'
       					}]
       				}]	
       			}]
       		},
	       		{
	       		xtype:'container',
	       		cls:'home_history',
	       		flex: 1,
	       		layout:{
	       			type:'vbox'
	       		},
	       		items:[{
	       			xtype:'label',
	       			//html:'MY MEDICAL HISTORY',
					localize:true,
			        locales:{
			        	html:'MY_MEDICAL_HISTORY_LABEL'
			        }, 
	       			cls:'home_history_label'
	       		},{
	       			xtype: 'segmentedbutton',
					cls: 'segmentedbutton_custom home_segmentedbutton',
					layout: {
			            type : 'hbox',
			            pack : 'center',
			            align: 'stretchmax'
			        },
					defaults: {
						width: '45%'
					},
					//allowDepress: true,
	                items: [
	                    {
	                        //text: 'Blood pressure',
							localize:true,
					        locales:{
					        	text:'HISTORY_BLOOD_PRESSURE_LABEL'
					        }, 	
	                        pressed: true,
							viewIndex: 0
	                    },
	                    {
	                        //text: 'Total Cholesterol',
							localize:true,
					        locales:{
					        	text:'HISTORY_TOTAL_CHOLESTEROL_LABEL'
					        }, 
	                        viewIndex: 1                    
						}
	                ] 
	       		},{
	       			xtype:'tab_home_historychart',
	       			flex: 1
	       		}/*,
	       		{
	       			xtype: 'segmentedbutton',
					cls: 'segmentedbutton_original',
					layout: {
			            type : 'hbox',
			            pack : 'center',
			            align: 'stretchmax'
			        },
					defaults: {
						width: '30%'
					},
					style :{
						'margin-bottom': '5px',
						'width': '280px',
						'margin-left': '25px'
					},
					//allowDepress: true,
	                items: [
	                    {
	                        text: 'Day',	
	                        pressed: true,
							viewIndex: 0
	                    },
	                    {
	                        text: 'Month',
	                        viewIndex: 1                    
						},
						{
	                        text: 'Year',
	                        viewIndex: 2                    
						}
	                ] 
	       		}*/
	       		]
       		}]
       		
       	}]				
   },
   
   initialize: function() {
   		this.callParent(arguments);
		this.assignVars();
		this.showBloddPressureChart();
		PatientDiary.app.on('update_progresschart', this.update_view, this);
   },
   
   update_view: function() {
   		if (!this._chartIndex) this._chartIndex = 0;
		if (this._chartIndex == 0) {
			this.showBloddPressureChart();
		} else {
			this.showTotalCholesterolChart();
		}
   },
   
   updateNextAppointmentInfo: function(data) {   		
   		var me = this;
		me._nextAppointmentData = data;
		
		var date = new Date(data.time);
		me._dateLabel.setHtml(date.getShortDayName().toUpperCase() + ' ' + date.recordFormat());
		me._timeLabel.setHtml('at ' + data.hourminute);
		me._doctorLabel.setHtml('Doctor <b>' + data.doctorname + '</b>'); 
		if (data.phone ) me._phoneLabel.setHtml('<u>' + data.phone + '</u>');
		else me._phoneLabel.setHtml('NA');
		if (data.location) me._locationLabel.setHtml('<u>' + data.location + '</u>');
		else me._locationLabel.setHtml('NA');
   },
   
   showBloddPressureChart: function() {
   		var me = this;
		me._historyChart.showChart({pos:1, type: 'other'});
		me._chartIndex = 0;
   },
   
    showTotalCholesterolChart: function() {
   		var me = this;
		me._historyChart.showChart({pos:2, type: 'blood'});
		me._chartIndex = 1;
   },
   
   assignVars: function() {
   		var me = this;
   		if (!me._dateLabel) {
			me._dateLabel = me.down('label[name = "appointment_date"]');
		}
		if (!me._timeLabel) {
			me._timeLabel = me.down('label[name = "appointment_time"]');
		}
		if (!me._doctorLabel) {
			me._doctorLabel = me.down('label[name = "appointment_doctorname"]');
		}
		if (!me._phoneLabel) {
			me._phoneLabel = me.down('label[name = "appointment_phone"]');
		}
		if (!me._locationLabel) {
			me._locationLabel = me.down('label[name = "appointment_location"]');
		}	
		if (!me._historyChart) {
			me._historyChart = me.down('tab_home_historychart');
		}	
   }
   
});
