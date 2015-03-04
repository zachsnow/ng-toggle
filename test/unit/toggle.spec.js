(function () {
  'use strict';

  describe('when transcluding with ngMultiTemplate', function () {
    beforeEach(module('toggles'));
    beforeEach(module('test-partials'));

    it('simple test', inject(function ($compile, $rootScope) {
      var el = angular.element('<div ng-toggle="foo">Foo</div><div ng-toggled="foo">Foo content.</div>');
      el = $compile(el)($rootScope);
      var scope = el.scope();
      scope.$apply();

      expect(el[0].querySelector('[ng-toggled]')).text().toBe('');

      el[0].querySelector('[ng-toggle]').click();
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('Foo content.');

      el[0].querySelector('[ng-toggle]').click();
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('');
    }));
  });
})();
