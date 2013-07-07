Ext.define('IMEVS.kladr.City', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'city',
    fieldLabel: 'City',
    dependsOn : 'district',
    storeParams: {
        xclass: 'kladr.store',
        kladrElementType: 'city'
    }
});