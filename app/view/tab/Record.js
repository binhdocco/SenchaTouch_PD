Ext.define('PatientDiary.view.tab.Record', {
    extend: 'PatientDiary.view.component.NavigationViewBase',
    xtype: 'tab_record',
    requires: [
		'PatientDiary.view.tab.record.RecordBloodList',
		'PatientDiary.view.tab.record.RecordOtherList'
	],
    config: {    
		title: '',  
		localize:true,
        locales:{
        	title:'YOUR_RECORDS_TITLE'
        },  
		//autoDestroy: false,
		/*navigationBar:{
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
					iconCls:'add_icon',
					align: 'right',
					hideAnimation:{
                        type: 'fadeOut',
                        duration: 100
                    },
                    showAnimation:{
                        type: 'fadeIn',
                        duration: 100
                    },
					title: 'toolbar_recordadd_button'
				}
			]
       },*/
        iconCls: 'crestor-tabbar-icon-record',
        items:[
        /*{
        	xtype:'add_record_detail'	
        },*/{
        	xtype:'container',			
        	//title:'Your records',
        	layout:{
        		type:'vbox'
        	},
        	items:[
        	{
        		xtype:'container',
        		flex: 2,
        		cls:'record_blood_test',
        		layout:{
        			type:'vbox'
        		},
        		items:[
        		{
        			xtype:'container',
        			cls:'blood_test_header',
        			layout:{
        				type:'hbox'
        			},
        			items:[
        			{
        				xtype:'container',        				
        				cls:'blood_test_icon'
        			},
        			{
        				xtype:'label',
        				//html: 'Blood tests',
						localize:true,
				        locales:{
				        	html:'BLOOD_TESTS_LABEL'
				        },  
        				cls:'record_header_group_label',
        				//flex: 2
        			},
					{
        				xtype:'spacer'
        			},
        			{
        				xtype:'label',
        				html:'',
        				cls:'record_header_date_label',						
						title: 'blood_date_label'
        				//flex: 2	
        			},{
        				xtype:'button',
        				cls:'add_icon',
        				//flex: 0.7,
						title: 'bloodtestadd',
						style: {
							//'margin-right': '10px'
						},
        			}
        			]
        		},{
        			xtype:'tab_record_recordbloodlist'
        		}
        		]	
        	},{
        		xtype:'container',
        		flex: 1,
        		cls:'record_others',
        		layout:{
        			type:'vbox'
        		},
        		items:[
        		{
        			xtype:'container',
        			cls:'others_header',
        			layout:{
        				type:'hbox'
        			},
        			items:[
        			{
        				xtype:'container',
        				
        				cls:'others_icon'
        			},
        			{
        				xtype:'label',
        				//html: 'Others',
						localize:true,
				        locales:{
				        	html:'OTHERS_LABEL'
				        },
        				cls:'others_icon_group_label',
        				//flex: 2
        			},
					{
        				xtype:'spacer'
        			},
        			{
        				xtype:'label',
        				html:'',
        				cls:'record_header_date_label',
        				
						title: 'other_date_label'	
        			},{
        				xtype:'button',
        				cls:'add_icon',
        				//flex: 0.7,
						title: 'othertestadd'
        			}
        			]
        		
        		},{
        			xtype:'tab_record_recordotherlist'
        		}
        		]			
        	}]
        }]			
   },
   
   initialize: function() {
   		this.callParent(arguments);		
		this.assignList();
   },
   
   refreshStore: function() {
   		var me = this;
		me._bloodList.getStore().load(function(records){
				if (records.length > 0) {
					var dateStr = records[0].data.time;					
					me.updateBloodDateString(dateStr);	
				}	
						
			});
		me._otherList.getStore().load(function(records){
				if (records.length > 0) {
					var dateStr = records[0].data.time;					
					me.updateOtherDateString(dateStr);	
				}	
			});
   },
   
   updateBloodDateString: function(time) {
   		var date = new Date(time);//dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1'));
   		dateStr = date.recordFormat();
		var label = this.down('label[title = "blood_date_label"]');
		label.setHtml(dateStr);		
   },
     updateOtherDateString: function(time) {
   		var date = new Date(time);//dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1'));
   		dateStr = date.recordFormat();		
		var label = this.down('label[title = "other_date_label"]');
		label.setHtml(dateStr);
   },
   
   assignList: function() {
   		var me = this;
		if (!me._bloodList) {
			me._bloodList = me.down('tab_record_recordbloodlist');
			me._bloodList.getStore().load(function(records){				
				if (records.length > 0) {
					var dateStr = records[0].data.time;					
					me.updateBloodDateString(dateStr);
				}
				
			});
		}
		
		if (!me._otherList) {
			me._otherList = me.down('tab_record_recordotherlist');
			me._otherList.getStore().load(function(records){
				if (records.length > 0) {
					var dateStr = records[0].data.time;					
					me.updateOtherDateString(dateStr);	
				}
			});
		}
   },
   
   deleteOldData: function(dateString, callback, type) {
   		var me = this;
   		if (!me._recordDeleteStore) {
			me._recordDeleteStore = Ext.getStore('Records_Lastest_Delete');
		}
		me._recordDeleteStore.getProxy().removeRecord(dateString, 'record', 'date', callback, [ ['type', type]]);//.config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Lastest_Delete",PatientDiary.util.CommonUtil.getLang(), dateString);
   }
   
});
