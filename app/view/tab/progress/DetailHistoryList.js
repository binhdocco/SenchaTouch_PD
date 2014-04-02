Ext.define('PatientDiary.view.tab.progress.DetailHistoryList', {
    extend: 'PatientDiary.view.component.RecordList',
    xtype:'tab_progress_detailhistorylist',
    config: {
		store:'Records_History_Record',
		cls:'recorddetail-list',
		itemTpl: [
				'<div class="thumb">{dd}<br/>{monthname}</div>',
				'<div class="info">',
					'<div class="weekday">{dayname}, {localetime}</div>',
					'<div class="yourreading">Your reading: {value} {unit}</div>',
				'</div>',
				'<div class="arrow"></div>'].join("")
    }
});
