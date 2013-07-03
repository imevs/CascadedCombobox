Ext.define('IMEVS.kladr.City', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'city',
    fieldLabel: 'City',
    dependsOn : 'district',
    store     : Ext.create('IMEVS.kladr.KladrStore', {
        kladrElementType: 'city'
    })
});