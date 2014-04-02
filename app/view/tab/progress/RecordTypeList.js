Ext.define('PatientDiary.view.tab.progress.RecordTypeList', {
    extend: 'PatientDiary.view.component.RecordList',
    xtype:'tab_progress_recordtypelist',
    config: {
		store:'Records_Lastest_Blood',
		cls:'record-type-list',
		itemTpl: ['<div class="title">{title}</div>',
				'<div class="name">{unit}</div>',
				'<div class="value {color}">{value}</div>'].join(""),
		onItemDisclosure:true
    }
});
