videowall-seekbar
==================

A very simple browser UI control for use with [Babelify](https://github.com/babel/babelify) that coordinates seeking in multiple videos. It is inspired by [slideways](https://github.com/substack/slideways/) and [range-slider](https://github.com/hughsk/range-slider/blob/master/index.js).

It handles:

- Providing you with a seekbar DOM element.
- Updating the seekbar to reflect the position of the videos' playback. It does this via a `style` tag on its DOM element.
- Updating the videos' `currentTime` when the seekbar handle is moved.
- Notifying you (if you subscribe to its `usersetvalue` event) when the value changes as a result of UI action.

It leaves to you:

- Adding the seekbar DOM element however and whenever you see fit.
- Styling the seekbar via CSS.

Installation
------------

    npm install videowall-seekbar

Instantiation
-------------

    var Seekbar = require('videowall-seekbar');

    var seekbar = Seekbar({
      mediaElements: arrayOMediaDOMElements,
      min: 0,
      max: 100,
      initValue: 0
    });

The Seekbar factory opts are:

  - `min`: This is the minimum possible value for the seekbar and videos.
  - `max`: This is the maximum possible value for the seekbar and videos.
  - `initValue`: This is the initial value for the seekbar.
  - `window`: You can provide this if you want it to use something other than `window` to create DOM elements.
  - `width`: This can be any valid string value for the CSS width attribute, e.g.'400px', '80%'. Defaults to '100%'.
  - `onValueChange`: A callback that you can provide to get notified when the seekbar value changes. The seekbar will pass a single parameter: Just the value. This will not be called more than 30 times a second.

CSS
---

There are three DOM elements created and managed by the Seekbar object. They have the following CSS classes:

  - videowall-seekbar: The container element for the seekbar.
  - videowall-seekbar-turtle: A child element that the user can drag to control the media's playback position.
  - videowall-seekbar-runner: A child element that represents the track on which the turtle runs.

These are the only style properties that Seekbar will change:

  - position
  - left
  - top
  - display
  - width

It changes them via the `style` property on the DOM element, so they take precedence over any properties assigned to them via CSS. However, everything else about them is controllable via CSS.

Some essential things you *need* to set up via CSS are:

  - height on all three elements (Without that, they'll be 0 height.)
  - .videowall-seekbar-runner and .videowall-seekbar-turtle background-colors
  - .videowall-seekbar-turtle width

For example:

    .videowall-seekbar {
      height: 60px;
    }

    .videowall-seekbar-runner {
      background-color: gray;
      height: 100%;
    }

    .videowall-seekbar-turtle {
      background-color: green;
      width: 44px;
      height: 100%;
    }

Then, you can go nuts with `border-radius` and transitions and what have you if that is how you roll.

Usage
-----

    var seekbarDOMElement = seekbar.el();
    parentDOMElement.appendChild(seekbarDOMElement);

    seekbarDOMElement.addEventListener('usersetvalue', logValue);

    function logValue(e) {
      console.log(e.target.getValue);
    }

Seekbar instances have the following methods:

  - `el`: Returns the seekbar's DOM element.
  - `getValue`: Returns' the seekbar's current value.

Seekbar instances emit a `usersetvalue` event whenever the user changes the value via the UI.

Building
--------

If you know how to use Babelify, you know how to build with this module. Browserify is a tool that lets you organize your code as Node modules and then build it so that the browser understands it. Babelify is a *transform* for Browserify that converts ES6 code into ES5 code so that current browsers understand it. So, your build command will be something like:

    browserify your-main-file.js -t babelify

In development, you probably want to use a watcher like [wzrd](https://github.com/maxogden/wzrd). So, your command will be something like:

    wzrd index.js -- -t babelify

Then, wzrd will say something like:

    server started at http://localhost:9966

And you can open your browser to that and hopefully see your seekbar!

Tests
-----

Install:

    (sudo) npm install -g browserify
    (sudo) npm install -g smokestack

Then, run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 President and Fellows of Harvard College

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
