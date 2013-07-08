AsyncTestCase("Kladr testCase", {
    setUp: function () {
        Ext.data.JsonP.requestCount = 0;

        Ext.util.Cookies.clear('region');
        Ext.util.Cookies.clear('district');

        Ext.create('IMEVS.kladr.Region');
        Ext.create('IMEVS.kladr.District');
    },
    testEmptyCookie: function(q) {
        expectAsserts(3);

        q.call(function(callbacks){
            var myCallback = callbacks.add(function() {
                assertEquals(Ext.ComponentQuery.query('#region')[0].store.data.items.length, 96);
                assertEquals(Ext.ComponentQuery.query('#district')[0].store.data.items.length, 0);

                assertEquals(Ext.data.JsonP.requestCount, 1);
            });
            window.setTimeout(myCallback, 1000);
        });
    },
    testGetRegionValueFromCookie: function (q) {
        expectAsserts(3);

        Ext.util.Cookies.set('region', 'Оренбургская');

        q.call(function(callbacks){
            var myCallback = callbacks.add(function() {
                assertEquals(Ext.ComponentQuery.query('#region')[0].store.data.items.length, 96);
                assertEquals(Ext.ComponentQuery.query('#district')[0].store.data.items.length, 35);

                assertEquals(Ext.data.JsonP.requestCount, 2);
            });
            window.setTimeout(myCallback, 2000);
        });
    }
});