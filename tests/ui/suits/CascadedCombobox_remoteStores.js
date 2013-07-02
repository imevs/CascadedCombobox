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
        fields: ["name", "id", "parents"],
        kladrElementType: null,
        proxy: {
            type: "jsonp",
            url: "http://kladr-api.ru/api.php",
            limitParam: '_limit',
            defaultExtraParams: {
                withParent: 1,
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
        }
    });

    Ext.define('KladrCombobox', {
        extend: 'IMEVS.ux.CascadedCombobox',
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        displayField: "name",
        valueField: "id",
        renderTo: Ext.getBody(),
        dependencyField: function() {
            var value = this.data["parents"] && this.data["parents"][0] && this.data["parents"][0]["id"];
            if (!value) {
                //debugger;
            }
            return value;
        },
        initComponent: function() {
            var me = this;
            me.callParent();

            var store = me.getStore();
            store.on('beforeload', function() {
                var proxy = store.getProxy();
                proxy.extraParams = Ext.clone(proxy.defaultExtraParams);
                store.kladrElementType && proxy.setExtraParam('contentType', store.kladrElementType);

                if (me.dependsOn) {
                    var dependentStore = me.dependsOn.getStore();
                    var dependentValue = me.dependsOn.getValue();
                    dependentValue && proxy.setExtraParam(dependentStore.kladrElementType + 'Id', dependentValue);
                }
            });
        }
    });

    var region = Ext.create("KladrCombobox", {
        fieldLabel: "Region",
        store: Ext.create("KladrStore", {
            kladrElementType: 'region'
        })
    });

    var district = Ext.create("KladrCombobox", {
        fieldLabel: "District",
        dependsOn: region,
        store: Ext.create("KladrStore", {
            kladrElementType: 'district'
        })
    });

    var city = Ext.create("KladrCombobox", {
        fieldLabel: "City",
        dependsOn: district,
        store: Ext.create("KladrStore", {
            kladrElementType: 'city'
        })
    });

    var street = Ext.create("KladrCombobox", {
        fieldLabel: "Street",
        dependsOn: city,
        store: Ext.create("KladrStore", {
            kladrElementType: 'street'
        })
    });

    var building = Ext.create("KladrCombobox", {
        fieldLabel: "Building",
        dependsOn: street,
        store: Ext.create("KladrStore", {
            kladrElementType: 'building'
        })
    });

}

Ext.onReady(runSandbox);