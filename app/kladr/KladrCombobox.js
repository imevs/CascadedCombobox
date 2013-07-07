Ext.define('IMEVS.kladr.KladrCombobox', {
    extend                 : 'IMEVS.ux.CascadedCombobox',
    fetchValuesFromRequests: true,
    saveToCookie           : true,
    autoDiscoverValues     : true,
    displayField           : 'name',
    valueField             : 'id',
    renderTo               : Ext.getBody(),
    dependencyField        : function () {
        var value = this.data['parents'] && this.data['parents'][0] && this.data['parents'][0]['id'];
        if (!value) {
            //debugger;
        }
        return value;
    },
    initComponent          : function () {
        var me = this;

        window.console && console.log('KladrCombobox::initComponent');
        var store = me.store = Ext.create(me.storeParams);
        me.callParent();

        store.on('beforeload', function () {
            window.console && console.log('KladrCombobox::beforeload');

            var proxy = store.getProxy();
            proxy.extraParams = Ext.clone(proxy.defaultExtraParams);
            store.kladrElementType && proxy.setExtraParam('contentType', store.kladrElementType);

            if (me.dependsOn) {
                var depStore = me.dependsOn.getStore();
                var depValue = me.dependsOn.getValue();
                depValue && proxy.setExtraParam(depStore.kladrElementType + 'Id', depValue);
            }
        });
    }
});