TestCase("MyTestCase", {
    testA: function () {
        var cmp = Ext.create('IMEVS.ux.CascadedCombobox', {
            count: 3
        });
        assertNotUndefined(cmp);
        assertNotNull(cmp);
        assertInstanceOf(IMEVS.ux.CascadedCombobox, cmp);

        assertEquals(cmp.getCount(), 3);
        assertEquals(cmp.items.length, 3);
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
            fields: ['name', 'value'],
            data: [
                {name: 'Moscow', value: 1, ref: 1},
                {name: 'Orsk', value: 2, ref: 1}
            ]
        });
        var cmp = Ext.create('IMEVS.ux.CascadedCombobox', {
            labels: [
                'Countries', 'Cities'
            ],
            stores: [
                countryStore, cityStore
            ]
        });
        var country = cmp.items[0];

        assertEquals(cmp.items.length, 2);
    },
    testC: function() {

    }

});