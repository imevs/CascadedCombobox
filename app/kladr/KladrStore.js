Ext.define('IMEVS.kladr.KladrStore', {
    extend          : 'Ext.data.Store',
    alias           : ['kladr.store'],
    fields          : ['name', 'id', 'parents'],
    kladrElementType: null,
    proxy           : {
        type              : 'jsonp',
        url               : 'http://kladr-api.ru/api.php',
        limitParam        : '_limit',
        reader            : {
            type: 'json',
            root: 'result'
        },
        defaultExtraParams: {
            withParent: 1,
            token     : '51d170c82fb2b4ec04000001',
            key       : '0c673e93f9ea1a66214017e45ade5547bf0eb205'
        }
    },
    constructor     : function (config) {
        this.callParent(config);
        this.kladrElementType = config.kladrElementType;
    }
});
