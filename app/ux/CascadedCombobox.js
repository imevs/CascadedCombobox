Ext.define('IMEVS.ux.CascadedCombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.cascadedcombobox',

    config: {
        linkKey: 'id'
    },

    initComponent: function() {
        var me = this;

        if (me.dependsOn) {
            me.dependsOn.on('change', function() {
               me.store.load();
            });

            var filter = function(item) {
                var curVal = me.dependsOn.getValue();
                return curVal && item.get(me.dependencyField) == curVal;
            };

            me.store.filters = new Ext.util.MixedCollection();
            me.store.filters.addAll(me.store.decodeFilters([filter]));
            me.store.load();
        }

        me.callParent();
    }

});
