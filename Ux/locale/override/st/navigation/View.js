Ext.define('Ux.locale.override.st.navigation.View', {
    override: 'Ext.navigation.View',

    requires: [
        'Ux.locale.Manager'
    ],

    enableLocale: false,
    locale: null,
    locales: null,

    constructor : function(config) {
        var me = this;

        config = Ux.locale.Manager.isLocalable(me, config);

        me.callParent([config]);

        if (me.enableLocale) {
            me.setLocale(Ux.locale.Manager.getLanguage());
        }
    },
	setLocale : function(locale) {
		var me                    = this,
         	locales               = me.locales || me.getInitialConfig().locales,
            defaultBackButtonText = locales.defaultBackButtonText,
            navigationBar         =  me.getNavigationBar();
            defaultText           = '',
             tab         = me.getTab(),
            title       		  = locales.title,
            manager               = me.locale;
            
		navigationBar.onViewAdd  = function(view,item){
			var me              = navigationBar,
            backButtonStack = me.backButtonStack,
            hasPrevious, title;
			me.endAnimation();
			
	        if (item.enableLocale) {
	            title = (item.getTitle) ? item.getTitle() : item.title || item.config.title;
	        }
	        else {
	            title = (item.getTitle) ? item.getTitle() : item.config.title;
	        }
	        title = manager.get(title, title);
	        backButtonStack.push(title || '&nbsp;');
	        hasPrevious = backButtonStack.length > 1;
			me.doChangeView(view, hasPrevious, false);
	   };
		me.on("back",function(){
			title = manager.get(locales.title, defaultText);
			navigationBar.setTitle(title);
		});
		if (defaultBackButtonText) {
            if (Ext.isObject(defaultBackButtonText)) {
                defaultText = defaultBackButtonText.defaultText;
                defaultBackButtonText = defaultBackButtonText.key;
            }

            defaultBackButtonText = manager.get(defaultBackButtonText, defaultText);
			
            if (Ext.isString(defaultBackButtonText)) {
                me.setDefaultBackButtonText(defaultBackButtonText);
            }
        }
       	if (title) {
        	if (Ext.isObject(title)) {
                defaultText = title.defaultText;
                title       = title.key;
            }

            title = manager.get(title, defaultText);
			if (Ext.isString(title)) {
				if(tab){
               	 	tab.setTitle(title);
			 	}
                navigationBar.setTitle(title);
            }
            
        }
        
        
    },
     getTab : function () {
        var me = this,
            tabpanel, tabBar, items, index;

        if (me.tab) {
            return me.tab;
        }

        /**
         * As of 2.0.0 PR3, there is no method or property to get the associated Ext.tab.Tab instance
         */

        tabpanel = me.up('tabpanel');

        if (!tabpanel) {
            return;
        }

        tabBar = tabpanel.getTabBar();
        items = tabpanel.getInnerItems();
        index = Ext.Array.indexOf(items, me);

        return tabBar.getComponent(index);
    }
});