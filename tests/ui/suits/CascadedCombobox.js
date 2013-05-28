Ext.Loader.setPath('IMEVS', '../../app');
Ext.Loader.setConfig({ enabled: true, syncModeEnabled: true });
Ext.require('IMEVS.ux.CascadedCombobox');

var countryStore = Ext.create('Ext.data.Store', {
    fields: ['name', 'value'],
    data: [
        {name: 'Russia', value: 1},
        {name: 'England', value: 2},
        {name: 'USA', value: 3},
        {name: 'German', value: 4}
    ]
});
var cityStore = Ext.create('Ext.data.Store', {
    fields: ['name', 'value', 'country'],
    data: [
        {name: 'Moscow', value: 1, country: 1},
        {name: 'Orsk', value: 2, country: 2}
    ]
});

Ext.onReady(function() {
    var country = Ext.create('IMEVS.ux.CascadedCombobox', {
        fieldLabel: 'Country',
        store: countryStore,
        renderTo: Ext.getBody(),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value'
    });

    var city = Ext.create('IMEVS.ux.CascadedCombobox', {
        fieldLabel: 'City',
        store: cityStore,
        renderTo: Ext.getBody(),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value',
        dependencyField: 'country',
        dependsOn: country
    });

});