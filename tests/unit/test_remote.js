AsyncTestCase("Kladr testCase", {
    setUp: function () {
        Ext.util.Cookies.clear('region');
        Ext.util.Cookies.clear('district');
        Ext.create('IMEVS.kladr.Region');
        Ext.create('IMEVS.kladr.District');
    },
    testEmptyCookie: function(q) {
        expectAsserts(2);

        Ext.ComponentQuery.query('#region')[0].store.load();

        q.call(function(callbacks){
            var myCallback = callbacks.add(function() {
                assertEquals(Ext.ComponentQuery.query('#region')[0].store.data.items.length, 96);
                assertEquals(Ext.ComponentQuery.query('#district')[0].store.data.items.length, 0);
            });
            window.setTimeout(myCallback, 1000);
        });
    },
    testGetRegionValueFromCookie: function (q) {
        expectAsserts(2);

        Ext.util.Cookies.set('region', 'Оренбургская');
        Ext.ComponentQuery.query('#region')[0].store.load();

        q.call(function(callbacks){
            var myCallback = callbacks.add(function() {
                assertEquals(Ext.ComponentQuery.query('#region')[0].store.data.items.length, 96);
                assertEquals(Ext.ComponentQuery.query('#district')[0].store.data.items.length, 35);
            });
            window.setTimeout(myCallback, 1000);
        });
    }
});