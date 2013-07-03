Ext.define('IMEVS.ux.kladr.Building', {
    extend: 'IMEVS.ux.kladr.KladrCombobox',
    id        : 'building',
    fieldLabel: 'Building',
    dependsOn : 'street',
    store     : Ext.create('IMEVS.ux.kladr.KladrStore', {
        kladrElementType: 'building'
    })
});