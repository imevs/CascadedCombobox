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
    var countryStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        fields: ["name", "value"],
        proxy: {
            type: "ajax",
            url: "data/country.json",
            reader: {
                type: "json",
                root: "items"
            }
        }
    });
    var cityStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        fields: ["name", "value", "country"],
        proxy: {
            type: "ajax",
            url: "data/city.json",
            reader: {
                type: "json",
                root: "items"
            }
        }
    });
    var regionStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        fields: ["name", "value", "country"],
        proxy: {
            type: "ajax",
            url: "data/region.json",
            reader: {
                type: "json",
                root: "items"
            }
        }
    });
    var streetStore = Ext.create("Ext.data.Store", {
        autoLoad: true,
        fields: ["name", "value", "city"],
        proxy: {
            type: "ajax",
            url: "data/street.json",
            reader: {
                type: "json",
                root: "items"
            }
        }
    });

    var country = Ext.create("IMEVS.ux.CascadedCombobox", {
        fieldLabel: "Country",
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        store: countryStore,
        renderTo: Ext.getBody(),
        displayField: "name",
        valueField: "value"
    });

    var city = Ext.create("IMEVS.ux.CascadedCombobox", {
        fieldLabel: "City",
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        store: cityStore,
        renderTo: Ext.getBody(),
        displayField: "name",
        valueField: "value",
        dependencyField: "country",
        dependsOn: country
    });

    var street = Ext.create("IMEVS.ux.CascadedCombobox", {
        fieldLabel: "Street",
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        store: streetStore,
        renderTo: Ext.getBody(),
        displayField: "name",
        valueField: "value",
        dependencyField: "city",
        dependsOn: city
    });

    var region = Ext.create("IMEVS.ux.CascadedCombobox", {
        fieldLabel: "Region",
        fetchValuesFromRequests: true,
        saveToCookie: true,
        autoDiscoverValues: true,
        store: regionStore,
        renderTo: Ext.getBody(),
        displayField: "name",
        valueField: "value",
        dependencyField: "country",
        dependsOn: country
    });
}

Ext.onReady(runSandbox);