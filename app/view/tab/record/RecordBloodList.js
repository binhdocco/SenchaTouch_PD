Ext.define('PatientDiary.view.tab.record.RecordBloodList', {
    extend: 'PatientDiary.view.component.RecordList',
    xtype:'tab_record_recordbloodlist',
    config: {    	
   		store:'Records_Lastest_Blood',
		cls:'record-list',
		itemTpl: ['<div class="title">{title}</div>',
				'<div class="name">{unit}</div>',
				'<div class="value {color}">{value}</div>'].join(""),
		onItemDisclosure:true
    }
});
