Ext.define('PatientDiary.model.Record', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
	           {
	            	name:'title',
	            	type:'string'
	            },
	            {
	            	name:'unit',
	            	type:'string'
	            },
	            {
	            	name:'value',//(mmol/L),''
	            	type:'string'
	            },
	            {
	            	name:'color',//blue, orange
	            	type:'string'
	            },
	            {
	            	name:'date',//dd/mm/yyyy
	            	type:'string'
	            },
				{
	            	name:'type',//blood, other
	            	type:'string'
	            },
				{
	            	name:'time',//date.getTime()
	            	type:'number'
	            },
				{
	            	name:'pos',//1,2,3,4,5,...
	            	type:'int'
	            },
	            {
	            	name:'id',
	            	type:'int',
	            	fieldOption:' PRIMARY KEY AUTOINCREMENT'
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
	            },
        	],
        	proxy:{
	    		type:'sqlitestorage',
	    		dbConfig: {
		    		tablename:'record',
	    			dbConn: PatientDiary.util.CommonUtil.dbConnection,
	    			dbQuery:'SELECT * FROM record'
	    		},
	    		reader: {
	               type: 'array'
	            }
       		}
    }
});
