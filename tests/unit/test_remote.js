AsyncTestCase("Kladr testCase", {
    setUp: function () {
    },
    tearDown: function() {
    },
    testA: function (q) {
        var cmb = Ext.create('IMEVS.kladr.Region', {});
        var cmb2 = Ext.create('IMEVS.kladr.District', {});
        cmb.store.load();

        q.call(function(callbacks){
            var myCallback = callbacks.add(function() {
                console.log('myCallback');
                assertEquals(Ext.ComponentQuery.query('#region')[0].store.data.items.length, 96);
                assertEquals(Ext.ComponentQuery.query('#district')[0].store.data.items.length, 35);
            });
            window.setTimeout(myCallback, 1000);
        });
    }
});