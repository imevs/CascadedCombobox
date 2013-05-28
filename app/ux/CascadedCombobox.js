Ext.define('IMEVS.ux.CascadedCombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.cascadedcombobox',
    plugins: [
        Ext.create('IMEVS.ux.Cascadable'),
        Ext.create('IMEVS.ux.AutoDiscover'),
        Ext.create('IMEVS.ux.FetchFromRequest'),
        Ext.create('IMEVS.ux.SaveToCookie')
    ],

    config: {
        saveToCookie: false,
        autoDiscoverValues: false,
        fetchValuesFromRequests: false
    },

    initComponent: function() {
        var me = this;
        me.callParent();
    }

});