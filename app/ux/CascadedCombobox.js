Ext.define('IMEVS.ux.CascadedCombobox', {
    extend: 'Ext.form.FieldContainer',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    alias: 'widget.cascadedcombobox',
    layout: 'column',
    requires: ['Ext.form.field.Base'],

    config: {
        stores: [],
        linkKey: 'id',
        count: 0
    },

    initComboboxes: function () {
        var me = this;
        var count = Math.max(me.getCount(), me.stores.length);
        for (var i = 0; i < count; i++) {
            var props = {};
            if (me.stores[i]) {
                props.queryMode = 'local';
                props.displayField = 'name';
                props.valueField = 'value';

                props.store = me.stores[i];
            }
            var item = Ext.create('Ext.form.field.ComboBox', props);

            me.items.add(item);
        }
    },

    initComponent: function() {
        var me = this;
        me.callParent();
        me.initField();
        me.initComboboxes();
    }

});
