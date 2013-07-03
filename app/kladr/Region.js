Ext.define('IMEVS.kladr.Region', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'region',
    fieldLabel: 'Region',
    store     : Ext.create('IMEVS.kladr.KladrStore', {
        kladrElementType: 'region'
    })
});
