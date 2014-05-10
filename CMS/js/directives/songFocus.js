/*
	Directive places focus on the element
*/

angular.module('cms')
	.directive('songFocus', function songFocus($timeout) {
		'use strict';
		return function (scope, elem, attrs) {
			scope.$watch(attrs.songFocus, function (newVal) {
				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					},0, false);
				}
			});
		};
	});