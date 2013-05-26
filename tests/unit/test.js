TestCase("MyTestCase", {
    testA: function () {
        var cmp = Ext.create('IMEVS.ux.CascadedCombobox', {
            count: 3
        });
        assertNotUndefined(cmp);
        assertNotNull(cmp);
        assertInstanceOf(IMEVS.ux.CascadedCombobox, cmp);

//        assertEquals(cmp.getCount(), 3);
//        assertEquals(cmp.items.length, 3);
    },
    testB: function () {
        var countryStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                {name: 'Russia', value: 1},
                {name: 'England', value: 2},
                {name: 'USA', value: 3},
                {name: 'German', value: 4}
            ]
        });
        var cityStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value', 'country'],
            data: [
                {name: 'Moscow', value: 1, country: 1},
                {name: 'Orsk', value: 2, country: 2}
            ]
        });

        var country = Ext.create('IMEVS.ux.CascadedCombobox', {
            fieldLabel: 'Country',
            store: countryStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        });

        var city = Ext.create('IMEVS.ux.CascadedCombobox', {
            fieldLabel: 'City',
            store: cityStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            dependencyField: 'country',
            dependsOn: country
        });

        assertEquals(city.store.filters.getCount(), 1);
    },
    testC: function() {

    }

});