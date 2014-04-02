Ext.define('PatientDiary.store.Records_Lastest_Delete', {
    extend: 'Ext.data.Store',
    config: {
       	model: 'PatientDiary.model.Record',
        autoLoad: false,
		proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'record',
    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
    			dbQuery: ''//PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Lastest_Delete",PatientDiary.util.CommonUtil.getLang())
    		},
    		reader: {
               type: 'array'
            }
       }		
    }
});
