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
to open or close another section) via `ng-toggle`.  Then you add
toggleds (the part that is supposed to be shown or hidden) via
`ng-toggled`. Then you're pretty much done.

Toggles have several forms, the simplest of which introduces a toggle
named by a static or interpolated string:

```html
  <a ng-toggle="a-simple-toggle">Click me!</a>
  <div ng-toggled="a-simple-toggle">
    Hey neat content brah!
  </div>
```

When "Click me!" is clicked, "Hey neat content brah!" is shown; click it again
and the content disappears.  That's about the long and the short of it.

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

### Uncloseable Toggles

Sometimes (especially when using groups) you have a toggle that you shouldn't
be able to close -- for instance, you may be using toggles to implement
tabs, and you'd prefer that the user not be able to close *all* the tabs.  For
this you can mark a toggles as not being *closeable*:

```html
  <a ng-toggle="tab-1" ng-toggle-group="tabs" ng-toggle-closeable="false">One Tab</a>
  <a ng-toggle="tab-2" ng-toggle-group="flyouts" ng-toggle-closeable="false">Another Tab</a>
  <div ng-toggled="tab-1">
    Tab 1 in the sun.
  </div>
  <div ng-toggled="tab-2">
    Tab 2 who?
  </div>
```

Except for in funny cases you probably want to mark all toggles in a group
as closeable or uncloseable.  Toggles are closeable by default.

### Hiding Toggles

Sometimes you want the button that opened a toggled to disappear when
the toggled is open, and reappear when the toggled is closed. For this you
can use the following CSS:

```css
  [ng-toggle].toggled { display: none; }
```

### Examples

To see a few different examples in action, check out this
[demo](http://plnkr.co/edit/bTBGAP5X835jKGUTEYlK?p=preview). Or see
`/test/example/index.html` in this repository.

## Testing

We has some.

```
  $ npm install
  $ bower install
  $ gulp test
```
