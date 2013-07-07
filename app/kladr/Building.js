Ext.define('IMEVS.kladr.Building', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'building',
    fieldLabel: 'Building',
    dependsOn : 'street',
    storeParams: {
        xclass: 'kladr.store',
        kladrElementType: 'building'
    }
});