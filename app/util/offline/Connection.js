Ext.define('PatientDiary.util.offline.Connection',{
	extend:'Ext.util.Observable',
	dbName: undefined,
    
    dbVersion: '1.0',
    dbDescription: '',
    dbSize: 5 * 1024 * 1024,
    
    dbConn: undefined,
    
    constructor         : function(config) {
    	config = config || {};
        Ext.apply(this, config);
        var me = this;
        me.callParent([this]);
        try{
        	me.dbConn = window.openDatabase(me.dbName,me.dbVersion, me.dbDescription, me.dbSize);
        }catch(e){
        	console.log(e.message);
        }
        return me;
    }
});
