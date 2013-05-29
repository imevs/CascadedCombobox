Ext.define('IMEVS.ux.AutoDiscover', {

    getDefaultValue: function() {
        return 'All';
    },

    getDefaultComboboxValue: function(cmb) {
        var me = cmb;

        var name = me.fieldLabel,
            range = me.getStore().getRange(),
            options = Ext.pluck(Ext.pluck(range, 'data'), 'name'),
            defaultValue = this.getDefaultValue();

        if (options.length == 1) {
            return options[0];
        }
//        if (cookieValue && Ext.Array.contains(options, cookieValue)) {
//            return cookieValue;
//        }
        if (defaultValue && Ext.Array.contains(options, defaultValue)) {
            return defaultValue;
        }
        if (Ext.Array.contains(options, 'All')) {
            return 'All';
        }
        return false;
    },

    onLoad: function(store, records, successfull, opts) {
        var cmb = opts.element;
        var param = this.getDefaultComboboxValue(cmb);
        if (!param) return;

        var record = cmb.getStore().findRecord('name', param);
        if (!record) return;

        cmb.select(record);
    },

    init: function(cmb) {
        if (!cmb.autoDiscoverValues) {
            return;
        }
        var isLocalMode = cmb.queryMode === 'local';
        cmb.getStore().on('load', this.onLoad, this, {element: cmb});
    }
});