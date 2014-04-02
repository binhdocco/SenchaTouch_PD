Ext.define('PatientDiary.view.tab.progress.ProgressChart', {
    extend: 'Ext.Container',
    xtype: 'tab_progress_progresschart',
    requires: [
    ],
	config: {        
		data: {
			'labels': ["NOV","DEC","JAN","FEB"],
			'total_cholesterol': [1,3,2,5],
			'bad_cholesterol': [2,3,1,5]
		},
        html:'<canvas id="progress_home_canvas_id" width="320" height="200"></canvas>'
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
		
		PatientDiary.app.on('update_progresschart', this.showChart, this);
    },
	showChart: function() {
		var me = this;
		if (!me._context) me._context = document.getElementById("progress_home_canvas_id").getContext("2d");
		setTimeout(function(){
			me.genRecent4MonthNames();
		},100);
	},
	/*renderChart: function() {
		var lineChartData = {
		labels : this.getData()['labels'],
		datasets : [
			{
				fillColor : "rgba(231,247,252,0.5)",
				strokeColor : "rgba(0,165,224,1)",
				pointColor : "rgba(0,165,224,1)",
				pointStrokeColor : "#fff",
				data : this.getData()['valueData']
			},
			{
				fillColor : "none",
				strokeColor : "rgba(255,130,0,1)",
				pointColor : "rgba(255,130,0,1)",
				pointStrokeColor : "#fff",
				data : this.getData()['value1Data']
			}
		]
		
		};
		if (!this._line) {
			this._line = new Chart(this._context);
		}
		this._line.Line(lineChartData, this._options);
	},*/
	genRecent4MonthNames: function() {
		this._dateData = [];			
		this.getData()['labels'] = [];	
		this.getData()['total_cholesterol'] = [];	
		this.getData()['bad_cholesterol'] = [];
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
		var filterTotalData = {mm: p.getMonth(), yy: p.getFullYear(), pos: 2, type: 'blood'};
		var filterBadData = {mm: p.getMonth(), yy: p.getFullYear(), pos: 3, type: 'blood'};
		
		var totalStore = Ext.getStore('Records_Filter_Month');
		totalStore.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Filter_Month",'', filterTotalData);
		totalStore.load(function(){
			thisObj.getData()['total_cholesterol'][diffmonth] = totalStore.data.all[0].raw.xtotal;
			//thisObj.checkGetDataDone();
			var badStore = Ext.getStore('Records_Filter_Month');
			badStore.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Filter_Month",'', filterBadData);
			badStore.load(function(){
				thisObj.getData()['bad_cholesterol'][diffmonth] = badStore.data.all[0].raw.xtotal;
				thisObj.checkGetDataDone();
			});
		});
	},
	
	checkGetDataDone: function() {		
		this._getDone ++;
		//console.log('checkGetDataDone: ' + this._getDone);
		if (this._getDone >= 4) {
			
			this.getData()['labels'].reverse();
			this.getData()['total_cholesterol'].reverse();
			this.getData()['bad_cholesterol'].reverse();
			
			var lineChartData = {
				labels : this.getData()['labels'],
				datasets : [
					{
						fillColor : "none",
						strokeColor : "rgba(0,165,224,1)",
						pointColor : "rgba(0,165,224,1)",
						pointStrokeColor : "#fff",
						data : this.getData()['total_cholesterol']
					},
					{
						fillColor : "none",
						strokeColor : "rgba(255,130,0,1)",
						pointColor : "rgba(255,130,0,1)",
						pointStrokeColor : "#fff",
						data : this.getData()['bad_cholesterol']
					}
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