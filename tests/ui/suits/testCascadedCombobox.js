StartTest(function(t) {

    t.chain(
        {
            waitFor: 1000
        },
        function(next) {
            var cmb = t.cq1('cascadedcombobox > combobox');
            t.click(cmb.el.query('.x-trigger-cell')[ 0 ]);
            t.click(cmb.getPicker().getNode(0), next);

            //t.ok(false);

            next();
        }

    );

});