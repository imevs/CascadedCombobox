StartTest(function(t) {

    t.chain(
        {
            waitFor: 1000
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = comboboxes[0];
            var cmbCity = comboboxes[1];

            t.is(cmbCountry.getRawValue(), 'All');
            t.is(cmbCity.getRawValue(), '');

            next();
        },
        // select England
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = comboboxes[0];

            t.click(cmbCountry.el.query('.x-trigger-cell')[ 0 ]);
            t.click(cmbCountry.getPicker().getNode(2), next);
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = comboboxes[0];
            var cmbCity = comboboxes[1];

            t.is(cmbCountry.getRawValue(), 'England');
            t.is(cmbCity.getRawValue(), 'London');
            next();
        }
    );

});