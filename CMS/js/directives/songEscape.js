/*
	Directive that executes when the element is an 'escape' keydown event
*/

angular.module('cms')
	.directive('songEscape', function () {
		'use strict';
		var ESCAPE_KEY = 27;
		return function (scope, elem, attrs) {
			elem.bind('keydown', function () {
				if (event.keyCode === ESCAPE_KEY) {
					scope.$apply(attrs.songEscape);
				}
			});
		};
	});