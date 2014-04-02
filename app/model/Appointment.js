Ext.define('PatientDiary.model.Appointment', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
	            {
	            	name:'doctorname',
	            	type:'string'
	            },
	            {
	            	name:'location',
	            	type:'string'
	            },
				{
	            	name:'phone',
	            	type:'string'
	            },
	            {
	            	name:'note',
	            	type:'string'
	            },
	            {
	            	name:'date',
	            	type:'string'
	            },
				{
	            	name:'hourminute',
	            	type:'string'
	            },
				{
	            	name:'time',//date.getTime()
	            	type:'number'
	            },
	            {
	            	name:'remindertime',
	            	type:'string'
	            },
				{
	            	name:'didreminder',
	            	type:'string'
	            },
	            {
	            	name:'id',
	            	type:'int',
	            	fieldOption:' PRIMARY KEY AUTOINCREMENT '
	            },
				{
	            	name:'mm',
	            	type:'string'
	            },
				{
	            	name:'yy',
	            	type:'string'
	            },
				{
	            	name:'dd',
	            	type:'string'
	            },
				{
	            	name:'localetime',
	            	type:'string'//15:00:00
	            },{
	            	name:'dayname',
	            	type:'string'//Sunday, ...., Saturday
	            },{
	            	name:'monthname',
	            	type:'string'//JAN, FEB, ...
	            }
        	],
        	proxy:{
	    		type:'sqlitestorage',
	    		dbConfig: {
		    		tablename:'appointment',
	    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
	    			dbQuery:'SELECT * from user'
	    		},
	    		reader: {
	               type: 'array'
	            }
       		}
    }
});
