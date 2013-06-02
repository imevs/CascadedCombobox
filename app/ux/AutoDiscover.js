Ext.define('IMEVS.ux.AutoDiscover', {

    getDefaultValue: function() {
        return this.cmb.getDefaultValue();
    },

    getStaticDefaultValue: function() {
        return this.cmb.statics().defaultValue;
    },

    getDefaultComboboxValue: function(cmb) {
        var name = cmb.fieldLabel, options = this.getOptions(cmb);

        if (options.length == 1) {
            return options[0];
        }
        return this.getVal(options, this.getDefaultValue()) ||
//               this.getVal(options, cmb.getStaticDefaultValue()) ||
               this.getVal(options, this.getStaticDefaultValue()) ||
               false;
    },

    getOptions: function(cmb) {
        var range = cmb.getStore().getRange();
        return Ext.pluck(Ext.pluck(range, 'data'), 'name');
    },

    getVal: function(opt, v) {
        return v && Ext.Array.contains(opt, v) ? v : false;
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
        this.cmb = cmb;
        var isLocalMode = cmb.queryMode === 'local';
        if (isLocalMode) {
            this.onLoad(cmb.getStore(), [], true, { element: cmb });
        } else {
            cmb.getStore().on('load', this.onLoad, this, {element: cmb});
        }
    }
});