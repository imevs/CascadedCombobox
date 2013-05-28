Ext.define('IMEVS.ux.Cascadable', {

    init: function(cmb) {
        if (!cmb.dependsOn) {
            return;
        }

        cmb.dependsOn.on('change', function () {
            cmb.store.load();
        });

        var filter = function (item) {
            var curVal = cmb.dependsOn.getValue();
            return curVal && item.get(cmb.dependencyField) == curVal;
        };

        cmb.store.filters = new Ext.util.MixedCollection();
        cmb.store.filters.addAll(cmb.store.decodeFilters([filter]));
        cmb.store.load();
    }
});