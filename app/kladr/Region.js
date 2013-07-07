Ext.define('IMEVS.kladr.Region', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'region',
    fieldLabel: 'Region',
    storeParams: {
        xclass: 'kladr.store',
        kladrElementType: 'region'
    }
});
