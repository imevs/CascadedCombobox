Ext.require('Ext.util.Cookies');

Ext.define('IMEVS.ux.SaveToCookie', {

    storage: null,

    getStorage: function() {
        return this.storage ? this.storage : (this.storage = Ext.util.Cookies);
    },

    setFilterValue: function(name, value) {
        this.getStorage().set(name.toLowerCase(), value);
    },

    onSelect: function(element, records) {
        this.setFilterValue(element.fieldLabel, records[0].get('name'));
    },

    getStorageValue: function (opts) {
        return this.getStorage().get(opts.element.fieldLabel.toLowerCase());
    },

    onLoad: function(store, records, successfull, opts) {
        var value = this.getStorageValue(opts);
        var record = store.findRecord('name', value);
        opts.element.select(record);
    },

    init: function(cmb) {
        if (!cmb.saveToCookie) {
            return;
        }
        cmb.on('select', this.onSelect, this);

        var isLocalMode = cmb.queryMode === 'local';
        if (isLocalMode) {
            this.onLoad(cmb.getStore(), [], true, { element: cmb });
        } else {
            cmb.getStore().on('load', this.onLoad, this, { single: true, element: cmb });
        }
    }
});