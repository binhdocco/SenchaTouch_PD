Ext.define('PatientDiary.store.Records', {
    extend: 'Ext.data.Store',
    config: {
       	fields:['title','name','value','color'],
        autoLoad: false,
		data:[
	   		{
				title: "Fasting glucose",
				name:"(mmol/L)",
		    	value: "5.5",
		    	color: "orange"		        
		    },
			{
				title: "Total cholesterol",
				name:"(mmol/L)",
		    	value: "5.3",
		    	color: "blue"			        
		    },
			{
				title: "LDL 'Bad' cholesterol",
				name:"(mmol/L)",
		        value: "2.6",
		        color: "blue"			        
		    },
			{
				title: "HDL 'Good' cholesterol",
				name:"(mmol/L)",
		    	value: "1.52"	,
		    	color: "blue"		        
		   },
		   {
				title: "Trigycerides",
				name:"(mmol/L)",
		    	value: "1.56"	,
		    	color: "orange"		        
		   },
		   {
				title: "Total cholesterol/HDL ratio",
				name:"",
		    	value: "3.4"	,
		    	color: "blue"		        
		    }
	   ]
		
		
    }
});
