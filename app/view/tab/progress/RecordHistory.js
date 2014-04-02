Ext.define('PatientDiary.view.tab.progress.RecordHistory', {
    extend: 'Ext.Container',
    xtype: 'tab_progress_recordhistory',
    requires: [
		'PatientDiary.view.tab.progress.DetailHistoryList'
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
				xtype:'tab_progress_detailhistorylist'
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
		
   		var extra = {};
		extra.pos = data.pos;
		extra.type = data.type;
		extra.limit = '';
		
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
			me.setTitle(data.title + ' history');			
			
			var extra = {};
			extra.pos = data.pos;
			extra.type = data.type;
			extra.limit = '';
			
			this._detailList.getScrollable().getScroller().scrollToTop();
			var store = this._detailList.getStore();
			store.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Detail_Record",PatientDiary.util.CommonUtil.getLang(),extra);
			//console.log(store.getProxy().config.dbConfig.dbQuery);
			store.load();
		}
   },
   
   assignVars: function() {
		if (!this._detailList) {
			this._detailList = this.down('tab_progress_detailhistorylist');
		}
   }
   
});
