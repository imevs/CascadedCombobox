StartTest(function(t) {

    //t.hostPageUrl = 'cascadedCombobox.html?Country=England&city=London';

    t.chain(
        {
            waitFor: 1000
        },
        function(next) {
            var comboboxes = t.cq('cascadedcombobox');
            var cmbCountry = comboboxes[0];
            var cmbCity = comboboxes[1];

            t.is(cmbCountry.getRawValue(), 'England');
            t.is(cmbCity.getRawValue(), 'London');
        }
    );

});