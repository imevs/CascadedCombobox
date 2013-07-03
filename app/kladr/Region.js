Ext.define('IMEVS.ux.kladr.Region', {
    extend: 'IMEVS.ux.kladr.KladrCombobox',
    id        : 'region',
    fieldLabel: 'Region',
    store     : Ext.create('IMEVS.ux.kladr.KladrStore', {
        kladrElementType: 'region'
    })
});
