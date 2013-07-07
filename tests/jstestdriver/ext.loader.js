Ext.Loader.setPath('IMEVS', '/test/app');
Ext.Loader.setConfig({ enabled: true, syncModeEnabled: true, disableCaching: true });
Ext.define('Ext.data.proxy.Server', {override:'Ext.data.proxy.Server', noCache:false });