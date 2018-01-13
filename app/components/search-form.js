import Component from '@ember/component';

export default Component.extend({
    classNames: ['input-group', 'mb-3', 'search'],
    query: '',
    onSearch: () => {},

    actions: {
        submitSearch() {
            var query = this.get('query');

            this.get('onSearch')(query);
        }
    }
});
