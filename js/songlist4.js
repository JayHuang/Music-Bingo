angular.module('Songs', [])
  .controller('Songlist', ['$scope', function($scope) {
    $scope.song = {songname: 'Sugar Shack',artist: 'Fireballs',id:1, file: 'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname: 'Personality',artist: 'Lloyd Price', id: 2, file: 'Goo Goo Dolls - Iris.mp3'},
                  {songname: 'Shakin All Over', artist: 'Guess Who', id: 3, file: 'Goo Goo Dolls - Slide.mp3'},
                  {songname: 'At The Hop', artist: 'Danny & The Juniors', id: 4, file: 'J-REYEZ - Our Promise.mp3'},
                  {songname: 'Love Me Do', artist: 'Beatles', id: 5, file: 'Natalie Imbruglia - Torn.mp3'},
                  {songname:'Rockin Robin', artist:'Bobby Day', id:6, file:'NieR Gestalt & RepliCant - Repose.mp3'},
                  {songname:'Wanderer',artist:'Dion',id:7, file:'One Republic - Counting Stars.mp3'},
                  {songname:'Twist',artist:'Chubby Checker',id:8, file:'The Script - If You Could See Me Now.mp3'},
                  {songname:'Believer',artist:'Monkees',id:9, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'Do Wah Diddy Diddy',artist:'Manfred Mann',id:10, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'Bad Bad Leroy Brown',artist:'Jim Croce',id:11, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'Runaround Sue',artist:'Dion',id:12, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'Then He Kissed Me',artist:'Crystals',id:13, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'Splish Splash',artist:'Bobby Darin',id:14, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'I Got You',artist:'Sonny And Cher',id:15, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'My Boyfriends Back',artist:'Angels',id:16, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'Puppy Love',artist:'Paul Anka',id:17, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'Sugar Sugar',artist:'Archies',id:18, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'Cherish',artist:'Association',id:19, file:'Final Fantasy X OST - To Zanarkand.mp3'},
                  {songname:'Good Vibrations',artist:'Beach Boys',id:20, file:'Final Fantasy X OST - To Zanarkand.mp3'}              
  }]);