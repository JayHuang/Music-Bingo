/*
	The main controller:
	+retrieves the model via the songStorage service
	+expose the model to the template and provides event handlers
*/
angular.module('cms')
	.controller('SongCtrl', function SongCtrl ($scope, $routeParams, $filter, songStorage) {
		'use strict';
		var songs = $scope.songs = songStorage.get();
		$scope.newSong = '';
		$scope.editedSong = null;
		//[by Thanh] I don't think I should have this counter
		$scope.$watch('songs', function (newValue, oldValue) {
			//count the number of songs that is checked
			$scope.remainingCount = $filter('filter')(songs, {completed: false}).length;
			$scope.completedCount = songs.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
			if (newValue !== oldValue) {
				songStorage.put(songs);
			}
		}, true);
		//[May be removed or adjust]
		/*$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{completed:false} : {status === 'completed'} ?
				{completed:true}:null;
		});*/
		//Add songs (bingo game/intermission songs)
		$scope.addSong = function () {
			var newSong = $scope.newSong.trim();
			var newArtist = $scope.newArtist.trim();
			var intermissionSong = document.getElementById('intermission');
			if (!newSong.length || !newArtist.length || (songs.length >= 75)) {
				return;
			}
			//if the song is an intermission song
			if(intermissionSong.checked == true){
				intermissionSongs.push({
					title: newSong,
					completed: false
				});
			}
			//if the song is not an intermission song
			else {
				songs.push({
				title: newSong,
				completed: false
				});
			}
			//reset the textbox
			$scope.newSong = '';
			$scope.newArtist = '';
			document.getElementById('File-upload').value = null;
		};
		//Auto add songs from directory
		$scope.autoAddSongs = function() {
			console.log("autoAddSongs called");
			var 
				file, 
				extension, 
				maxNumOfSongs = 75,
				input = document.getElementById("File-upload-auto-add");
			
			for(var i = 0; i < maxNumOfSongs; i++){

				// extension = input.files[i].name.split(".").pop();
				// if(extension != "wav" || extension != "mp3"){
				// 	maxNumOfSongs++;
				// 	continue;
				// }

				songs.push({
					title: input.files[i].name,
					completed: false
				});

			}
			document.getElementById('File-upload-auto-add').value = null;

		};

		//Add sample
		$scope.addSample = function(){
			//Assign the sample to input
			var	sample = document.getElementByID("File-upload-sample");

				//save to sample list
				//samples.push({title: input.files.name})
		};

		//Add Introduction
		$scope.AddIntro = function(){
			var intro = docment.getElementByID("File-upload-intro");

			//save intro

		};

		//Edit song entry
		$scope.editSong = function (song) {
			$scope.editSong = song;
			// Be able to restore the original song
			$scope.originalSong = angular.extend({}, song);
		};
		$scope.doneEditing = function (song) {
			$scope.editedSong = null;
			song.title = song.title.trim();
			if (!song.title) {	//if the song title is empty <--> remove the song
				$scope.removeSong(song);
			}
		};
		$scope.revertEditing = function (song) {
			songs[songs.indexOf(song)] = $scope.originalSong;
			$scope.doneEditing($scope.originalSong);
		};
		//remove song
		$scope.removeSong = function (song) {
			songs.splice(songs.indexOf(song), 1);
		};
		//remove all songs
		$scope.removeAllSongs = function(song) {
			for(var i = 0; i < 75; i++){
				songs.splice(songs.indexOf(song), 1);
			}
		}
		//don't need it, but I will remove this later
		$scope.clearCompletedSongs = function () {
			$scope.songs = songs = songs.filter(function (val) {
				return !val.completed;
			});
		};
		//select all
		$scope.markAll = function (completed) {
			songs.forEach(function (song) {
				song.completed = !completed;
			});
		};

	});
