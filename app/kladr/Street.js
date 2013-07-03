Ext.define('IMEVS.ux.kladr.Street', {
    extend: 'IMEVS.ux.kladr.KladrCombobox',
    id        : 'street',
    fieldLabel: 'Street',
    dependsOn : 'city',
    store     : Ext.create('IMEVS.ux.kladr.KladrStore', {
        kladrElementType: 'street'
    })
});