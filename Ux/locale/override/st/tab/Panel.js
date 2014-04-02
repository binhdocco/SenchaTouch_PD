Ext.define('Ux.locale.override.st.tab.Panel', {
    override: 'Ext.tab.Panel',

    requires: [
         'Ux.locale.override.st.Component'
    ],

    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            title       = locales.title,
            manager     = me.locale,
            defaultText = '';
        if (title) {
            if (Ext.isObject(title)) {
                defaultText = title.defaultText;
                title       = title.key;
            }
			title = manager.get(title, defaultText);
            if (Ext.isString(title)) {
            	me.title = title;
            }
        }

        this.callParent(arguments);
    }
});