Ext.define('PatientDiary.store.Appointments_Reminder', {
    extend: 'Ext.data.Store',
    config: {
       	model: 'PatientDiary.model.Appointment',
        autoLoad: false,
		proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'appointment',
    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
    			dbQuery: PatientDiary.util.CommonUtil.offline.getDbQueryString("Appointments_Reminder",PatientDiary.util.CommonUtil.getLang())
    		},
    		reader: {
               type: 'array'
            }
       }		
    },
	updateDBQuery: function() {
		this.getProxy().config.dbConfig.dbQuery = PatientDiary.util.CommonUtil.offline.getDbQueryString("Appointments_Reminder",PatientDiary.util.CommonUtil.getLang());
	}
});
