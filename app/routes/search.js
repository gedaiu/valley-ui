import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    connection: service(),
    queryParams: {
        query: { refreshModel: true }
    },

    model(params) {
        this.get("connection").setQuery(params.query);
        return this.get('store').findAll("searchResult");
    }
});
