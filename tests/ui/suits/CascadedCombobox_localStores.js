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
            {name: 'All', value: 0},
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
            {name: 'Orsk', value: 2, country: 1},
            {name: 'Spb', value: 3, country: 1},
            {name: 'London', value: 4, country: 2}
        ]
    });
    var regionStore = Ext.create('Ext.data.Store', {
        fields: ['name', 'value', 'country'],
        data: [
            {name: 'Moskovskaya', value: 1, country: 1},
            {name: 'Orlovskaya', value: 2, country: 1},
            {name: 'Orenburgskaya', value: 3, country: 1},
            {name: 'Columbia', value: 4, country: 3},
            {name: 'Filadelfia', value: 5, country: 3}
        ]
    });
    var streetStore = Ext.create('Ext.data.Store', {
        fields: ['name', 'value', 'city'],
        data: [
            {name: 'Lenina', value: 1, city: 2},
            {name: 'Chkalova', value: 2, city: 2},
            {name: 'Novaya', value: 3, city: 2},
            {name: 'Tereshkova', value: 4, city: 2},
            {name: 'Ligovskiy', value: 5, city: 3},
            {name: 'Dumskaya', value: 6, city: 3},
            {name: 'Nevsky', value: 7, city: 3}
        ]
    });

    var country = Ext.create('IMEVS.ux.CascadedCombobox', {
        fieldLabel: 'Country',
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
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
        autoDiscoverValues: true,
        store: cityStore,
        renderTo: Ext.getBody(),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value',
        dependencyField: 'country',
        dependsOn: country
    });

    var street = Ext.create('IMEVS.ux.CascadedCombobox', {
        fieldLabel: 'Street',
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        store: streetStore,
        renderTo: Ext.getBody(),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value',
        dependencyField: 'city',
        dependsOn: city
    });

    var region = Ext.create('IMEVS.ux.CascadedCombobox', {
        fieldLabel: 'Region',
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        store: regionStore,
        renderTo: Ext.getBody(),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value',
        dependencyField: 'country',
        dependsOn: country
    });
}

Ext.onReady(runSandbox);