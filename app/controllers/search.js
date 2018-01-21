import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
    queryParams: ['query'],
    query: null,
    _currentQuery: null,

    currentQuery: computed('_currentQuery', {
        get(key) {
            if(this.get("_currentQuery") == null) {
                return this.get("query");
            }

            return this.get("_currentQuery");
        },
        set(key, value) {
            this.set("_currentQuery", value);
        }
    }),
    actions: {
        onSearch(query) {
            this.transitionToRoute("search", { queryParams: { query: query }});
        }
    }
});
