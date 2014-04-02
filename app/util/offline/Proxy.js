Ext.define('PatientDiary.util.offline.Proxy', {
    extend: 'Ext.data.proxy.Proxy',
    alias: 'proxy.sqlitestorage',
    alternateClassName: 'Ext.data.SqliteStorageProxy',

    
    constructor: function(config) {
        this.callParent([config]);

        //ensures that the reader has been instantiated properly
       this.setReader(this.reader);
        var me = this;
        //console.log(me);
        me.createTable();
        
    },
    //inherit docs
    create: function(operation, callback, scope) {
    	var me = this;
        var records = me.getTableFields(operation.getRecords()),
            length = records.length,
            id, record, i,
            model = this.getModel(),
            idProperty = model.getIdProperty();
            //console.log(idProperty,"model")
        operation.setStarted();
            
        for ( var i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record, me.config.dbConfig.tablename, idProperty);
        }

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },
    //inherit docs
    update: function(operation, callback, scope) {
    	//console.log("update");
        var me = this;
        var records = this.getTableFields(operation.getRecords()),
            length = records.length,
            record, id, i, tbl_Id = me.getModel().getIdProperty();
        //console.log(me.getModel().getClientIdProperty(),"primaryKey");
        operation.setStarted();
		for ( var i = 0; i < length; i++) {
            record = records[i];
            this.updateRecord(record, me.config.dbConfig.tablename,tbl_Id);
        }
        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },
    //inherit docs
    read: function(operation, callback, scope) {
    	var me = this,
        fields = [],
        values = [];
        
        Ext.iterate(operation.getParams(),function(k,v){
            fields.push(k + ' = ?');
            values.push(v);
        });
        
        var sql = operation.config.query || me.config.dbConfig.dbQuery || 'SELECT * FROM '+me.config.dbConfig.tablename+'';
        //sql  = "Select category_translation.category_id, category.title, category_translation.name, category.type, category_translation.locale  from category_translation, category where category_translation.category_id = category.cat_id";
        if(fields.length)
        {
            sql = sql + ' WHERE ' + fields.join(' AND ');
        }
        var onSucess, onError;
        onSucess = function(tx, results) {
            me.applyDataToModel(tx, results, operation, callback, scope);
        };

        onError = function(tx, err) {
            me.throwDbError(tx, err);
        };
		me.queryDB(me.getDb(), sql, onSucess, onError,values);
    },
    //inherit docs
    destroy: function(operation, callback, scope) {
    	var me = this;
        var records = (operation.records != undefined?operation.records:operation.getRecords()),
            length = records.length,
            i, tbl_Id = me.getModel().getIdProperty();
        
        for ( var i = 0; i < length; i++) {
            this.removeRecord(records[i].data[tbl_Id], me.config.dbConfig.tablename, tbl_Id, false);
        }

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },
    /**
     *@private
     * Get Database instance
     */
    getDb : function(){
        //return Ext.DbConnection.dbConn || this.config.dbConfig.dbConn;
        return this.config.dbConfig.dbConn.dbConn;
    },
    /**
     *@private
     *Creates table if not exists
     */
    createTable : function(){
    	var me = this;
        me.getDb().transaction(function(tx) {
            
            var onError = function(tx, err) {
                me.throwDbError(tx, err);
            };
            
            var onSucess = function(tx, results) {
               //console.log("success");
            };
        
            var createTableSchema = function() {
            //console.log(me.constructFields());
            var createsql = 'CREATE TABLE IF NOT EXISTS ' + me.config.dbConfig.tablename + '('+me.constructFields()+')';
            	//console.log(createsql);
                tx.executeSql(createsql,[],onSucess,onError);
            };
            
            var tablesql = 'SELECT * FROM '+ me.config.dbConfig.tablename+' LIMIT 1';
            //console.log(tablesql);
            tx.executeSql(tablesql,[], Ext.emptyFn, createTableSchema);
            
        });
        
    },
     /**
     * @private
     * Get reader data and set up fields accordingly
     * Used for table creation only
     * @return {String} fields separated by a comma
     */
    constructFields: function() {
        var me = this,
            m = me.getModel(),
            fields = m.prototype.fields.items,
            flatFields = [];
            Ext.each(fields, function(f) {
                if((f.config.isTableField || !Ext.isDefined(f.config.isTableField))){
                    var name = f.getName();
                    var type = f.config.type;
                    var fieldoption = (f.config.fieldOption)  ? f.config.fieldOption : '';
                    type = type.replace(/int/i, 'INTEGER')
                        .replace(/string/i,'TEXT')
                        .replace(/date/i, 'DATETIME');
                        
                    //console.log(name);
                    flatFields.push(name + ' ' + type+' '+fieldoption);
                    
                    /*if((f.getName() != m.getIdProperty()))
                    {
                        flatFields.push(name + ' ' + type+' '+fieldoption);
                    }
                    else
                    {
                		//flatFields.push(name + ' ' + type+' PRIMARY KEY ');    
                		flatFields.push(name + ' ' +' INTEGER PRIMARY KEY AUTOINCREMENT ');                 
                    }*/
                }
            });
        return flatFields.join(',');
    },
    /**
     * function to return records w.r.t to table fields. If model has fields
     * which is not table field name, it will break create and update functionalitites.This looks for field property "isTableField"
     */
    getTableFields : function(records){
       var  newrecords = [],removedField = [], length = records.length,
            m = this.getModel(), modelFields = m.prototype.fields.items;
            Ext.each(modelFields,function(item,index){
                if(item.config.isTableField == false || (item.getName() == m.getIdProperty())){
                    //console.log(item);
                    removedField.push(item.getName());
                }
            });
        
      
        for ( var i = 0; i < length; i++) {
            record = records[i];
            //console.log(removedField,"remove");
            Ext.each(removedField,function(item,index){
                //console.log(record.getData(),"record");
                //console.log(item,"item");
                delete record.getData()[item];
            });
            //console.log(record);
            newrecords.push(record);
        }
        //console.log(newrecords);
        return newrecords;
    },
     /**
     * execute sql statements
     * @param {Object} dbConn Database connection Value
     * @param {String} sql Sql Statement
     * @param {Function} successcallback  success callback for sql execution
     * @param {Function} errorcallback  error callback for sql execution
     * @param {Array}  params  sql statement parameters
     * @param {Function} callback  additional callback
     */
    queryDB: function(dbConn, sql, successcallback, errorcallback, params, callback) {
    	var me = this;
        dbConn.transaction(function(tx) {
            if (typeof callback == 'function') {
                callback.call(scope || me, results, me);
            }
            if(!params) params = [];
            tx.executeSql(
            sql, (params ? params : []), successcallback, errorcallback);
        });
    },
     /**
     * @private
     * Created array of objects, each representing field=>value pair.
     * @param {Object} tx Transaction
     * @param {Object} rs Response
     * @return {Array} Returns parsed data
     */
    parseData: function(tx, rs) {
        
        var rows = rs.rows,
            data = [],
            i = 0;
        for (; i < rows.length; i++) {
            data.push(rows.item(i));
        }
        return data;
    },
    applyData: function(data, operation, callback, scope) {
        var me = this;
        /*operation.resultSet = new Ext.data.ResultSet({
            records: data,
            total: data.length,
            loaded: true
        });*/
        operation.setSuccessful();
        operation.setCompleted();
        operation.setResultSet(Ext.create('Ext.data.ResultSet', {
            records: data,
            total  : data.length,
            loaded : true
        }));
        //console.log(operation);
        //finish with callback
        operation.setRecords(data);
        if (typeof callback == "function") {
            callback.call(scope || me, operation);
        }
    },
    applyDataToModel: function(tx, results, operation, callback, scope) {
        var me = this,
        Model = me.getModel(),
        fields  = Model.getFields().items,
    	primarykey = Model.getIdProperty();
        var records = me.parseData(tx, results);
        var storedatas = [];
        if (results.rows && records.length) {
            for (var i = 0; i < results.rows.length; i++) {
            	var data = new Model(records[i],records[i][primarykey]);
            	storedatas.push(data);
            }
            operation.setSuccessful();
        }
        me.applyData(storedatas, operation, callback, scope);
    },
    
    /**
     * Output Query Error
     * @param {Object} tx Transaction
     * @param {Object} rs Response
     */
    throwDbError: function(tx, err) {
        //console.log(this.type + "----" + err.message);
    },
    /**
     * Saves the given record in the Proxy.
     * @param {Ext.data.Model} record The model instance
     */
    setRecord: function(record, tablename, primarykey) {
        //console.log(primarykey);
        //console.log(record.internalId,"recprd1");
        //console.log(record.getData().id,"recprd2");
        var me = this,
            rawData = record.getData(),
            fields = [],
            values = [],
            placeholders = [],

            onSuccess = function(tx, rs) {
                //console.log(rs,"balh");
                var returnrecord = record,
                insertId = rs.insertId;
                returnrecord.data[primarykey] = insertId;
        		returnrecord.internalId = insertId;
        		returnrecord.commit(true);
        
            },

            onError = function(tx, err) {
                me.throwDbError(tx, err);
            };
            //console.log(rawData,"rawdata");
            //console.log(rawData.id,"id val");
        //extract data to be inserted
        for (var i in rawData) {
            //console.log(rawData[i],i);
            if (rawData[i]) { 
                //console.log(rawData[i],i);
                //if(i != primarykey){
                fields.push(i);
                values.push(rawData[i]);
                placeholders.push('?');
                //}
            }
        }
        Ext.iterate(rawData,function(a,b){
            //console.log(a,b)    
        }); 
        //console.log(fields,"fields");
        //console.log(values,"values");
        var sql = 'INSERT INTO ' + tablename + '(' + fields.join(',') + ') VALUES (' + placeholders.join(',') + ')';
        //console.log(sql,"sql");
        me.queryDB(me.getDb(), sql, onSuccess, onError, values);

        return true;
    },
    
    /**
     * Updates the given record.
     * @param {Ext.data.Model} record The model instance
     */
    updateRecord: function(record, tablename, primarykey) {
        var me = this,
            id = record.get(primarykey),
            key = primarykey,
            modifiedData = record.modified,
            newData = record.data,
            pairs = [],
            values = [],
            onSuccess = function(tx, rs) {
                //add new record if id doesn't exist
                if (rs.rowsAffected == 0) {
                    me.setRecord(record, tablename, primarykey);
                }
                else
                {
                    record.commit(true);
                }
            },
            onError = function(tx, err) {
                me.throwDbError(tx, err);
            };

            // sick hack got work around something clobbering the primary key
            if(!id)
            {
                id = record.getId();
                if(!id) 
                {
                    record.setId(record.internalId);
                    id = record.internalId; 
                }
            }
            
        for (var i in newData) {
            if (i != primarykey) {
                pairs.push(i + ' = ?');
                values.push(newData[i]);
            }
        }

        values.push(id);
        var sql = 'UPDATE ' + tablename + ' SET ' + pairs.join(',') + ' WHERE ' + key + ' = ?';
        me.queryDB(me.getDb(), sql, onSuccess, onError, values);
        return true;
    },
    /**
     * @private
     * Physically removes a given record from the object store. 
     * @param {Mixed} id The id of the record to remove
     */
    removeRecord: function(id, tablename, primarykey, callback, opts) { //opts: [ ['key', 'value]]
        var me = this,
            values = [],
            onSuccess = function(tx, rs) {
              if (callback) callback();
            },
            onError = function(tx, err) {
                me.throwDbError(tx, err);
            };
        var sql = 'DELETE FROM ' + tablename + ' WHERE ' + primarykey + ' = ?';
        values.push(id);
		
		if (opts) {
			Ext.Array.each(opts, function(value, index){
				sql += ' AND ' + value[0] + ' = ?';
				 values.push(value[1]);
			});
		}
        me.queryDB(me.getDb(), sql, onSuccess, onError, values);
        return true;
    },
    
    /**
     * Destroys all records stored in the proxy 
     */
    truncate: function(tablename) {
        var me = this;
        var sql = 'DELETE FROM ' + me.config.dbConfig.tablename;  
        me.queryDB(me.getDb(), sql, function(){}, function(){});
        return true;
    },
    alterTable: function(tablename, fieldname, type){
    	var me = this;
        var sql = 'ALTER TABLE ' + tablename + " ADD COLUMN " + fieldname + " " + type;  
        me.queryDB(me.getDb(), sql, function(){}, function(){});
        return true;
    }
});
