Ext.Loader.setPath('IMEVS', '../../app');
Ext.Loader.setConfig({ enabled: true, syncModeEnabled: true });

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
    fields: ['name', 'value'],
    data: [
        {name: 'Moscow', value: 1, ref: 1},
        {name: 'Orsk', value: 2, ref: 1}
    ]
});

Ext.onReady(function() {
    Ext.create('IMEVS.ux.CascadedCombobox', {
        labels: [
            'Countries', 'Cities'
        ],
        stores: [
            countryStore, cityStore
        ],
        renderTo: Ext.getBody()
    });
});