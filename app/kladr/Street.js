Ext.define('IMEVS.kladr.Street', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'street',
    fieldLabel: 'Street',
    dependsOn : 'city',
    store     : Ext.create('IMEVS.kladr.KladrStore', {
        kladrElementType: 'street'
    })
});