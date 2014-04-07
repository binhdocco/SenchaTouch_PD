Ext.define('PatientDiary.view.component.RecordList', {
    extend: 'Ext.List',
    config: {    	
        variableHeights: true,
        infinite: true,        
		flex: 1,
		emptyText:'NO DATA',
		localize:true,
		locales : {
	         //weekTitle: 'WEEK_TEXT',
			 emptyText: 'NO_DATA_TEXT'
	   	},
    },
	setLocale:function(locale){
		this.callParent(arguments);
	},
		
	initialize: function() {
		this.callParent(arguments);
		Ux.locale.Manager.applyLocaleForCmp(this);
	}
});
