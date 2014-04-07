Ext.define('PatientDiary.model.TestItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
	           {
	            	name:'title',
	            	type:'string'
	            },
	            {
	            	name:'pos',
	            	type:'int'
	            },
	            {
	            	name:'type',
	            	type:'string'
	            },
				{
	            	name:'lang',
	            	type:'string'
	            },
	            {
	            	name:'id',
	            	type:'int',
	            	fieldOption:' PRIMARY KEY AUTOINCREMENT '
	            }
        	],
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
       		}
    }
});
