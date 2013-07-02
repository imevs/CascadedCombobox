Ext.Loader.setPath("IMEVS", "../../app");
Ext.Loader.setConfig({ enabled: true, syncModeEnabled: true, disableCaching: false });
Ext.require([
    "Ext.data.Store",
    "IMEVS.ux.Cascadable",
    "IMEVS.ux.AutoDiscover",
    "IMEVS.ux.FetchFromRequest",
    "IMEVS.ux.SaveToCookie",
    "IMEVS.ux.CascadedCombobox"
]);

function runSandbox() {
    Ext.define("KladrStore", {
        extend: 'Ext.data.Store',
        autoLoad: true,
        fields: ["name", "value"],
        kladrElementType: null,
        proxy: {
            type: "jsonp",
            url: "http://kladr-api.ru/api.php",
            limitParam: '_limit',
            extraParams: {
                token: '51d170c82fb2b4ec04000001',
                key: '0c673e93f9ea1a66214017e45ade5547bf0eb205'
            },
            reader: {
                type: "json",
                root: "result"
            }
        },
        constructor: function(config) {
            this.callParent(config);
            this.kladrElementType = config.kladrElementType;
            this.kladrElementType && this.on('beforeload', function() {
                this.getProxy().setExtraParam('contentType', this.kladrElementType);
            });
        }
    });

    var city = Ext.create("IMEVS.ux.CascadedCombobox", {
        fieldLabel: "City",
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        store: Ext.create("KladrStore", {
            fields: ["name", "value", "country"],
            kladrElementType: 'city'
        }),
        renderTo: Ext.getBody(),
        displayField: "name",
        valueField: "value",
        dependencyField: "country"
//        dependsOn: country
    });

    var street = Ext.create("IMEVS.ux.CascadedCombobox", {
        fieldLabel: "Street",
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        store: Ext.create("KladrStore", {
            fields: ["name", "value", "city"],
            kladrElementType: 'street'
        }),
        renderTo: Ext.getBody(),
        displayField: "name",
        valueField: "value",
        dependencyField: "city"
//        dependsOn: city
    });

    var region = Ext.create("IMEVS.ux.CascadedCombobox", {
        fieldLabel: "Region",
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        store: Ext.create("KladrStore", {
            fields: ["name", "value", "country"],
            kladrElementType: 'region'
        }),
        renderTo: Ext.getBody(),
        displayField: "name",
        valueField: "value",
        dependencyField: "country"
//        dependsOn: country
    });
}

Ext.onReady(runSandbox);