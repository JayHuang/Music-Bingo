/* Author: Jay Huang */

$(function() { 
  window.songlist = {
    "songs": [
      {"songname":"Sugar Shack","artist":"Fireballs","id":1, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Personality","artist":"Lloyd Price","id":2, "file":"Goo Goo Dolls - Iris.mp3"},
      {"songname":"Shakin All Over","artist":"Guess Who","id":3, "file":"Goo Goo Dolls - Slide.mp3"},
      {"songname":"At The Hop","artist":"Danny & The Juniors","id":4, "file":"J-REYEZ - Our Promise.mp3"},
      {"songname":"Love Me Do","artist":"Beatles","id":5, "file":"Natalie Imbruglia - Torn.mp3"},
      {"songname":"Rockin Robin","artist":"Bobby Day","id":6, "file":"NieR Gestalt & RepliCant - Repose.mp3"},
      {"songname":"Wanderer","artist":"Dion","id":7, "file":"One Republic - Counting Stars.mp3"},
      {"songname":"Twist","artist":"Chubby Checker","id":8, "file":"The Script - If You Could See Me Now.mp3"},
      {"songname":"Believer","artist":"Monkees","id":9, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Do Wah Diddy Diddy","artist":"Manfred Mann","id":10, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Bad Bad Leroy Brown","artist":"Jim Croce","id":11, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Runaround Sue","artist":"Dion","id":12, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Then He Kissed Me","artist":"Crystals","id":13, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Splish Splash","artist":"Bobby Darin","id":14, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"I Got You","artist":"Sonny And Cher","id":15, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"My Boyfriends Back","artist":"Angels","id":16, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Puppy Love","artist":"Paul Anka","id":17, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Sugar Sugar","artist":"Archies","id":18, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Cherish","artist":"Association","id":19, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Good Vibrations","artist":"Beach Boys","id":20, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Itsy Bitsy Polkadot Bikini","artist":"Brian Hyland","id":21, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Johnny B Goode","artist":"Chuck Berry","id":22, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Chantilly Lace","artist":"Big Bopper","id":23, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Green Onions","artist":"Booker T & the MG's","id":24, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"The Letter","artist":"Boxtops","id":25, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"I'm Into Something Good","artist":"Herman's Hermits","id":26, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Stagger Lee","artist":"Lloyd Price","id":27, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"My Girl","artist":"Temptations","id":28, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Jumpin Jack Flash","artist":"Rolling Stones","id":29, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Love Child","artist":"Diana Ross/ Supremes","id":30, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"I Got You","artist":"James Brown","id":31, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Kind Of A Drag","artist":"The Buckinghams","id":32, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Palisades Park","artist":"Freddy Cannon","id":33, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Hit The Road Jack","artist":"Ray Charles","id":34, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Pipeline","artist":"Chantays","id":35, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Tequila","artist":"The Champs","id":36, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Duke of Earl","artist":"Gene Chandler","id":37, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"He's So Fine","artist":"Chiffons","id":38, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Lollipop","artist":"Chordettes","id":39, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Glad All Over","artist":"Dave Clark Five","id":40, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Crimson And Clover","artist":"Tommy James & The Shondells","id":41, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Charlie Brown","artist":"Coasters","id":42, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Do You Love Me","artist":"Contours","id":43, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Wild Thing","artist":"Troggs","id":44, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Lion Sleeps Tonight","artist":"Tokens","id":45, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Bread & Butter","artist":"Newbeats","id":46, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Suspicion","artist":"Terry Stafford","id":47, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Leader Of The Pack","artist":"Shangri-las","id":48, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Yummy Yummy Yummy","artist":"Ohio Express","id":49, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"How Do You Do It","artist":"Gerry & The Pacemakers","id":50, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"This Diamond Ring","artist":"Gary & The Playmakers","id":51, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Hang On Sloopy","artist":"McCoys","id":52, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Little Darlin","artist":"Diamonds","id":53, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Chapel Of Love","artist":"Dixies","id":54, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Blueberry Hill","artist":"Fats Domino","id":55, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Loco-Motion","artist":"Little Eva","id":56, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Save The Last Dance For Me","artist":"Drifters","id":57, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"It's My Party","artist":"Leslie Gore","id":58, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Happy Together","artist":"Turtles","id":59, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Build Me Up Buttercup","artist":"Foundations","id":60, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"I Can't Help Myself","artist":"Four Tops","id":61, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Good Lovin","artist":"Young Rascals","id":62, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Louie Louie","artist":"Kingsmen","id":63, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Stand By Me","artist":"Ben E King","id":64, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Tossin and Turnin","artist":"Bobby Lewis","id":65, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Great Balls Of Fire","artist":"Jerry Lee Lewis","id":66, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Book Of Love","artist":"Monotones","id":67, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Pretty Woman","artist":"Roy Orbison","id":68, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Good Golly Miss Molly","artist":"Little Richard","id":69, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Blue Suede Shoes","artist":"Elvis Presley","id":70, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"La Bamba","artist":"Richie Valens","id":71, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Be My Baby","artist":"Ronettes","id":72, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Rescue Me","artist":"Fontella Bass","id":73, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"Lightning Strikes","artist":"Lou Christie","id":74, "file":"Final Fantasy X OST - To Zanarkand.mp3"},
      {"songname":"My Guy","artist":"Mary Wells","id":75, "file":"Final Fantasy X OST - To Zanarkand.mp3"}
    ]
  }
});