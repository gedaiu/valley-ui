import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-form', 'Integration | Component | search form', {
  integration: true
});

test('it renders with the query value', function(assert) {
  this.set('queryValue', 'some text');

  this.render(hbs`
    {{search-form query=queryValue}}
  `);

  assert.equal(this.$(".query").val().trim(), 'some text');

  this.set('queryValue', 'some other text');

  assert.equal(this.$(".query").val().trim(), 'some other text');
});

test('when the query field value changes, the attribute should change too', function(assert) {
  this.render(hbs`
    {{search-form query=queryValue}}
  `);

  this.$(".query").val('some other text').change();

  assert.equal(this.$(".query").val().trim(), 'some other text');
});

test('if the onSearch action is triggered when the button is pressed', function(assert) {
  this.set('externalAction', (query) => {
    assert.equal(query, "some query");
  });

  this.render(hbs`
    {{search-form onSearch=externalAction}}
  `);

  this.$(".query").val('some query').change();
  this.$(".btn").click();
});
