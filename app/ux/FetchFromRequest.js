Ext.define('IMEVS.ux.FetchFromRequest', {

    getQueryParams: function() {
        var params = Ext.Object.fromQueryString(location.search.substring(1));
        var paramsWithKeyInLowerCase = {};
        for (var param in params) if (params.hasOwnProperty(param)) {
            paramsWithKeyInLowerCase[param.toLowerCase()] = params[param];
        }
        return paramsWithKeyInLowerCase;
    },

    init: function(cmb) {
        if (!cmb.fetchValuesFromRequests) {
            return;
        }

        var queryParams = this.getQueryParams();
        for (var queryParam in queryParams) if (queryParams.hasOwnProperty(queryParam)) {
            cmb.setFilterValue(queryParam, queryParams[queryParam]);
        }
    }
});