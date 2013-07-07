Ext.define('IMEVS.kladr.District', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'district',
    fieldLabel: 'District',
    dependsOn : 'region',
    storeParams: {
        xclass: 'kladr.store',
        kladrElementType: 'district'
    }
});