Ext.define('PatientDiary.view.tab.progress.DetailList', {
    extend: 'PatientDiary.view.component.RecordList',
    xtype:'tab_progress_detaillist',
    config: {
		store:'Records_Detail_Record',
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
