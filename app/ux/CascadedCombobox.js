Ext.define('IMEVS.ux.CascadedCombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.cascadedcombobox',
    plugins: [
        Ext.create('IMEVS.ux.Cascadable'),
        Ext.create('IMEVS.ux.AutoDiscover'),
        Ext.create('IMEVS.ux.SaveToCookie'),
        Ext.create('IMEVS.ux.FetchFromRequest')
    ],

    static: {
        defaultValue: 'All'
    },

    config: {
        defaultValue: 'All',
        saveToCookie: false,
        autoDiscoverValues: false,
        fetchValuesFromRequests: false
    },

    initComponent: function() {
        var me = this;
        me.callParent();
    }

});