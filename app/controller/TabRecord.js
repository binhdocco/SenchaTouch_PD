Ext.define('PatientDiary.controller.TabRecord', {
    extend: 'Ext.app.Controller',
	requires:[	
		'PatientDiary.view.tab.record.RecordAdd',
		'PatientDiary.view.tab.record.RecordOtherAdd'	
	],
    config: {
        refs: {		
			tabRecord: 'tab_record',
			tabRecordMenuButton: 'tab_record button[iconCls = "crestor-toolbar-icon-menu"]',
			//tabRecordAddButton: 'tab_record button[title = "toolbar_recordadd_button"]',
			recordAddDateField: 'tab_record_recordadd textfield[name = "date"]',
			recordBloodAdd: 'tab_record_recordadd',
			recordOtherAdd: 'tab_record_recordotheradd',
        },//end refs
        control: {
			tabRecord: {
				pop: function() {
					this.getTabRecordMenuButton().show(); 
					//this.getTabRecordAddButton().show();
				},
				push: function() {
					this.getTabRecordMenuButton().hide();
					//this.getTabRecordAddButton().hide();
				}
			},		
			'tab_record button[title = "bloodtestadd"]' : {
				tap: 'onRecordAddClicked'
			},
			'tab_record button[title = "othertestadd"]' : {
				tap: 'onRecordOtherAddClicked'
			},
			'tab_record_recordadd textfield[name = "date"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var dp = this.getDatePicker(new Date(), this.getRecordBloodAdd(), tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			'tab_record_recordadd button[title = "recordaddcancelbutton"]': {
				tap: function() {
					this.getTabRecord().pop(1);	
				}				
			},
			
			'tab_record_recordadd button[title = "recordaddsubmitbutton"]': {
				tap: 'onRecordAddSubmitClicked'		
			},
			//other add
			'tab_record_recordotheradd textfield[name = "date"]' : {
				focus: function(tf) {
					//console.log('xxxx');
					var dp = this.getDatePicker(new Date(), this.getRecordOtherAdd(), tf);
					Ext.Viewport.add(dp);
					dp.show();
				}
			},
			'tab_record_recordotheradd button[title = "recordotheraddcancelbutton"]': {
				tap: function() {
					this.getTabRecord().pop(1);	
				}				
			},
			
			'tab_record_recordotheradd button[title = "recordotheraddsubmitbutton"]': {
				tap: 'onRecordOtherAddSubmitClicked'		
			},
			//
			'tab_record list': {
				disclose: function(list, record, node, index, event, eOpts) {
					this.getApplication().fireEvent('show_popup', 
									'KNOWLEDGE OF<br/>' + record.data.title.toUpperCase(), 
									'<span>' + record.data.title + '</span> information');
					//console.log(record);
					//var store = list.getStore();
					//store.remove(record);				 
				   //this.getFoodMealPlanning().genRecipeWithStore(store, this._editMealData);				   
				}			
			},
		}
    },

	onRecordAddSubmitClicked: function() {
		//console.log('onRecordAddSubmitClicked');
		var me = this;
		me.getTabRecord().pop(1);
		var data = me._recordAddView.getRecordData();
		//console.log(data);	
		me.getTabRecord().deleteOldData(data.dateValue, function() {
			var saveAllCount = 0;
			Ext.Array.each(data.data, function(val, index) {
				var record = Ext.create('PatientDiary.model.Record', val);
				record.save({
					success: function() {
						saveAllCount ++;
						if (saveAllCount >=  data.data.length) {
							//console.log('save all ok');
							me.getTabRecord().refreshStore();
							PatientDiary.app.fireEvent('update_progresschart');
						}
							
					}
				});
			});
		}, 'blood');		
	},
	
	onRecordOtherAddSubmitClicked: function() {
		//console.log('onRecordAddSubmitClicked');
		var me = this;
		me.getTabRecord().pop(1);
		var data = me._recordOtherAddView.getRecordData();
		//console.log(data);	
		me.getTabRecord().deleteOldData(data.dateValue, function() {
			var saveAllCount = 0;
			Ext.Array.each(data.data, function(val, index) {
				var record = Ext.create('PatientDiary.model.Record', val);
				record.save({
					success: function() {
						saveAllCount ++;
						if (saveAllCount >=  data.data.length) {
							//console.log('save all ok');
							me.getTabRecord().refreshStore();
							PatientDiary.app.fireEvent('update_progresschart');
						}
							
					}
				});
			});
		}, 'other');		
	},
	
	onRecordAddClicked: function() {
		var addview = this.getRecordAddView();
		addview.resetView();		
		this.getTabRecord().push(addview);
	},
	
	onRecordOtherAddClicked: function() {
		var addview = this.getRecordOtherAddView();
		addview.resetView();		
		this.getTabRecord().push(addview);
	},
	
	onDatePickerDone: function(dp, date, opts) {
		//console.log('onDatePickerDone: ' + date.format('dd/mm/yyyy'));
		if (opts) {
			//opts.tf.setValue(date.format('dd/mm/yyyy'));
			opts.view.updateSelectedDate(date);
		}
	},
	
	getDatePicker: function(date, view, tf) {
		if (!this._datepicker) {
			this._datepicker = Ext.create('Ext.picker.Date', {
				value: date
			});
			this._datepicker.on('change', this.onDatePickerDone, this, {view: view, tf: tf});
		}
		return this._datepicker;
	},
	
	getRecordAddView: function() {
		if (!this._recordAddView) {
			this._recordAddView = Ext.create('PatientDiary.view.tab.record.RecordAdd');			
		}
		return this._recordAddView;
	},
	
	getRecordOtherAddView: function() {
		if (!this._recordOtherAddView) {
			this._recordOtherAddView = Ext.create('PatientDiary.view.tab.record.RecordOtherAdd');			
		}
		return this._recordOtherAddView;
	}
});