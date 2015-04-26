(function () {
  'use strict';

  var works = function(el, content){
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('');

      el[0].querySelector('[ng-toggle]').click();
      expect(el[0].querySelector('[ng-toggled]')).text().toBe(content);

      el[0].querySelector('[ng-toggle]').click();
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('');
  };

  describe('toggle tests', function () {
    beforeEach(module('toggles'));

    it('works for simple toggles', inject(function ($compile, $rootScope) {
      var el = angular.element('<div ng-toggle="foo">Foo</div><div ng-toggled="foo">Foo content.</div>');
      el = $compile(el)($rootScope);
      var scope = el.scope();
      scope.$apply();
      works(el, 'Foo content.');
    }));

    it('supports interpolation in toggle names', inject(function ($compile, $rootScope) {
      var el = angular.element('<div ng-toggle="foo-{{ name }}">Foo</div><div ng-toggled="foo-hello">Foo content.</div>');
      el = $compile(el)($rootScope, {
        i: 'hello'
      });
      var scope = el.scope();
      scope.$apply();

      works(el, 'Foo content.');
    }));

    it('supports interpolation in toggled names', inject(function ($compile, $rootScope) {
      var el = angular.element('<div ng-toggle="foo-hello">Foo</div><div ng-toggled="foo-{{ name }}">Foo content.</div>');
      el = $compile(el)($rootScope, {
        i: 'hello'
      });
      var scope = el.scope();
      scope.$apply();

      works(el, 'Foo content.');
    }));
  });

  describe('default tests', function(){
    beforeEach(module('toggles'));

    it('supports fixed default state', inject(function ($compile, $rootScope) {
      var el = angular.element('<div ng-toggle="foo" ng-toggle-default>Foo</div><div ng-toggled="foo">Foo content.</div>');
      el = $compile(el)($rootScope);
      var scope = el.scope();
      scope.$apply();

      // Already open.
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('Foo content.');

      // Close.
      el[0].querySelector('[ng-toggle]').click();

      // Still works.
      works(el, 'Foo content.');
    }));

    it('supports evaluated default state (open)', inject(function ($compile, $rootScope) {
      var el = angular.element('<div ng-toggle="foo" ng-toggle-default="d">Foo</div><div ng-toggled="foo">Foo content.</div>');
      el = $compile(el)($rootScope, {
        d: true
      });
      var scope = el.scope();
      scope.$apply();

      // Already open.
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('Foo content.');

      // Close.
      el[0].querySelector('[ng-toggle]').click();

      // Still works.
      works(el, 'Foo content.');
    }));

    it('supports evaluated default state (closed)', inject(function ($compile, $rootScope) {
      var el = angular.element('<div ng-toggle="foo" ng-toggle-default="d">Foo</div><div ng-toggled="foo">Foo content.</div>');
      el = $compile(el)($rootScope, {
        d: false
      });
      var scope = el.scope();
      scope.$apply();
    }));
  });

  describe('group tests', function(){
    beforeEach(module('toggles'));

    it('should close other toggles in a group when one is opened', inject(function ($compile, $rootScope) {
      var el = angular.element('<div ng-toggle="foo" ng-group="group">Foo</div><div ng-toggled="foo">Foo content.</div>' +
        '<div ng-toggle="bar" ng-group="group">Foo</div><div ng-toggled="bar">Bar content.</div>'
      );
      el = $compile(el)($rootScope);
      var scope = el.scope();
      scope.$apply();

      expect(el[0].querySelector('[ng-toggled="foo"]')).text().toBe('');
      expect(el[0].querySelector('[ng-toggled="bar"]')).text().toBe('');

      el[0].querySelector('[ng-toggle="foo"]').click();
      expect(el[0].querySelector('[ng-toggled="foo"]')).text().toBe('Foo content.');
      expect(el[0].querySelector('[ng-toggled="bar"]')).text().toBe('');

      el[0].querySelector('[ng-toggle="bar"]').click();
      expect(el[0].querySelector('[ng-toggled="foo"]')).text().toBe('');
      expect(el[0].querySelector('[ng-toggled="bar"]')).text().toBe('Bar content.');

      el[0].querySelector('[ng-toggle="bar"]').click();
      expect(el[0].querySelector('[ng-toggled="foo"]')).text().toBe('');
      expect(el[0].querySelector('[ng-toggled="bar"]')).text().toBe('');
    }));
  });

  describe('auto-close tests', function () {
    beforeEach(module('toggles'));

    it('click off test', inject(function ($compile, $rootScope) {
      var el = angular.element('<span>Another thing</span><div ng-toggle="foo" ng-toggle-auto-close>Foo</div><div ng-toggled="foo">Foo content.</div>');
      el = $compile(el)($rootScope);
      var scope = el.scope();
      scope.$apply();

      // Open the toggle, verify it is open.
      el[0].querySelector('[ng-toggle]').click();
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('Foo content.');

      // Click something else, verify the toggle closes.
      el[0].querySelector('span').click();
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('');
    }));

    it('click on test', inject(function ($compile, $rootScope) {
      var el = angular.element('<span>Another thing</span><div ng-toggle="foo" ng-toggle-auto-close>Foo</div><div ng-toggled="foo">Foo content.</div>');
      el = $compile(el)($rootScope);
      var scope = el.scope();
      scope.$apply();

      // Open the toggle, verify it is open.
      el[0].querySelector('[ng-toggle]').click();
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('Foo content.');

      // Click the content, verify the toggle does not close.
      el[0].querySelector('[ng-toggled]').click();
      expect(el[0].querySelector('[ng-toggled]')).text().toBe('Foo content.');
    }));
  });
})();
