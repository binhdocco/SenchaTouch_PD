Ext.define('PatientDiary.util.offline.Data',{
	extend:'Ext.util.Observable',
	alias:'data',
	constructor: function(config) {
        config = config || {};
        Ext.apply(this, config);
        var me = this;
        me.callParent([this]);
       
        return me;
  },
  filterStore:function(name,field, value){
  		var store = Ext.getStore(name);
  		store.filter({property: field, value:value});
  },
  loadData:function(name,lang){
  		var store = Ext.getStore(name);
  		store.getProxy().config.dbConfig.dbQuery = this.getDbQueryString(name,lang);
		store.load();
  },
  
  getDbQueryString:function(name, lang, extra){
  	var queryStr = "";
  	switch(name){
			case 'Records_Lastest':
				var limit = 'LIMIT ';
				if (extra == 'blood') limit += '6';
				else limit += '3';
				queryStr = 'SELECT r.pos, ti.title, r.value, r.color, r.date, r.type, r.time, r.unit, r.id, r.mm, r.dd, r.yy, r.localetime, r.dayname, r.monthname FROM record r LEFT JOIN testitem ti ON r.pos = ti.pos AND r.type = ti.type WHERE r.type="' + extra + '" AND ti.lang="' + lang + '" ORDER BY r.time DESC, r.pos ASC ' + limit;
				//console.log(queryStr);
			break;

			case 'Records_Date':
				queryStr = 'SELECT * FROM record r WHERE r.date="' + extra + '"'
			break;
			
			case 'Records_Filter_Month':
  				queryStr = 'SELECT IFNULL(r.value, 0) as xtotal FROM record r WHERE type="' + extra.type + '" AND mm=' + extra.mm + ' AND yy=' + extra.yy + ' AND pos=' + extra.pos + ' ORDER BY r.dd DESC LIMIT 1';
				//console.log(queryStr);
  			break;	
			
			case 'Records_Detail_Record':
  				queryStr = 'SELECT * FROM record r WHERE type="' + extra.type + '" AND pos=' + extra.pos + ' ORDER BY r.time DESC ' + extra.limit;
  			break;
			
			case 'Appointments_Selected_Date':
  				queryStr = 'SELECT * FROM appointment WHERE dd=' + extra.dd + ' AND mm=' + extra.mm + ' AND yy=' + extra.yy + ' ORDER BY time DESC';
  			break;
			
			case 'Appointments':
  				queryStr = 'SELECT * FROM appointment ORDER BY time DESC';
  			break;
			
			case 'Appointments_Next':
  				queryStr = 'SELECT * FROM appointment where time > ' + ((new Date()).getTime() - 2*60*1000) + ' ORDER BY time ASC LIMIT 1';
				//console.log(queryStr);
  			break;
			
			case 'Appointments_Reminder':
  				queryStr = 'SELECT * FROM appointment where time > ' + (new Date()).getTime() + ' AND didreminder="false" ORDER BY remindertime DESC';
  			break;
			//select * from appointment where time > 1395131438436 order by time asc limit 1
			
  	}
  	return queryStr;
  },
  removeStore:function(name){
  	var store = Ext.getStore(name);
  	if(store.isLoaded){
  		store.removeAll();
  		store.sync();
  	}
  },
  dropTable:function(name){
  	var catStore = Ext.getStore(name);
  	catStore.getModel().getProxy().dropTable();
  },
  alterTable:function(name){
  	
  },
   reloadData:function(){
  	//console.log('DATA reloadData');
  	var stores = PatientDiary.app.getStores();	
  	Ext.Array.each(stores,function(store,index){			
		if (store.updateDBQuery) store.updateDBQuery();
		if (store.config.doReload) {
			store.removeAll();
	  		store.load();	
		}
		
  	});
	//PatientConcierge.util.CommonUtil.updateLevelProgress();
  }
});