/*
	Persists and Retrieves songs from localStorage
*/

angular.module('cms')
	.factory('songStorage', function() {
		'use strict';
		var STORAGE_ID = 'songs-angularjs';
		return {
			get: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},
			put: function (songs) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(songs));
			}
		};
	});