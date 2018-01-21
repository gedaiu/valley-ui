import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.Adapter.extend({
    connection: service(),

    init() {
        this.get("connection").init();
    },

    setQuery(query) {
        this.get("connection").send("query:" + query);
    },

    findAll(store, type, sinceToken) {
        return this.get("connection").findAll(store, type, sinceToken);
    }
});
