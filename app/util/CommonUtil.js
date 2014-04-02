Ext.define('PatientDiary.util.CommonUtil',{
	singleton: true,
	serverUrl: 'http://192.168.1.235/crestor/backend/web/app_dev.php/api/',
	serverDownloadUrl:'http://192.168.1.235/crestor/backend/web/uploads/',
	dbConnection: null,
	synchronization: null,
	languages: ['en','vi','th','ns','zt','kr','np','my'],//English, Vietnamese,Thai,Singapore, Taiwan, Korea, Philipines,Malaysia
	_lang: 'en',
	/*category: 'getCategory.json',
	system_date: 'getSystemDate',
	achievement: 'getAchievement.json',
	level: 'getLevel.json',
	info: 'getInfo.json',
	fullPath:'data',
	imagePath:'data/images',*/
	userLogged: false,	
	useBackend:false,
	buildApi:function(type,lang,datetime){
		var api = "";
		api = this.serverUrl + this[type];
		if(this[type] != "getSystemDate"){
			if(datetime != ""){
				api = api + '/' + lang + '/' + datetime;
			}else{
				api = api + '/' + lang ;
			}
		}
		return api;
	},
	getDocPath:function(){
		if(this.runningDevice()){
			var me = this;
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(filesystem){
				me.fullPath = filesystem.root.fullPath;
			}, null);
   		}
   		
	},
	downloadFile:function(url, target, callback, errorback){
		if(this.runningDevice()){
			var fileTransfer = new FileTransfer();
	   		fileTransfer.download(url,target,callback,errorback);
   		}
	},
	setLang:function(lang){
		this._lang = lang;
	},
	getLang:function(){
		return this._lang;
	},
	createDirectory:function(name, callback, error){
		if(this.runningDevice()){
			var entry = new DirectoryEntry();
			entry.getDirectory(this.fullPath +"/"+ name, {create: true, exclusive: false}, callback, error);
		}	
	},
	buildDownloadUrl:function(type,filename){
		return this.serverDownloadUrl +type + "/" + filename;
	},
	shuffle:function(len){
		var o = [];
		for(var i = 0; i < len;i++){
			o.push(i);
		}
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},
	isOnline: function() {
        /*
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
		*/
		if(navigator.connection != undefined){
			var networkState = navigator.connection.type;
			if(networkState == "none"){
	        	return false;	
	        }
      	}
        return true;
   },
   runningDevice:function(){
	   	try{
	   		if(device.platform == null){
	   			return false;
	   		}
	   		return true;
	   	}catch(e){
	   		return false;
	   	}
   },
   getDateTime:function(datestr){
   		var dates = datestr.split(" ")[0].split("-");
   		var times = datestr.split(" ")[1].split(":");
   		return new Date(dates[0], dates[1], dates[2], times[0], times[1], times[2]);
   },
   //FOR MEAL PLANNING


   getDayNames: function() {   		
		return this.dayNames;
   },
   getWeekNumber: function() {
   		if (!this._initDatePrototype) {
			this._initDatePrototype = true;			
		}  		
		
		return (new Date()).getWeek();
   },
   getDayInWeek: function(date, dayIndex) {
	  var d = new Date(date);
	  var day = d.getDay(),
	      diff = d.getDate() - day + dayIndex; // adjust when day is sunday
	  return new Date(d.setDate(diff)); //Mon Feb 10 2014 11:24:23 GMT+0700 (SE Asia Standard Time)
	},
	preferredLanguage:function(){
		try{
			navigator.globalization.getPreferredLanguage(
			    function (language) {this.setLang(language.value);},
			    function () {alert('Error getting language\n');}
			);
		}catch(e){
			var language = navigator.language? navigator.language.split('-')[0] : navigator.userLanguage.split('-')[0];
			this.setLang(language);
		}
	}
});