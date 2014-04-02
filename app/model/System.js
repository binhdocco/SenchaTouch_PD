Ext.define('PatientDiary.model.System', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
            	name:'name',
            	type:'string',
            	fieldOption:''
           },
           {
            	name:'value',
            	type:'string',
            	fieldOption:''
            },
            {
            	name:'id',
            	type:'int',
            	fieldOption:' PRIMARY KEY AUTOINCREMENT'
            }
        ],
        proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'system',
    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
    			dbQuery:'SELECT * from system'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
