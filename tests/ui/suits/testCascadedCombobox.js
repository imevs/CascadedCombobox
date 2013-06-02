StartTest(function(t) {

    t.chain(
        {
            waitFor: 1000
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCity = comboboxes[1];

            t.is(cmbCity.getPicker().getNodes().length, 0);

            next();
        },
        // select Russia
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = comboboxes[0];

            t.click(cmbCountry.el.query('.x-trigger-cell')[ 0 ]);
            t.click(cmbCountry.getPicker().getNode(1), next);
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCity = comboboxes[1];
            t.click(cmbCity.el.query('.x-trigger-cell')[ 0 ], next);
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCity = comboboxes[1];

            t.is(cmbCity.getPicker().getNodes().length, 3);
            t.is(cmbCity.getPicker().getNode(0).textContent, 'Moscow');

            next();
        },

        // select England
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = comboboxes[0];

            t.click(cmbCountry.el.query('.x-trigger-cell')[ 0 ], next);
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = comboboxes[0];

            t.click(cmbCountry.getPicker().getNode(2), next);
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCity = comboboxes[1];
            t.click(cmbCity.el.query('.x-trigger-cell')[ 0 ]);

            t.is(cmbCity.getPicker().getNodes().length, 1);
            t.is(cmbCity.getPicker().getNode(0).textContent, 'London');
            next();
        },

        // select Russia again
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = comboboxes[0];
            t.click(cmbCountry.el.query('.x-trigger-cell')[ 0 ], next);
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = comboboxes[0];
            t.click(cmbCountry.getPicker().getNode(1), next);
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCity = comboboxes[1];
            t.is(cmbCity.getRawValue(), '');
        }


    );

});