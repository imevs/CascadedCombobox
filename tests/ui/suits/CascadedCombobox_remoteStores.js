Ext.Loader.setPath('IMEVS', '../../app');
Ext.Loader.setConfig({ enabled: true, syncModeEnabled: true, disableCaching: false });
Ext.require([
    'Ext.data.Store',
    'IMEVS.ux.kladr.KladrStore',
    'IMEVS.ux.kladr.KladrCombobox',
    'IMEVS.ux.kladr.Region',
    'IMEVS.ux.kladr.District',
    'IMEVS.ux.kladr.City',
    'IMEVS.ux.kladr.Street',
    'IMEVS.ux.kladr.Building',
    'IMEVS.ux.Cascadable',
    'IMEVS.ux.AutoDiscover',
    'IMEVS.ux.FetchFromRequest',
    'IMEVS.ux.SaveToCookie',
    'IMEVS.ux.CascadedCombobox'
]);

function runSandbox() {
    Ext.create('IMEVS.ux.kladr.Region');
    Ext.create('IMEVS.ux.kladr.District');
    Ext.create('IMEVS.ux.kladr.City');
    Ext.create('IMEVS.ux.kladr.Street');
    Ext.create('IMEVS.ux.kladr.Building');
}

Ext.onReady(runSandbox);