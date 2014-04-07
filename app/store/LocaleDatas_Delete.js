Ext.define('PatientDiary.store.LocaleDatas_Delete', {
    extend: 'Ext.data.Store',
    config: {
       	//fields:['name','pos','type'],		
		model:'PatientDiary.model.TestItem',
       proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'testitem',
    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
    			dbQuery:'SELECT * FROM testitem'
    		},
    		reader: {
               type: 'array'
            }
   		},
	    autoLoad: false
    }
});
