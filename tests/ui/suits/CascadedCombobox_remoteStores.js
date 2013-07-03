Ext.Loader.setPath('IMEVS', '../../app');
Ext.Loader.setConfig({ enabled: true, syncModeEnabled: true, disableCaching: false });
Ext.require([
    'Ext.data.Store',
    'IMEVS.kladr.KladrStore',
    'IMEVS.kladr.KladrCombobox',
    'IMEVS.kladr.Region',
    'IMEVS.kladr.District',
    'IMEVS.kladr.City',
    'IMEVS.kladr.Street',
    'IMEVS.kladr.Building',
    'IMEVS.ux.Cascadable',
    'IMEVS.ux.AutoDiscover',
    'IMEVS.ux.FetchFromRequest',
    'IMEVS.ux.SaveToCookie',
    'IMEVS.ux.CascadedCombobox'
]);

function runSandbox() {
    Ext.create('IMEVS.kladr.Region');
    Ext.create('IMEVS.kladr.District');
    Ext.create('IMEVS.kladr.City');
    Ext.create('IMEVS.kladr.Street');
    Ext.create('IMEVS.kladr.Building');
}

Ext.onReady(runSandbox);