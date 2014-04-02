Ext.define('PatientDiary.view.tab.progress.RecordDetail', {
    extend: 'Ext.Container',
    xtype: 'tab_progress_recorddetail',
    requires: [
		'PatientDiary.view.tab.progress.DetailChart',
		'PatientDiary.view.tab.progress.DetailList'
	],
    config: {      
		data: null,
		title:'Record Title', 
		//scrollable:true,
		autoDestroy: false,    
		layout: {
			type: 'vbox'
		},    
        items:[
			{
				xtype:'tab_progress_detailchart',
				style: {
					'margin-top': '10px',
					'margin-bottom': '10px'
				}				
			},{
				xtype:'tab_progress_detaillist'
			}, {
				xtype: 'container',
				layout: {
					type: 'hbox',
					pack: 'end'
				},
				items: [
					{
						xtype: 'button',
						text: 'View full history',
						cls: 'crestor-button-rectangle',
						style: {
							'margin-bottom': '6px',
							'margin-right': '20px',
							'margin-top': '2px'		
						},
						title: 'recorddetail_viewfullhistory_button'
					}
				]
			}
		]				
   },
   
   initialize: function() {
   		this.callParent(arguments);
		this.assignVars();
		
		PatientDiary.app.on('update_progresschart', this.update_view, this);
   },
   
   update_view: function() {
   		var data = this.getData();		
		var me = this;
		
		me._detailChart.showChart(data);
		
   		var extra = {};
		extra.pos = data.pos;
		extra.type = data.type;
		extra.limit = 'LIMIT 3';
		
		var store = this._detailList.getStore();
		store.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Detail_Record",PatientDiary.util.CommonUtil.getLang(),extra);
		//console.log(store.getProxy().config.dbConfig.dbQuery);
		store.load();
   },
   
   updateData: function() {   	
   		var data = this.getData();		
		var me = this;
		//console.log(data);		
		if (data) {
			me.setTitle(data.title);			
			me._detailChart.showChart(data);
			
			var extra = {};
			extra.pos = data.pos;
			extra.type = data.type;
			extra.limit = 'LIMIT 3';
			
			this._detailList.getScrollable().getScroller().scrollToTop();
			var store = this._detailList.getStore();
			store.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Detail_Record",PatientDiary.util.CommonUtil.getLang(),extra);
			//console.log(store.getProxy().config.dbConfig.dbQuery);
			store.load();
		}
   },
   
   assignVars: function() {
   		if (!this._detailChart) {
			this._detailChart = this.down('tab_progress_detailchart');
		}
		if (!this._detailList) {
			this._detailList = this.down('tab_progress_detaillist');
		}
   }
   
});
