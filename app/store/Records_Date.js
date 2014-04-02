Ext.define('PatientDiary.store.Records_Date', {
    extend: 'Ext.data.Store',
    config: {
       	model: 'PatientDiary.model.Record',
        autoLoad: false,
		proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'record',
    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
    			dbQuery: ''//PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Date",PatientDiary.util.CommonUtil.getLang(),'other')
    		},
    		reader: {
               type: 'array'
            }
       }		
    }
});
