Ext.define('IMEVS.ux.kladr.District', {
    extend: 'IMEVS.ux.kladr.KladrCombobox',
    id        : 'district',
    fieldLabel: 'District',
    dependsOn : 'region',
    store     : Ext.create('IMEVS.ux.kladr.KladrStore', {
        kladrElementType: 'district'
    })
});