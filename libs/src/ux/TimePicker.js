/**
 * @author RWeneck
 * 
 * Adapted from https://github.com/ghuntley/Ext.ux.touch.DateTimePicker
 * 
 */
Ext.define('Ext.ux.TimePicker', {
	extend : 'Ext.Picker',
	xtype : 'timepicker',


	config : {
		/**
         * @cfg {String/Number} value The value to initialize the picker with
         * @accessor
         */
        value: "11:00 AM",
		/**
		 * @cfg {String} hourText
		 * The label to show for the hour column. Defaults to 'Hour'.
		 */
		hourText : 'Hour',
		/**
		 * @cfg {String} minuteText
		 * The label to show for the minute column. Defaults to 'Minute'.
		 */
		minuteText : 'Minute',
		/**
		 * @cfg {String} daynightText
		 * The label to show for the daynight column. Defaults to 'AM/PM'.
		 */
		daynightText : 'AM/PM',
		/**
		 * @cfg {Array} slotOrder
		 * An array of strings that specifies the order of the slots. Defaults to <tt>['hour', 'minute', 'daynight']</tt>.
		 */
		slotOrder : ['hour', 'minute', 'daynight']


	},
	// @private
	initialize: function() {
		var me = this;
		
		var hours = [], 
			minutes = [], 
			daynight = [], 
			i;
			
		for( i = 1; i <= 12; i++) {
			hours.push({
				text : i,
				value : i
			});
		}


		for( i = 0; i < 60; i += 5) {
			minutes.push({
				text : i < 10 ? '0' + i : i,
				value : i
			});
		}


		daynight.push({
			text : 'AM',
			value : 'AM'
		}, {
			text : 'PM',
			value : 'PM'
		});


		
		var newSlots = [];
		Ext.each(this.getSlotOrder(), function(item) {
			newSlots.push(this.createSlot(item, hours, minutes, daynight));
		}, this);
		
		this.setSlots(newSlots);
		this.callParent(arguments);
	},
	createSlot : function(name, hours, minutes, daynight) {
		switch (name) {
			case 'hour':
				return {
					name : 'hour',
					align : 'center',
					data : hours,
					title : this.getUseTitles() ? this.getHourText() : false,
					flex : 2
				};
			case 'minute':
				return {
					name : 'minute',
					align : 'center',
					data : minutes,
					title : this.getUseTitles() ? this.getMinuteText() : false,
					flex : 2
				};
			case 'daynight':
				return {
					name : 'daynight',
					align : 'center',
					data : daynight,
					title : this.getUseTitles() ? this.getDaynightText() : false,
					flex : 2
				};
		}
	},


	/**
	 * Takes a String or an object that represents time,
	 * The object should contain the keys; hour, minute, daynight
	 * or the string should be in the format of "11:00 AM"
	 */
	setValue : function(value, animated) {
		if(!value){
			value = {
				hour : 11,
				minute : 00,
				daynight : "AM"
			}
		}
		if(typeof value == "string"){
			var hour, minute, daynight;
			value = value.trim();
			hour = parseInt(value.substring(0, value.indexOf(":")));
			minute = parseInt(value.substring(value.indexOf(":")+1, value.indexOf(" ")));
			daynight = value.substring(value.indexOf(" ")+1);
			
			//minute = parseInt(Math.round(minute/5))*5;
			value = {
				hour : hour,
				minute : minute,
				daynight : daynight
			}			
		}
		this.callParent(arguments);
		
		for(key in value) {
			slot = this.child('[name=' + key + ']');
			if(slot) {
				if(key === 'hour' && value[key] > 12) {
					daynightVal = 'PM';
					value[key] -= 12;
				}
				slot.setValue(value[key], animated);
			}
		}
		return this;
	}
});