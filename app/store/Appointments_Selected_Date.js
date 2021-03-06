Ext.define('PatientDiary.store.Appointments_Selected_Date', {
    extend: 'Ext.data.Store',
    config: {
       	model: 'PatientDiary.model.Appointment',
        autoLoad: false,
		doReload: true,
		proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'appointment',
    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
    			dbQuery: ''//PatientDiary.util.CommonUtil.offline.getDbQueryString("Appointments_Selected_Date",PatientDiary.util.CommonUtil.getLang(),{mm,yy})
    		},
    		reader: {
               type: 'array'
            }
       }		
    },
	updateDBQuery: function() {
		console.log(this.getProxy().config.dbConfig.dbQuery);
	}
});
