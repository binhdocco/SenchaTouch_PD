Ext.define('PatientDiary.store.LocaleDatas', {
    extend: 'Ext.data.Store',
    config: {
       	//fields:['name','pos','type'],		
		model:'PatientDiary.model.TestItem',
        proxy: {
	        type: "ajax",
	        url : "en.json",
	        reader: {
	            type: "json",
	            rootProperty: "tests"
	        }
	    },
	    autoLoad: false
    }
});
