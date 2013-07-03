Ext.define('IMEVS.ux.kladr.City', {
    extend: 'IMEVS.ux.kladr.KladrCombobox',
    id        : 'city',
    fieldLabel: 'City',
    dependsOn : 'district',
    store     : Ext.create('IMEVS.ux.kladr.KladrStore', {
        kladrElementType: 'city'
    })
});