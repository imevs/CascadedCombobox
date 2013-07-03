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
        records.length && this.setFilterValue(element.fieldLabel, records[0].get('name'));
    },

    getStorageValue: function (opts) {
        return this.getStorage().get(opts.element.fieldLabel.toLowerCase());
    },

    onLoad: function(store, records, successfull, opts) {
        var value = this.getStorageValue(opts);
        var record = store.findRecord('name', value);
        record && opts.element.select(record);
    },

    createOnSelectParentListener: function() {
        return function(parent, records, child) {
            Ext.log('createOnSelectParentListener: ' + child.fieldLabel);
            this.getStorage().clear(child.fieldLabel.toLowerCase());
            child.fireEvent('select', child, []);
        }
    },

    init: function(cmb) {
        if (!cmb.saveToCookie) {
            return;
        }
        cmb.dependsOn && cmb.dependsOn.on('select', this.createOnSelectParentListener(), this, cmb);
        cmb.on('select', this.onSelect, this);

        var isLocalMode = cmb.queryMode === 'local';
        if (isLocalMode) {
            this.onLoad(cmb.getStore(), [], true, { element: cmb });
        } else {
            cmb.getStore().on('load', this.onLoad, this, { single: true, element: cmb });
        }
        
        cmb.store.load();
    }
});