Ext.define('Ux.locale.override.st.SegmentedButton', {
    override : 'Ext.SegmentedButton',

    requires : [
        'Ux.locale.Manager'
    ],

    enableLocale : false,
    locale       : null,
    locales      : null,

    constructor : function(config) {
        var me = this;

        config = Ux.locale.Manager.isLocalable(me, config);

        me.callParent([config]);
		/*
        if (me.enableLocale) {
            me.setLocale(Ux.locale.Manager.getLanguage());
        }*/
    },

    setLocale : function(locale) {
		var items = this.items.items;
		Ext.Array.each(items, function(item, index){
			item.setLocale(locale);
		});		
    }
});
