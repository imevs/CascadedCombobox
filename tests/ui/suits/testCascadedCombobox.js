StartTest(function(t) {

    var elements = {};
    t.chain(
        {
            waitFor: 1000
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = elements.cmbCountry = comboboxes[0];
            var cmbCity = elements.cmbCity = comboboxes[1];

            t.is(cmbCity.getPicker().getNodes().length, 0);
            next();
        },

        // select Russia
        function(next) {
            var cmbCountry = elements.cmbCountry;

            t.click(cmbCountry.el.query('.x-trigger-cell')[ 0 ]);
            t.click(cmbCountry.getPicker().getNode(1), next);
        },
        // select England
        function(next) {
            var cmbCountry = elements.cmbCountry;

            t.click(cmbCountry.el.query('.x-trigger-cell')[ 0 ]);
            t.click(cmbCountry.getPicker().getNode(2), next);
        },
        function(next) {
            var cmbCity = elements.cmbCity;
            t.is(cmbCity.getRawValue(), 'London');
            next();
        },
        // select Russia again
        function(next) {
            var cmbCountry = elements.cmbCountry;

            t.click(cmbCountry.el.query('.x-trigger-cell')[ 0 ]);
            t.click(cmbCountry.getPicker().getNode(1), next);
        },
        function(next) {
            var cmbCity = elements.cmbCity;
            t.is(cmbCity.getRawValue(), '');
        }

    );

});