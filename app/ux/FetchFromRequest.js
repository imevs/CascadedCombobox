Ext.define('IMEVS.ux.FetchFromRequest', {

    location: location,

    getQueryParams: function() {
        var params = Ext.Object.fromQueryString(this.location.search.substring(1));
        var paramsWithKeyInLowerCase = {};
        for (var param in params) if (params.hasOwnProperty(param)) {
            paramsWithKeyInLowerCase[param.toLowerCase()] = params[param];
        }
        return paramsWithKeyInLowerCase;
    },

    onLoad: function(store, records, successfull, opts) {
        var cmb = opts.element;
        var queryParams = this.getQueryParams(), value, record;
        for (var queryParam in queryParams) if (queryParams.hasOwnProperty(queryParam)) {
            if (queryParam === cmb.fieldLabel.toLowerCase()) {
                value = queryParams[queryParam];
                record = cmb.getStore().findRecord('name', value);
                record && cmb.select(record);
            }
        }
    },

    init: function(cmb) {
        if (!cmb.fetchValuesFromRequests) {
            return;
        }
        var isLocalMode = cmb.queryMode === 'local';
        if (isLocalMode) {
            this.onLoad(cmb.getStore(), [], true, { element: cmb });
        } else {
            cmb.getStore().on('load', this.onLoad, this, { single: true, element: cmb });
        }
    }
});