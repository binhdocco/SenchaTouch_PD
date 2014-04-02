Ext.define('PatientDiary.store.Appointments', {
    extend: 'Ext.data.Store',
    config: {
       	model: 'PatientDiary.model.Appointment',
        autoLoad: true,
		proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'appointment',
    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
    			dbQuery: PatientDiary.util.CommonUtil.offline.getDbQueryString("Appointments",PatientDiary.util.CommonUtil.getLang())
    		},
    		reader: {
               type: 'array'
            }
       }		
    }
});
