Ext.define('PatientDiary.controller.TabProgress', {
    extend: 'Ext.app.Controller',
	requires:[
		'PatientDiary.view.tab.progress.RecordDetail',
		'PatientDiary.view.tab.progress.RecordHistory'
	],
    config: {
        refs: {		
			tabProgress: 'tab_progress',
			tabProgressMenuButton: 'tab_progress button[iconCls = "crestor-toolbar-icon-menu"]'		
        },//end refs
        control: {
			tabProgress: {
				pop: function(me, view) {
					if (view.getId() == this._recordDetail.getId())
						this.getTabProgressMenuButton().show();				
				},
				push: function() {
					this.getTabProgressMenuButton().hide();
				}
			},
			
			'tab_progress segmentedbutton': {
				toggle: function(container, button, pressed){
        			if (pressed == true) {
        				if(button.config.viewIndex == 0){
        					var store = Ext.getStore("Records_Lastest_Blood");			
							this.getTabProgress().updateListStore(store);
						} else {
							var store = Ext.getStore("Records_Lastest_Other");			
							this.getTabProgress().updateListStore(store);
						}
        									
					}
					                    
                }//end toogle
			},
			'tab_progress list': {
				disclose: function(list, record, node, index, event, eOpts) {					
					//console.log(record);
					var detail = this.getRecordDetailView();
					detail.setData(record.data);
					this.getTabProgress().push(detail);	   
				}			
			},
			'tab_progress_recorddetail button[title = "recorddetail_viewfullhistory_button"]': {
				tap: function() {
					console.log('button clicked');
					var detail = this.getRecordDetailView();
					var history = this.getRecordHistoryView();
					history.setData(detail.getData());
					this.getTabProgress().push(history);	 
				}		
			},
		}
    },
	
	getRecordDetailView: function() {
		var me = this;
		if (!me._recordDetail) {
			me._recordDetail = Ext.create('PatientDiary.view.tab.progress.RecordDetail');
		}
		return me._recordDetail;
	},
	getRecordHistoryView: function() {
		var me = this;
		if (!me._recordHistory) {
			me._recordHistory = Ext.create('PatientDiary.view.tab.progress.RecordHistory');
		}
		return me._recordHistory;
	}
});