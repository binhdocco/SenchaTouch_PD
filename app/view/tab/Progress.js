Ext.define('PatientDiary.view.tab.Progress', {
    extend: 'PatientDiary.view.component.NavigationViewBase',
    xtype: 'tab_progress',
    requires: [
		'PatientDiary.view.tab.progress.ProgressChart',
		'PatientDiary.view.tab.progress.RecordTypeList'
	],
	config: {     
		localize:true,
        locales:{
        	title:'YOUR_PROGRESS_TITLE'
        },   
		autoDestroy: false,
        iconCls: 'crestor-tabbar-icon-progress',
        items:[{
        	xtype:'container',
        	//title:'Your progress',
        	layout:{
        		type:'vbox'
        	},
        	items:[
        	{
        		xtype:'container',
        		layout:{
        			type:'hbox'
        		},
        		cls:'chart_legend',
        		items:[
        			{
						xtype:'container',
						html: 'Total cholesterol',
						cls: 'blood-test-legend',
						flex: 1
					},
					{
						xtype:'container',
						html: 'LDL "Bad" cholesterol',
						cls: 'others-legend',
						flex: 1
					}
        		],
        		flex: 0.2
        	},
        	{
        		xtype:'tab_progress_progresschart',
        		flex: 1	
        	},
        	{
        		xtype:'container',
        		flex: 1,
        		layout:{
        			type:'vbox'
        		},
        		items:[
        		{
        			xtype: 'segmentedbutton',
					cls:'segmentedbutton_tabbar padding9px',
					defaults: {
						flex: 1							
					},
					items: [
	                    {
							viewIndex: 0,
	                        text: 'Blood tests',
	                        iconCls: 'crestor-segmentedbuttontabbar-icon-bloodtest',
	                        pressed: true		                        
	                    },
	                    {
							viewIndex: 1,
	                       	text: 'Others',
	                        iconCls: 'crestor-segmentedbuttontabbar-icon-others',						
	                    }
	                ]  
        		},{
        			xtype:'tab_progress_recordtypelist'
        		}]
        	}
        	]
        }]					
   },
   initialize:function(){
   		var me = this;
   		me.callParent(arguments);		
		me.assignVars();
		
   		me.addListener('activate', me.activeHandler, me, {
		    single: true,
		    delay: 100
		});
   },

   activeHandler:function(){
   		console.log('activeHandler');
		var chart = this.items.items[0].getItems().items[1];
		chart.showChart();
	},
	updateListStore: function(store) {
		var me = this;
		me._recordTypeList.getScrollable().getScroller().scrollToTop();
		me._recordTypeList.setStore(store);		
	},
	assignVars: function() {
		var me = this;
		if (!me._recordTypeList) {
			me._recordTypeList = me.down('list');
		}
		if (!me._segButton) {
			me._segButton = me.down('segmentedbutton');//me._segButton.setPressedButtons(0);
		}
	}
   
});
