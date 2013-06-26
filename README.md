# Refactoring WordPress PHP & jQuery code to use Backbone

Inspired by [Step by Step from jQuery to Backbone](https://github.com/kjbekkelund/writings/blob/master/published/understanding-backbone.md), this is an example of how to take a small gallery component, primarily authored within the PHP of a WordPress theme and refactor it to render on the front-end, first with jQuery and then finally by using Backbone models and views.

1. Our baseline: an old-fashioned [PHP-heavy solution](https://github.com/kadamwhite/backbone-wordpress-demo/pull/7)
2. [Move gallery rendering to JS](https://github.com/kadamwhite/backbone-wordpress-demo/pull/8)): Reduce iteration within the PHP by adding `data-` attributes to the trigger links, and use that object's `.data()` to render out the featured image JS-side
3. [Get that HTML out of our JavaScript](https://github.com/kadamwhite/backbone-wordpress-demo/pull/9) by embedding the markup back in the .php file as an inline template and using `_.template` to render
4. [Move the markup into an HTML partial](https://github.com/kadamwhite/backbone-wordpress-demo/pull/10) and pre-compile the template with Grunt
5. Refactor the jQuery used to render the featured image [using a Backbone model and view](https://github.com/kadamwhite/backbone-wordpress-demo/pull/11)
6. [Move the model and view code into separate files](https://github.com/kadamwhite/backbone-wordpress-demo/pull/12)
7. [Refactor the remaining pure jQuery code into Backbone views](https://github.com/kadamwhite/backbone-wordpress-demo/pull/13)

With the exception of the first step, each of those links will take you to the pull request where I walk through the code changes being made as we move from one step to the next.
