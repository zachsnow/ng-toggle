# ng-toggle

Simple micro-interactions for AngularJS.

## Dependencies

1. AngularJS.
2. That's it.

## Installation

* Load `toggles.js`.

* Add `toggles` as a dependency to your angular module.

```javascript
  angular.module('yourModule', [
    // ... other dependencies ...
    'toggles'
  ]);
```

* Use `ng-toggle`, `ng-toggled`, and friends in your templates.

## Usage

First, you introduce new toggles (the part you click on or touch
to open or close another section) via `ng-toggle`.  It has several forms,
the simplest of which introduces a toggle named by a static string:

```html
  <a ng-toggle="a-simple-toggle">Click me!</a>
  <div ng-toggled="a-simple-toggle">
    Hey neat content brah.
  </div>
```

### Auto-close

Sometimes you want clicking "off" of a flyout or popup to close it. If you
are using `ng-toggle` to implement your flyout, you can use `ng-toggle-auto-close`
to indicate that clicks that make it all the way to `<body />` should be
treated as closing the toggle.

### Groups

Sometimes you have a group of toggles/toggleds, of which only 1 toggled
should be open at any time. For example, you might have several flyout
menus next to each other, and you don't want them all open at once or they
end up on top of one another.  For this you can use *groups*:

```html
  <a ng-toggle="flyout-1" ng-toggle-group="flyouts">Click me!</a>
  <a ng-toggle="flyout-2" ng-toggle-group="flyouts">No click me!</a>
  <div ng-toggled="flyout-1">
    Flyout One!
  </div>
  <div ng-toggled="flyout-2">
    Flyout Two is Better!
  </div>
```

You only need to put the toggle itself into a group; the toggleds associated
with the toggle will be automatically associated with the group as well.

### Examples

To see a few different examples in action, check out this
[demo](http://plnkr.co/edit/kMH2lYJ20LqNjgqwJ6W6?p=preview). Or see
`/test/example/index.html` in this repository.