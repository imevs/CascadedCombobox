Ext.define('IMEVS.kladr.Building', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'building',
    fieldLabel: 'Building',
    dependsOn : 'street',
    store     : Ext.create('IMEVS.kladr.KladrStore', {
        kladrElementType: 'building'
    })
});