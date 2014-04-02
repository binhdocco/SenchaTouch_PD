Ext.define('PatientDiary.view.component.HistoryChart', {
    extend: 'Ext.Container',
    xtype: 'component_historychart',
    requires: [
    ],
	config: {        
		data: {
			'labels': ["NOV","DEC","JAN","FEB"],
			'valueData': [2,6,4,5]
		},
        html:'<canvas id="canvas_home" width="310" height="200"></canvas>'
     },
     initialize:function(){
     	var me = this;
     	me._options = {
			//Boolean - Whether the line is curved between points
			bezierCurve : false,
			animation : true,
			pointDotRadius : 5,
			scaleFontColor: "#6f685f",
			pointDotStrokeWidth : .1,
			scaleGridLineColor : "rgba(111,104,95,.3)",
			scaleLineColor : "rgba(111,104,95,.6)",
			scaleFontFamily : "'Crestor-ITCAVANTGARDESTD-BK'"
		};  
		setTimeout(function(){     		
     		if (!me._context) me._context = document.getElementById("canvas_home").getContext("2d");
			me.showChart();
     	},100);
     	
    },
	
	showChart: function() {
		this.genRecent4MonthNames();     	
	},
	
	genRecent4MonthNames: function() {
		this._dateData = [];			
		this._getDone = 0;
		this.startDiffMonth = 0;
		this.getDataForMonth(this.startDiffMonth);
		
	},
	getDataForMonth: function(diffmonth) {
		this.checkGetDataDone();
	},
	
	checkGetDataDone: function() {
		this._getDone ++;
		if (this._getDone >= 4) {
			
			var lineChartData = {
				labels : this.getData()['labels'],
				datasets : [
					{
						fillColor : "rgba(231,247,252,0.5)",
						strokeColor : "rgba(0,165,224,1)",
						pointColor : "rgba(0,165,224,1)",
						pointStrokeColor : "#fff",
						data : this.getData()['valueData']
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