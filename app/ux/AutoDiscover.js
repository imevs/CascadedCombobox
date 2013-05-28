Ext.define('IMEVS.ux.AutoDiscover', {

    getDefaultValue: function() {
        return 'All';
    },

    getDefaultComboboxValue: function() {
        var me = this;

        var name = me.fieldLabel,
            cookieValue = this.getStorage().get(name),
            range = me.getStore().getRange(),
            options = Ext.pluck(Ext.pluck(range, 'data'), 'name'),
            defaultValue = me.getDefaultValue();

        if (options.length == 1) {
            return options[0];
        }
        if (cookieValue && Ext.Array.contains(options, cookieValue)) {
            return cookieValue;
        }
        if (defaultValue && Ext.Array.contains(options, defaultValue)) {
            return defaultValue;
        }
        if (Ext.Array.contains(options, 'All')) {
            return 'All';
        }
        return false;
    },

    init: function(cmb) {
        if (!cmb.autoDiscoverValues) {
            return;
        }

        cmb.store.on('load', function() {
            var param = cmb.getDefaultComboboxValue();
            if (!param) return;

            var record = cmb.getStore().findRecord('name', param);
            if (!record) return;

            cmb.select(record);
            cmb.fireEvent('select', cmb, [record]);
            cmb.setValue(me.getDefaultComboboxValue());
        });

    }
});