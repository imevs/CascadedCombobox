var Harness = Siesta.Harness.Browser;

function isEmpty(map) {
    for(var key in map) {
        if (map.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

Role('Siesta.Test.OverridedExtJS', {
    isa: Siesta.Test.ExtJS,

    override:{
        /**
         * An alias for Ext.ComponentQuery.query
         *
         * @param {String} selector The selector to perform a component query with
         */
        cq : function (selector) {
            var result = [];
            try {
                result = this.Ext().ComponentQuery.query(selector);
            } catch (ex) {}
            return result;
        },

        /**
         * An shorthand method to get the first result of any Ext.ComponentQuery.query
         *
         * @param {String} selector The selector to perform a component query with
         */
        cq1 : function (selector) {
            return this.Ext().ComponentQuery.query(selector)[0];
        }
    }
});

Harness.configure({
    title     : 'Sencha UI Test Demo - Application Tests',

    overrideSetTimeout: false,

    testClass   : Siesta.Test.OverridedExtJS,

    viewportWidth               : 800,
    viewportHeight               : 600,

    preload : [
        'hacks.js'
//        '../../../resources/sinon-1.5.2.js'
    ],

    autoRun: true,
    viewDOM: true,

    generateJSONReport: function() {
        var allPassed       = true;
        var me              = this;

        if (isEmpty(me.testsByURL)) return 0;

        Joose.A.each(me.flattenDescriptors(me.descriptors), function (descriptor) {
            // if at least one test is missing then something is wrong
            if (descriptor.isMissing) { allPassed = false; return false }

            var test    = me.getTestByURL(descriptor.url);

            // ignore missing tests (could be skipped by test filtering
            if (!test) return;

            allPassed = allPassed && test.isPassed()
        });

        return allPassed
    }
});


Harness.start(
    {
        group: 'Basic application layout',
        preload: [
            'suits/CascadedCombobox.js'
        ],

        items: [
            {
                title: 'Test CascadedCombobox',
                hostPageUrl: 'cascadedCombobox.html',
                url: 'suits/testCascadedCombobox.js'
            },
            {
                preload: [
                    'suits/clearCookie.js',
                    'suits/CascadedCombobox.js'
                ],
                title: 'Test CascadedCombobox AutoDiscover',
                hostPageUrl: 'cascadedCombobox.html',
                url: 'suits/testAutoDiscover.js'
            },
            {
                title: 'Test CascadedCombobox FetchFromRequest.js',
                hostPageUrl: 'cascadedCombobox.html?Country=England&city=London',
                url: 'suits/testFetchFromRequest.js'
            }
        ]
    }
);