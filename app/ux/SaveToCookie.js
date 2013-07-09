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
        var key = opts.element.fieldLabel.toLowerCase();
        var value = this.getStorage().get(key);
        console.log('getStorageValue.key >> ', key);
        console.log('getStorageValue.value >> ', value);
        return value;
    },

    onLoad: function(store, records, successfull, opts) {
        if (opts.element.getValue()) {
            opts.element.fireEvent('ignore_cookie');
            return;
        }

        if (opts.element.ignoreCookie) return;

        var value = this.getStorageValue(opts);
        var record = store.findRecord('name', value);
        console.log('onLoad >> ' + (record && JSON.stringify(record.getData())));
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
        cmb.dependsOn && cmb.dependsOn.on('ignore_cookie', function() {
            this.ignoreCookie = true;
            this.fireEvent('ignore_cookie');
        }, cmb);

        cmb.on('select', this.onSelect, this);

        var isLocalMode = cmb.queryMode === 'local';
        if (isLocalMode) {
            this.onLoad(cmb.getStore(), [], true, { element: cmb });
        } else {
            cmb.getStore().on('load', this.onLoad, this, { single: true, element: cmb });
        }
    }
});