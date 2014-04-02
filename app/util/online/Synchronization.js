Ext.define('PatientDiary.util.online.Synchronization',{
	extend:'Ext.util.Observable',
	requires:['Ext.Ajax'],
	constructor: function(config) {
		config = config || {};
        Ext.apply(this, config);
        var me = this;
        me.callParent([this]);
        me.createDirectories()
        .done(function(){
        	me.getSystemDate()
			.done(function(value){
				console.log("value:", value);
				if(value != "no_update"){
					if(PatientDiary.util.CommonUtil.isOnline()){
						console.log("synchonizing...");
						Ext.Viewport.setMasked({
			                xtype     : 'loadmask',
			                indicator : true,
			                message   : 'Synchonizing...'
			             });
						me.syncInfo(value)
						.then(me.syncAchievement(value)
						.then(me.syncLevel(value)
						.then(me.syncCategory(value)
						.then(function(value){
							console.log("Sync completed");
							if(Ext.Viewport.getMasked())
   							Ext.Viewport.setMasked(false);
							PatientDiary.util.CommonUtil.offline.reloadData();
							//Ext.Msg.alert('Sync', 'Sync completed!');
							
						}, function(){
							me.failHandler();
						})))
						);
					}else{
						Ext.Msg.alert('No Connection', "Couldn't connect to server.");
					}
				}else{
					console.log("No updated data");
				}
			})
			.fail(function(){
				console.log("sync failed");
				me.failHandler();
			});
        });
		return me;
   },
   failHandler:function(){
   		if(Ext.Viewport.getMasked())
   		Ext.Viewport.setMasked(false);
		Ext.Msg.alert('Error', 'There was an error retrieving the data.');
   },
   createDirectories:function(){
   		console.log("createDirectories");
   		var dfd = Ext.create ('Ext.ux.Deferred');
   		if(PatientDiary.util.CommonUtil.useBackend){
	   		var dirs = ["food","exercise", "achievement","category"];
	   		Ext.Array.each(dirs,function(item,index){
	   			PatientDiary.util.CommonUtil.createDirectory(item,function(){
	   				if(index == dirs.length-1){
	   					dfd.resolve("directories created");
	   				}
	   			},function(){
	   				dfd.resolve("directories created");
	   			});
	   		});
   		}else{
   			setTimeout(function(){
   				dfd.resolve("directories created");
   			},100);
   			
   		}
   		return dfd;
   },
   getSystemDate:function(){
   		console.log("getSystemDate");
   		var dfd = Ext.create ('Ext.ux.Deferred');
   		var storeSystem = Ext.getStore('Systems');
   		var task = setInterval (function () {
            if(storeSystem.isLoaded()){
            	var localDateTime = "";
            	if(storeSystem.getCount()){
            		localDateTime = storeSystem.getData().items[storeSystem.getCount()-1].getData().value;
            	}
            	var url = PatientDiary.util.CommonUtil.buildApi('system_date', undefined, localDateTime);
            	Ext.Ajax.request({
		   			method : 'GET',
		   			url: url,
		   			timeout:120000,
		         	success: function(result) {
		         		var date_time = Ext.decode(result.responseText);
		         		console.log("checkSystemDate:", date_time,localDateTime);
		         		
		         		try{
			         		if(storeSystem.getCount() && storeSystem.findRecord('name','system_date')){
			         			storeSystem.remove(storeSystem.findRecord('name','system_date'));
			         			storeSystem.sync();
			         		}
			         		storeSystem.add({name:'system_date',value:date_time});
			         		storeSystem.sync();
			         		if(localDateTime != ""){
			         			var bool = false;
			         			var local = PatientDiary.util.CommonUtil.getDateTime(localDateTime).getTime();
			         			var server =PatientDiary.util.CommonUtil.getDateTime(date_time).getTime();
			         			if( local != server){
			         				bool = true;	
			         			}
			         			if(bool){
				         			dfd.resolve(localDateTime);
				         		}else{
				         			dfd.resolve("no_update");
				         		}
			         		}else{
			         			dfd.resolve(localDateTime);
			         		}
			         		
		         		}catch(e){
		         			console.log(e.message);
		         		}
		         	},
		         	failure: function(e) {
		         		dfd.reject(localDateTime);
		            }
				});
            	clearInterval (task);
            }
        }, 100);
		return dfd;
   },
  syncCategory:function(datetime){
  		var dfd = Ext.create ('Ext.ux.Deferred');
   		var url = PatientDiary.util.CommonUtil.buildApi('category',PatientDiary.util.CommonUtil.getLang(),datetime);
   		var storeCat = Ext.getStore('Categories'),storeCatTran = Ext.getStore('Category_Translations'),
   		storeEffort = Ext.getStore('Efforts'),storeEffTran = Ext.getStore('Effort_Translations'),
   		storeEffItem = Ext.getStore('Effort_Items'),storeItem = Ext.getStore('Items'),storeItemTran = Ext.getStore('Item_Translations');
   		var me = this;
   		var task = setInterval (function () {
  			 if(storeCat.isLoaded() && storeCatTran.isLoaded()
  			 && storeEffort.isLoaded()&& storeEffTran.isLoaded()
  			 && storeEffItem.isLoaded()&& storeItem.isLoaded() && storeItemTran.isLoaded()){
  			 	Ext.Ajax.request({
		   			method : 'GET',
		   			url: url,
		   			timeout:120000,
		         	success: function(result) {
		               var data = Ext.decode(result.responseText), downloads = [];
		               console.log("syncCategory:" + data.length);
		               if(data.length){
		               	try{
			               	   Ext.Array.each(data,function(item,index){
				               		//category
				               		var imagePath = PatientDiary.util.CommonUtil.fullPath +"/category";
				               		if(PatientDiary.util.CommonUtil.useBackend && item.fileName != null && item.fileName != ""){
					               		var downloadUrl = PatientDiary.util.CommonUtil.buildDownloadUrl("category",item.fileName);
			               				var targetUrl = imagePath + "/" + item.fileName;
			               				downloads.push({download_url:downloadUrl, target_url:targetUrl});
		               				}else{
		               					imagePath =  PatientDiary.util.CommonUtil.imagePath+ "/category";
		               				}
				       				var catItem = {
				       					category_id:item.id,
				               			name:item.name,
				               			title:item.title,
				               			type:item.type,
				               			created_at:item.createdAt,
				               			updated_at:item.updatedAt,
				               			image_path:imagePath.replace(/ /gi, "%20"),
				               			file_name:item.fileName
				       				};
				       				var catRecExist = storeCat.findRecord('category_id',item.id,0), catRec = null;
				       				if(storeCat.getCount() && catRecExist){
				       					catItem.id = catRecExist.data.id;
				       					catRecExist.data = catItem;
				       					catRec = catRecExist;
				       				}else{
				       					catRec = Ext.create("PatientDiary.model.Category",catItem);
				       				}
				       				catRec.save();
				       				
				       				//category translations		
				               		var catTranslations = item.translations;
				               		Ext.Object.each(catTranslations, function(key, items) {
								    	if(Ext.isObject(items)){
							    			var catTran = {
					               					category_id: catItem.category_id,
					               					name:items.name,
					               					locale:items.locale, 
					               					cat_tran_id:items.id
				               					};
				               				var catTransRecExist = storeCatTran.findRecord('category_id',items.id,0), catTransRec = null;
						       				if(storeCatTran.getCount() && catTransRecExist){
						       					catTran.id = catTransRecExist.data.id;
						       					catTransRecExist.data = catTran;
						       					catTransRec = catTransRecExist;
						       				}else{
						       					catTransRec = Ext.create("PatientDiary.model.Category_Translation",catTran);
						       				}
						       				catTransRec.save();
				               			}
								    });
								    //efforts
				               		var catEfforts = item.efforts;
				               		if(catEfforts.length){
				               			Ext.Array.each(catEfforts,function(effort,index){
				               				var imagePath = PatientDiary.util.CommonUtil.fullPath +"/"+ item.type;
				               				if(PatientDiary.util.CommonUtil.useBackend && effort.fileName != null && effort.fileName != ""){
					               				var downloadUrl = PatientDiary.util.CommonUtil.buildDownloadUrl("effort", effort.fileName);
					               				var targetUrl = imagePath + "/" + effort.fileName;
					               				downloads.push({download_url:downloadUrl, target_url:targetUrl});
				               				}else{
				               					imagePath = PatientDiary.util.CommonUtil.imagePath +"/"+ item.type;
				               				}
				               				var catEff = {
				               					category_id: catItem.category_id,
				               					file_name: (effort.fileName != null?effort.fileName.replace(/ /gi, "%20"):'no-recipe-image.jpg'),
				               					effort_id:effort.id,
				               					min_level:effort.min_level,
				               					title: effort.title,
				               					created_at:effort.createdAt,
				               					updated_at:effort.updatedAt,
				               					image_path:imagePath.replace(/ /gi, "%20"),
				               					status: PatientDiary.util.CommonUtil.status.not_tried
					
				               				};
				               				var catEffRecExist = storeEffort.findRecord('effort_id', effort.id,0), catEffRec = null;
				               				if(storeEffort.getCount() && catEffRecExist){
				               					catEff.id = catEffRecExist.data.id;
				               					catEffRecExist.data = catEff;
				               					catEffRec = catEffRecExist;
				               				}else{
				               					catEffRec = Ext.create("PatientDiary.model.Effort",catEff);
				               				}
				               				catEffRec.save();
				               				
				               				//effort translations
				               				var effTrans = effort.translations;
				               				Ext.Object.each(effTrans, function(key, effort_items) {
				               					if(Ext.isObject(effort_items)){
				               						var effortTran = {
				               							effort_id: catEff.effort_id,
				               							name: effort_items.name,
				               							description:effort_items.description,
				               							step: effort_items.step,
				               							benefit: effort_items.benefit,
				               							eff_tran_id: effort_items.id,
				               							locale: effort_items.locale
				               						};
				               						var catEffTransRecExist = storeEffTran.findRecord('eff_tran_id', effort_items.id,0), catEffTransRec = null;
				               						if(storeEffTran.getCount() && catEffTransRecExist){
				               							effortTran.id = catEffTransRecExist.data.id;
				               							catEffTransRecExist.data = effortTran;
				               							catEffTransRec = catEffTransRecExist;
				               						}else{
				               							catEffTransRec = Ext.create("PatientDiary.model.Effort_Translation",effortTran);
				               						}
				               						catEffTransRec.save();
				               						
				               					}
				               				});	
				               				//effort items
				               				var effItems = effort.effort_item;
				               				Ext.Array.each(effItems,function(item,index){
				               					var effItem = {
				               						effort_id: catEff.effort_id,
				               						item_id: item.item_id,
				               						quantity: Number(item.quantity)
				               					};
				               					var catEffItemRec = Ext.create("PatientDiary.model.Effort_Item",effItem);
				               					catEffItemRec.save();
				               				});
				               			});
				               		}
				               		//items
				               		var catItems = item.items;
				               		if(catItems.length){
				               			Ext.Array.each(catItems,function(item,index){
				               				//item
				               				var itemObj = {
				               					category_id: catItem.category_id,
				               					item_id: item.id,
				               					value:item.value,
				               					createdAt: item.createdAt,
				               					updatedAt:item.updatedAt,
				               					total: 0
				               				};
				               				var catItemRecExist = storeItem.findRecord('item_id', item.id,0), catItemRec = null;
				               				if(storeItem.getCount() && catItemRecExist){
				               					itemObj.id = catItemRecExist.data.id;
				               					catItemRecExist.data = itemObj;
				               					catItemRec = catItemRecExist;
				               				}else{
				               					catItemRec = Ext.create("PatientDiary.model.Item",itemObj);
				               				}
				               				catItemRec.save();
				               				//item translations
				               				var itemTranlations = item.translations;
				               				Ext.Object.each(itemTranlations, function(key, items) {
				               					if(Ext.isObject(items)){
				               						var itemTran ={
				               							item_id: itemObj.item_id,
				               							locale: items.locale,
				               							name: items.name,
				               							unit: items.unit,
				               							item_tran_id: items.id,
				               							description:items.description
				               						};
				               						var catItemTransRecExist = storeItemTran.findRecord('item_tran_id', items.id,0),catItemTransRec = null; 
				               						if(storeItemTran.getCount() && catItemTransRecExist){
				               							itemTran.id = catItemTransRecExist.data.id;
				               							catItemTransRecExist.data = itemTran;
				               							catItemTransRec = catItemTransRecExist;
				               						}else{
				               							catItemTransRec = Ext.create("PatientDiary.model.Item_Translation",itemTran);
				               						}
				               						catItemTransRec.save();
				               					}
				               				});
				               			});
				               		}
				       			});
				       			if(PatientDiary.util.CommonUtil.useBackend){
					       			if(PatientDiary.util.CommonUtil.runningDevice()){
					       				if(downloads.length){
						               		me.downloadFiles(downloads)
							               	.then(function(value){
							               		console.log("images downloaded...");
							               		dfd.resolve(datetime);
							               	});
						               }else{
						               		dfd.resolve(datetime);
						               }
					               }else{
					               		dfd.resolve(datetime);
					               }
				              }else{
				              	dfd.resolve(datetime);
				              }
				               
			             }catch(e){
			             	console.log(e.message);
			             }
			           }else{
			           		dfd.resolve(datetime);
			           } 
		            },
		            failure: function() {
		               dfd.reject(datetime);
		            }
		     	});
	     		clearInterval (task);
	     	}
		},100);     
   		return dfd;
  },
  syncAchievement: function(datetime){
  		var dfd = Ext.create ('Ext.ux.Deferred');
  		var url = PatientDiary.util.CommonUtil.buildApi('achievement',PatientDiary.util.CommonUtil.getLang(),datetime);
   		var achievementStore = Ext.getStore("Achievements"), achieveTranslationStore = Ext.getStore('Achievement_Translations');
   		var downloads = [], me = this;
   		var task = setInterval (function () {
            if(achievementStore.isLoaded() && achieveTranslationStore.isLoaded()){
            	Ext.Ajax.request({
		   			method : 'GET',
		   			url: url,
		   			timeout:120000,
		         	success: function(result) {
		         		var data = Ext.decode(result.responseText);
		         		var achievements = [], achieveTrans = [];
		         		if(data.length){
		         			try{
				         		Ext.Array.each(data,function(item,index){
				         			var translations = item.translations;
				         			Ext.Object.each(translations, function(key, items){
		           						if(Ext.isObject(items)){
		           							achieveTranItem = {
			           							achievement_id: item.id,
			           							name: items.name,
			           							achieve_tran_id:items.id,
			           							locale: items.locale
			           						};
			           						var achieveTransRecExist = achieveTranslationStore.findRecord('achieve_tran_id', items.id,0),achieveTransRec = null;
			           						if(achieveTranslationStore.getCount() && achieveTransRecExist){
			           							achieveTranItem.id = achieveTransRecExist.data.id;
			           							achieveTransRecExist.data = achieveTranItem;
		               							achieveTransRec = achieveTransRecExist;
		               						}else{
		               							achieveTransRec = Ext.create('PatientDiary.model.Achievement_Translation',achieveTranItem);
		               						}
		               						achieveTransRec.save();
		           						}
			               			});
			               			var imagePath = PatientDiary.util.CommonUtil.fullPath +"/achievement";
			               			if(PatientDiary.util.CommonUtil.useBackend && item.fileName != null && item.fileName != ""){
			               				var downloadUrl = PatientDiary.util.CommonUtil.buildDownloadUrl("achievement",item.fileName);
			               				var targetUrl = imagePath + "/" + item.fileName;
			               				
			               				downloads.push({download_url:downloadUrl, target_url:targetUrl});
		               				}else{
		               					imagePath =  PatientDiary.util.CommonUtil.imagePath +"/achievement";
		               				}
			               			achievementItem = {
										achievement_id: item.id,
										title: item.title,
										food: item.food,
										exercise: item.exercise,
										level_id: item.level_id,
										file_name: item.fileName,
										created_at: item.createdAt,
										updated_at: item.updatedAt,
										duration: item.duration,
										image_path:(imagePath != null?imagePath.replace(/ /gi, "%20"):'resources/images/progress/'),
				               					
									};
									var achieveRecExist = achievementStore.findRecord('achievement_id', item.id,0),achieveRec = null;
									if(achievementStore.getCount() && achieveRecExist){
										achievementItem.id = achieveRecExist.data.id;
										achieveRecExist.data = achievementItem;
										achieveRec = achieveRecExist;
               						}else{
               							achieveRec = Ext.create('PatientDiary.model.Achievement',achievementItem);
               						}
               						achieveRec.save();
				         		});
			         		}catch(e){
			         			console.log("sync Achievement:", e.message);
			         		}
		         		}
		         		if(PatientDiary.util.CommonUtil.useBackend){
							if(PatientDiary.util.CommonUtil.runningDevice()){
								if(downloads.length){
				               		me.downloadFiles(downloads)
					               	.then(function(value){
					               		console.log("images downloaded...");
					               		dfd.resolve(datetime);
					               	});
				               }else{
				               	dfd.resolve(datetime);
				               }
			               }else{
			               		dfd.resolve(datetime);
			               }
		              }else{
		              		dfd.resolve(datetime);
		              }
		         	},
		         	failure: function() {
		         		dfd.reject(datetime);
		            }
				});
            	clearInterval (task);
            }
        }, 100);
        
   		return dfd;	
  },
  syncLevel: function(datetime){
  		var dfd = Ext.create ('Ext.ux.Deferred');
  		var url = PatientDiary.util.CommonUtil.buildApi('level',PatientDiary.util.CommonUtil.getLang(),datetime);
   		var levelStore = Ext.getStore("Levels"), levelTranStore = Ext.getStore('Level_Translations');
   		var task = setInterval (function () {
            if(levelStore.isLoaded() && levelTranStore.isLoaded()){
            	Ext.Ajax.request({
		   			method : 'GET',
		   			url: url,
		         	success: function(result) {
		         		var data = Ext.decode(result.responseText);
		         		var levels = [], levelTrans = [];
		         		if(data.length){
		         			try{
				         		Ext.Array.each(data,function(item,index){
				         			var translations = item.translations;
				         			Ext.Object.each(translations, function(key, items){
				         				if(Ext.isObject(items)){
			           						levelTransItem = {
			           							level_id: item.id,
			           							name: items.name,
			           							content: items.content,
			           							level_tran_id:items.id,
			           							locale: items.locale
			           						};
			           						var levelTransRecExist = levelTranStore.findRecord('level_tran_id', item.id,0), levelTransRec = null;
			           						if(levelTranStore.getCount() && levelTransRecExist){
			           							levelTransItem.id = levelTransRecExist.data.id;
			           							levelTransRecExist.data = levelTransItem;
		               							levelTransRec = levelTransRecExist;
		               						}else{
		               							levelTransRec = Ext.create('PatientDiary.model.Level_Translation',levelTransItem);
		               						}
		               						levelTransRec.save();
		           						}
			               			});
			               			
									levelItem ={
										level_id: item.id,
										title: item.title,
										name:item.name,
										created_at: item.createdAt,
										updated_at: item.updatedAt,
										food:item.food,
										exercise:item.exercise,
										number: item.number
									};
									var levelRecExist = levelTranStore.findRecord('level_id', item.id,0), levelRec = null;
	           						if(levelStore.getCount() && levelRecExist){
	           							levelItem.id = levelRecExist.data.id;
	           							levelRecExist.data = levelItem;
               							levelRec = levelRecExist;
               						}else{
               							levelRec = Ext.create('PatientDiary.model.Level',levelItem);
               						}
               						levelRec.save();
				         		});
			         		}catch(e){
			         			console.log("sync Level:", e.message);
			         		}
		         		}
		         		dfd.resolve(datetime);
		         	},
		         	failure: function() {
		         		dfd.reject(datetime);
		            }
				});
            	clearInterval (task);
            }
        }, 100);
   		return dfd;	
  },
  syncInfo: function(datetime){
  		var dfd = Ext.create ('Ext.ux.Deferred');
  		var url = PatientDiary.util.CommonUtil.buildApi('info',PatientDiary.util.CommonUtil.getLang(),datetime);
   		var infoStore = Ext.getStore("Infos"), infoTranStore = Ext.getStore('Info_Translations');
   		var task = setInterval (function () {
            if(infoStore.isLoaded() && infoTranStore.isLoaded()){
            	Ext.Ajax.request({
		   			method : 'GET',
		   			url: url,
		         	success: function(result) {
		         		var data = Ext.decode(result.responseText);
		         		var infos = [], infoTrans = [];
		         		if(data.length){
		         			try{
				         		Ext.Array.each(data,function(item,index){
				         			var translations = item.translations;
				         			Ext.Object.each(translations, function(key, items){
		           						if(Ext.isObject(items)){
		           							infoTransItem ={
			           							info_id: item.id,
			           							name: items.name,
			           							content: items.content,
			           							info_tran_id:items.id,
			           							locale: items.locale
			           						};
			           						var infoTransRecExist = infoTranStore.findRecord('info_tran_id', items.id,0), infoTransRec = null;
			           						if(infoTranStore.getCount() && infoTransRecExist){
			           							infoTransItem.id = infoTransRecExist.data .id;
			           							infoTransRecExist.data = infoTransItem;
		               							infoTransRec = infoTransRecExist;
		               						}else{
		               							infoTransRec = Ext.create('PatientDiary.model.Info_Translation',infoTransItem);
		               						}
		               						infoTransRec.save();
		           						}
			               			});
			               			infosItem = {
										info_id: item.id,
										title: item.title,
										type:item.type,
										created_at: item.createdAt,
										updated_at: item.updatedAt
									};
									var infoRecExist = infoTranStore.findRecord('info_id', item.id,0), infoRec = null;
	           						if(infoStore.getCount() && infoRecExist){
	           							infosItem.id = infoRecExist.data.id;
	           							infoRecExist.data = infosItem;
	           							infoRec = infoRecExist;
               						}else{
               							infoRec = Ext.create('PatientDiary.model.Info',infosItem);
               						}
               						infoRec.save();
				         		});
				         		
			         		}catch(e){
			         			console.log("sync Info:", e.message);
			         		}
		         		}
		         		dfd.resolve(datetime);
		         	},
		         	failure: function() {
		         		dfd.reject(datetime);
		            }
				});
            	clearInterval (task);
            }
        }, 100);
   		return dfd;	
  },
  downloadFiles: function(list){
  	var dfd = Ext.create ('Ext.ux.Deferred');
  	var count = 0;
  	Ext.Array.each(list, function(item, index){
  		PatientDiary.util.CommonUtil.downloadFile(item.download_url, item.target_url,function(){
  			count ++;
  			if(count == list.length){
  				dfd.resolve("done"); 
  			}
  		},function(){
  			count ++;
  			if(count == list.length){
  				dfd.resolve("done"); 
  			}	
  		});
  	});
  	return dfd;
  }
});
