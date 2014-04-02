Ext.define('PatientDiary.model.Type', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
	           {
	            	name:'name',
	            	type:'string'
	            },
	            {
	            	name:'description',
	            	type:'string'
	            },
	            {
	            	name:'unit',
	            	type:'string'
	            },
	            {
	            	name:'show_progress',
	            	type:'string'
	            },
	            {
	            	name:'group_name',
	            	type:'string'
	            },
	            {
	            	name:'field_type',
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
		    		tablename:'type',
	    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
	    			dbQuery:'SELECT * from type'
	    		},
	    		reader: {
	               type: 'array'
	            }
       		}
    }
});
