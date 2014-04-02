Ext.define('PatientDiary.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
	           {
	            	name:'username',
	            	type:'string'
	            },
	            {
	            	name:'password',
	            	type:'string'
	            },
	            {
	            	name:'first_name',
	            	type:'string'
	            },
	            {
	            	name:'last_name',
	            	type:'string'
	            },
	            {
	            	name:'email',
	            	type:'string'
	            },
	            {
	            	name:'sex',
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
		    		tablename:'user',
	    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
	    			dbQuery:'SELECT * from user'
	    		},
	    		reader: {
	               type: 'array'
	            }
       		}
    }
});
