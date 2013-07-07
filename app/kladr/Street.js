Ext.define('IMEVS.kladr.Street', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'street',
    fieldLabel: 'Street',
    dependsOn : 'city',
    storeParams: {
        xclass: 'kladr.store',
        kladrElementType: 'street'
    }
});