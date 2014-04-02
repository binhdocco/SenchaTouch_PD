Ext.define('PatientDiary.view.tab.progress.DetailChart', {
    extend: 'Ext.Container',
    xtype: 'tab_progress_detailchart',
    requires: [
    ],
	config: {
		recordData: null,
		data: {
			'labels': ["NOV","DEC","JAN","FEB"],
			'value': [1,3,2,5],
			//'bad_cholesterol': [2,3,1,5]
		},
        html:'<canvas id="progress_detail_canvas_id" width="320" height="200"></canvas>',
		height: 200
     },
     initialize:function(){
	 	this.callParent(arguments);	
     	var me = this;
     	me._options = {
			//Boolean - Whether the line is curved between points
			bezierCurve : false,
			animation : false,
			pointDotRadius : 5,
			scaleFontColor: "#6f685f",
			pointDotStrokeWidth : .1,
			scaleGridLineColor : "rgba(111,104,95,.3)",
			scaleLineColor : "rgba(111,104,95,.6)",
			scaleFontFamily : "'Crestor-ITCAVANTGARDESTD-BK'"
		};
		setTimeout(function(){
			if (!me._context) me._context = document.getElementById("progress_detail_canvas_id").getContext("2d");
		},100);
		
		//PatientDiary.app.on('update_progresschart', this.showChart, this);
    },
	showChart: function(recorddata) {
		var me = this;		
		if (recorddata) me.setRecordData(recorddata);
		setTimeout(function(){
			me.genRecent4MonthNames();
		},200);
	},

	genRecent4MonthNames: function() {
		this._dateData = [];			
		this.getData()['labels'] = [];	
		this.getData()['value'] = [];	
		//this.getData()['bad_cholesterol'] = [];
		this._getDone = 0;
		this.startDiffMonth = 0;
		this.getDataForMonth(this.startDiffMonth);
		
	},
	getDataForMonth: function(diffmonth) {
		var thisObj = this;
		var today = new Date();
		var dif = (new Date()).getMonth() - diffmonth;
		var p = new Date(today.setMonth(dif));
				
		this.getData()['labels'].push(p.getShortMonthName() + ' ' + p.getFullYear());
		var filterTotalData = {mm: p.getMonth(), yy: p.getFullYear(), pos: thisObj.getRecordData().pos, type: thisObj.getRecordData().type};
		//var filterBadData = {mm: p.getMonth(), yy: p.getFullYear(), pos: 3};
		
		var totalStore = Ext.getStore('Records_Filter_Month');
		totalStore.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Filter_Month",'', filterTotalData);
		totalStore.load(function(){
			thisObj.getData()['value'][diffmonth] = totalStore.data.all[0].raw.xtotal;
			//thisObj.checkGetDataDone();
			/*var badStore = Ext.getStore('Records_Filter_Month');
			badStore.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Filter_Month",'', filterBadData);
			badStore.load(function(){
				thisObj.getData()['bad_cholesterol'][diffmonth] = badStore.data.all[0].raw.xtotal;
				thisObj.checkGetDataDone();
			});*/
			thisObj.checkGetDataDone();
		});
	},
	
	checkGetDataDone: function() {		
		this._getDone ++;
		//console.log('checkGetDataDone: ' + this._getDone);
		if (this._getDone >= 4) {
			
			this.getData()['labels'].reverse();
			this.getData()['value'].reverse();
			//this.getData()['bad_cholesterol'].reverse();
			
			var lineChartData = {
				labels : this.getData()['labels'],
				datasets : [
					{
						fillColor : "none",
						strokeColor : "rgba(0,165,224,1)",
						pointColor : "rgba(0,165,224,1)",
						pointStrokeColor : "#fff",
						data : this.getData()['value']
					}/*,
					{
						fillColor : "none",
						strokeColor : "rgba(255,130,0,1)",
						pointColor : "rgba(255,130,0,1)",
						pointStrokeColor : "#fff",
						data : this.getData()['bad_cholesterol']
					}*/
				]
				
			};
			
			/*this._context.save();
			this._context.setTransform(1, 0, 0, 1, 0, 0);
			this._context.clearRect(0, 0, canvas.width, canvas.height);
			this._context.restore();*/
			if (!this._line) {
				this._line = new Chart(this._context);
			}
			this._line.Line(lineChartData, this._options);
			this._getDone = 0;
		} else {
			this.startDiffMonth ++;
			this.getDataForMonth(this.startDiffMonth);
		}
		
	}
});