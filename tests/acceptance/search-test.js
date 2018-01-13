import { test } from 'qunit';
import moduleForAcceptance from 'valley-ui/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | search');

test('should show search as the home page', function (assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/search', 'should redirect automatically');
  });
});

test('should display the search bar', function (assert) {
  visit('/search');
  andThen(() => {
    assert.equal(find('.search .query').length, 1)
    assert.equal(find('.search .btn').length, 1)
  });
});

test('should list the query results', function (assert) {
});

test('visiting /search', function(assert) {
  visit('/search');

  andThen(function() {
    assert.equal(currentURL(), '/search');
  });
});
