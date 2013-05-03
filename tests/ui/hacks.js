
Ext.apply(Ext.ComponentQuery.pseudos, {
    "nth-child": function (components, number) {
        var ret = [];

        if (components.length > 0) {
            ret.push(components[number]);
        }
        return ret;
    }

});