Ext.define('PatientDiary.view.tab.record.RecordOtherList', {
    extend: 'PatientDiary.view.component.RecordList',
    xtype:'tab_record_recordotherlist',
    config: {    	
  		store:'Records_Lastest_Other',
		cls:'record-list',
		itemTpl: ['<div class="title">{title}</div>',
				'<div class="name">{unit}</div>',
				'<div class="value {color}">{value}</div>'].join(""),
		onItemDisclosure:true
    }
});
