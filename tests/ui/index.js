var Harness = Siesta.Harness.Browser;


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

//    hostPageUrl: '../../../index.html',
    overrideSetTimeout: false,

    testClass   : Siesta.Test.OverridedExtJS,

    viewportWidth               : 800,
    viewportHeight               : 600,

    preload : [
        'hacks.js'
//        '../../../resources/sinon-1.5.2.js'
    ]
});


Harness.start(
    {
        group       : 'Basic application layout',

        items       : [
            {
                title: 'Test CascadedCombobox',
                hostPageUrl: 'cascadedCombobox.html',
                url: 'suits/testCascadedCombobox.js'
            }
        ]
    }
);