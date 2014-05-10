angular.module ("cms", ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';
		$routeProvider.when('/', {
			controller: 'SongCtrl',
		}).when('/:status', {
			controller: 'SongCtrl',
		}).otherwise({
			redirectTo: '/'
		});
	});