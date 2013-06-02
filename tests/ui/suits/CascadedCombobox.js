Ext.Loader.setPath('IMEVS', '../../app');
Ext.Loader.setConfig({ enabled: true, syncModeEnabled: true, disableCaching: false });
Ext.require([
    'Ext.data.Store',
    'IMEVS.ux.Cascadable',
    'IMEVS.ux.AutoDiscover',
    'IMEVS.ux.FetchFromRequest',
    'IMEVS.ux.SaveToCookie',
    'IMEVS.ux.CascadedCombobox'
]);

function runSandbox() {
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

    var country = Ext.create('IMEVS.ux.CascadedCombobox', {
        fieldLabel: 'Country',
        fetchValuesFromRequests: true,
        saveToCookie: true,
        store: countryStore,
        renderTo: Ext.getBody(),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value'
    });

    var city = Ext.create('IMEVS.ux.CascadedCombobox', {
        fieldLabel: 'City',
        fetchValuesFromRequests: true,
        saveToCookie: true,
        store: cityStore,
        renderTo: Ext.getBody(),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value',
        dependencyField: 'country',
        dependsOn: country
    });
}

Ext.onReady(runSandbox);