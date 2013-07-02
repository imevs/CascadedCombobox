Ext.define('IMEVS.ux.Cascadable', {

    onChangeParent: function() {
        Ext.log('IMEVS.ux.Cascadable >> change');
        this.setValue(null);
        this.store.load();
    },

    filterCallback: function (item) {
        var curVal = this.dependsOn.getValue();
        var dependentValue = Ext.isFunction(this.dependencyField)
            ? this.dependencyField.call(item)
            : item.get(this.dependencyField);
        return curVal && dependentValue == curVal;
    },

    init: function(cmb) {
        if (!cmb.dependsOn) {
            return;
        }
        cmb.dependsOn.on('change', this.onChangeParent, cmb);

        var isLocalMode = cmb.queryMode === 'local';
        if (isLocalMode) {
            cmb.store.filters = new Ext.util.MixedCollection();
            var filters = cmb.store.decodeFilters([Ext.bind(this.filterCallback, cmb)]);
            cmb.store.filters.addAll(filters);
        }

        cmb.store.load();
    }
});