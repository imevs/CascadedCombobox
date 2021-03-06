TestCase("Kladr testCase", {
    getFixtureData: function (testFile) {
        return Ext.Ajax.request({
            async: false,
            url: 'http://' + location.host + '/test/tests/unit/data_' + testFile + '.json'
        }).responseText;
    },

    setUp: function () {
        Ext.data.Connection.async = false;

        this.regions = JSON.parse(this.getFixtureData('regions'));
        this.districts = JSON.parse(this.getFixtureData('districts'));

        Ext.data.JsonP.requestCount = 0;

        Ext.util.Cookies.clear('region');
        Ext.util.Cookies.clear('district');

        Ext.create('IMEVS.kladr.Region');
        Ext.create('IMEVS.kladr.District');
    },
    testEmptyCookie: function(q) {
        Ext.data.JsonP.callback1(this.regions);

        assertEquals(Ext.ComponentQuery.query('#region')[0].store.data.items.length, 96);
        assertEquals(Ext.ComponentQuery.query('#district')[0].store.data.items.length, 0);
        assertEquals(Ext.data.JsonP.requestCount, 1);
    },
    testGetRegionValueFromCookie: function (q) {
        Ext.util.Cookies.set('region', 'Orenburgskaya');

        Ext.data.JsonP.callback1(this.regions);
        Ext.data.JsonP.callback2(this.districts);

        assertEquals(Ext.ComponentQuery.query('#region')[0].store.data.items.length, 96);
        assertEquals(Ext.ComponentQuery.query('#district')[0].store.data.items.length, 35);
        assertEquals(Ext.data.JsonP.requestCount, 2);
    }
});