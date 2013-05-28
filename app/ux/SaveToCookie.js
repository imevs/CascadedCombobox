Ext.define('IMEVS.ux.SaveToCookie', {

    getStorage: function() {
        return this.storage ? this.storage : (this.storage = Ext.util.Cookies);
    },

    setFilterValue: function(name, value) {
        this.getStorage().set(name.toLowerCase(), value);
    },

    init: function(cmb) {
        if (!cmb.saveToCookie) {
            return;
        }


    }
});