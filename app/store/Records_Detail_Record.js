Ext.define('PatientDiary.store.Records_Detail_Record', {
    extend: 'Ext.data.Store',
    config: {
       	model: 'PatientDiary.model.Record',
        autoLoad: false,
		proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'record',
    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
    			dbQuery: ''//PatientDiary.util.CommonUtil.offline.getDbQueryString("Records_Detail_Record",PatientDiary.util.CommonUtil.getLang(),{mm,yy})
    		},
    		reader: {
               type: 'array'
            }
       }		
    }
});
