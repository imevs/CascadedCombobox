Ext.define('IMEVS.kladr.District', {
    extend: 'IMEVS.kladr.KladrCombobox',
    id        : 'district',
    fieldLabel: 'District',
    dependsOn : 'region',
    store     : Ext.create('IMEVS.kladr.KladrStore', {
        kladrElementType: 'district'
    })
});