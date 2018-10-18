//localStorage.clear();
let person_array = new Array(); // array voor de 10 mensen
let like_array = new Array();
let dislike_array = new Array();

fetch('https://randomuser.me/api/?results=10')// max 10 resultaten bij de fetch
	.then(function(response){
		return response.json();// Json code terugsturen 
	})
	.then(function(data){
		create();// roep de create functie op
		showPeople(); // roep de functie showpeople
		fetchLocal();
		document.querySelector('.container__buttons--like').addEventListener('click', function (){
			like();
		});
		document.querySelector('.container__buttons--dislike').addEventListener('click', function(){ // zelfde systeem als de like knop
			dislike();
		});
		document.querySelector('.container__lists--showLikes').addEventListener('click', function(){
			showList();
		});

		///functions///
		
		function create(){
			for(let i=0; i<10; i++){ // for loop voor 10 resultaten te krijgen
				let person = data.results[i];
				let collection = { // personen interpreteren als objecten 
					name: person.name.first + ' ' + person.name.last,
					picture: person.picture.large,
					location: person.location.street + '<br> ' + person.location.city,
					age: person.dob.age,
					id: person.id.value,
					longitude: person.location.coordinates.longitude ,
					latitude:  person.location.coordinates.latitude
				}
				person_array.push(collection); // personen toevoegen aan de lege array person_array
			}
			localStorage.setItem("persons",JSON.stringify(person_array));
		}

		function showPeople(){ // maak de functie showPeople om de opmaak van het tinder profiel te maken
			let box = document.querySelector('#container__tinderBox');
			let div = document.createElement('div'); // maak een div element aan
				div.className ="container__tinderBox--info"; // div krijgt de classe info
			let img = document.createElement('img'); // maak een img element aan
				img.src = person_array[0].picture; // img src instellen
				img.className ="profilePic";// img krijgt de classe profilePic
				img.draggable ="true";// img krijgt de classe profilePic
			let name = document.createElement('h1'); // maak een h1 element  aan
				name.innerHTML = person_array[0].name;// innerHTML van h1 is de name uit object collection
				name.className ="name"; // de H1 krijgt de classnaam name
			let age = document.createElement('h2'); // maak een h2 element aan
				age.innerHTML = person_array[0].age;// innerHTML van h2 is de leeftijd uit object collection
				age.className = "age"; // de H12krijgt de classnaam age
			let adress = document.createElement('p'); // maak een p element aan
				adress.innerHTML = person_array[0].location;// innerHTML van adress is de locatie uit object collection
				adress.className = "adress";// de p krijgt de classnaam adress
			let location = document.createElement('p'); // maak een p element aan
				location.innerHTML = person_array[0].longitude + ' ' + person_array[0].latitude;// innerHTML van adress is de locatie uit object collection
				location.className = "adress";// de p krijgt de classnaam adress
			div.appendChild(img);
			div.appendChild(name);
			div.appendChild(age);
			div.appendChild(adress);
			div.appendChild(location);
			box.appendChild(div);
			map();
			getLocation();
		}
		function fetchLocal(){
			if(person_array.length==1){
				fetch('https://randomuser.me/api/?results=10')// max 10 resultaten bij de fetch
				create();
			}else{
			}
			if(localStorage.getItem("persons") == null){
				fetch('https://randomuser.me/api/?results=10')// max 10 resultaten bij de fetch
			}else{
				console.log(localStorage.getItem("persons"));
			}
		};
		function like(){
			if(person_array.length<=1){ // controleer of er minder dan 1 of 1 persoon in de person_array zit
				like_array.push(person_array[0]); //push de eerste person van de person_array in de like_array
				person_array.shift();//haal de eerste persoon uit de person array
				localStorage.removeItem("persons");// verwijder de eerste 10 personen uit de localstorage
				location.reload(); // doe een reload waardoor de fetch opnieuw word aangespreken en we terug 10 personen binnen krijgen
			}else if(localStorage.getItem("likes") !==null ){ // als de likes niet gelijk zijn aan null zowel als waarde als type
				like_array = JSON.parse(localStorage.getItem("likes"));// parse de likes in de localstorage als objecten in de like array
				like_array.push(person_array[0]);
				person_array.shift();
				document.getElementById('container__tinderBox').innerHTML="";// maakt de innerHTML leeg voor de volgende persoon
				showPeople();// roep de functie show people op
				localStorage.setItem("persons", JSON.stringify(person_array));// stringyfy de binnengekomen personen
				localStorage.setItem("likes", JSON.stringify(like_array));// stingyfy de binnengekomen likes
			}else{
				like_array.push(person_array[0]);
				person_array.shift();
				document.getElementById('container__tinderBox').innerHTML="";
				showPeople();
				localStorage.setItem("persons", JSON.stringify(person_array));
				localStorage.setItem("likes", JSON.stringify(like_array));
				}
			}
			function dislike(){
				if(person_array.length<=1){
					dislike_array.push(person_array[0]);
					person_array.shift();
					localStorage.removeItem("persons");
					location.reload();
				}else if(localStorage.getItem("dislikes") !==null){
					dislike_array = JSON.parse(localStorage.getItem("dislikes"));
					dislike_array.push(person_array[0]);
					person_array.shift();
					document.getElementById('container__tinderBox').innerHTML="";
					showPeople();
					console.log(person_array.length);
					localStorage.setItem("persons", JSON.stringify(person_array));
					localStorage.setItem("dislikes", JSON.stringify(dislike_array));
				}else{
					dislike_array.push(person_array[0]);
					person_array.shift();
					document.getElementById('container__tinderBox').innerHTML="";
					showPeople();
					console.log(person_array.length);
					localStorage.setItem("persons", JSON.stringify(person_array));
					localStorage.setItem("dislikes", JSON.stringify(dislike_array));
				}
			}
			function showList(){
				document.querySelector('.container__LD--likeList').innerHTML = "";// maak de like list ieder keer opnieuw leeg zodat je niet twee keer dezelfde personen hebt

				for(let i=0; i<like_array.length; i++){
					document.querySelector('.container__LD--likeList').innerHTML += like_array[i].name + ' <button id="toDislike">Change to dislike</button><br>';
					let lButtons = document.querySelectorAll('#toDislike');
					for(let a=0; a<lButtons.length; a++){
						lButtons[a].addEventListener('click', function(){
							dislike_array = JSON.parse(localStorage.getItem("dislikes"));// maak de dislikes javascript objecten in de localstorage
							dislike_array.push(like_array[a]);// push het aangeklikte deel in de dislike array
							// Met splice haal je uw element uit uw array
							//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice 
							like_array.splice(a,1);// splice het weg
							localStorage.setItem("likes", JSON.stringify(like_array));// (Refresh) uw localstorage acher de splice
							localStorage.setItem("dislikes", JSON.stringify(dislike_array));// stringyfy de binnengekregen data	
							console.log(dislike_array);
						});
					}
				}
				//zelfde systeem als likeList
				document.querySelector('.container__LD--dislikeList').innerHTML = "";
				for(let y=0; y<dislike_array.length; y++){
					document.querySelector('.container__LD--dislikeList').innerHTML += dislike_array[y].name+ ' <button id="toLike">Change to like</button><br>';
					let dButtons = document.querySelectorAll('#toLike');
					for(let x=0; x<dButtons.length; x++){
						dButtons[x].addEventListener('click', function(){
							like_array = JSON.parse(localStorage.getItem("likes"));
							like_array.push(dislike_array[x]);
							dislike_array.splice(x,1);
							localStorage.setItem("dislikes", JSON.stringify(dislike_array));
							localStorage.setItem("likes", JSON.stringify(like_array));
						});
					}
				}
			}
			
	///////D&D////////

			document.addEventListener('dragstart', dragStart);
			document.addEventListener('dragend', dragEnd);
			document.addEventListener('drop', dragDrop);
			document.addEventListener('dragover', dragOver);

		

			function dragStart(e){
				console.log('start');
				e.target.style.opacity = .3;
				e.dataTransfer.setData("clickedButton", e.target.id);
				e.dataTransfer.dropEffect = "move";
			}
			function dragEnd(e){
				e.preventDefault();
				console.log('end');
				e.target.style.opacity = 1.0;
			}
			
			function dragDrop(e) {
				console.log('hallo');
				e.preventDefault();
				// only drop on dropzones
				if (e.toElement.className === "likedropzone") {
				  like();
				}else{
				dislike();
				}
			  }
			  function dragOver(e) {
				e.preventDefault();
			  }
	/////////// Geolocation ////////////
	function degreesToRadians(degrees) {
		return degrees * Math.PI / 180;
	  }

	function showPosition(position) {
		let Lat = position.coords.latitude;
		let Long = position.coords.longitude;
		let Long2 = person_array[0].longitude;
		let Lat2 = person_array[0].latitude;
		let R = 6371e3; // metres
		let φ1 = degreesToRadians(Lat);
		let φ2 = degreesToRadians(Lat2);
		let Δφ = degreesToRadians(Lat2-Lat);
		let Δλ = degreesToRadians(Long2-Long);
		let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
				Math.cos(φ1) * Math.cos(φ2) *
				Math.sin(Δλ/2) * Math.sin(Δλ/2);
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		let d = document.getElementById("container__geo");
		let result = Math.round(R * c/1000);
		d.innerHTML = 'Uw match bevind zich op ' + result + ' Kilometer afstand';
	}
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		}else{
			alert('Geolocation not supported');
		}
	}
	function map(){
		mapboxgl.accessToken = 'pk.eyJ1Ijoib3dlbmRld2FlbGUiLCJhIjoiY2puOHAzZnRzNmo5MzN2bnhqNW53aDBicyJ9.7M-e8KcSjdnouRI2WH30JA';
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [person_array[0].longitude, person_array[0].latitude],
			zoom:14
		});
		
		map.on('load', function(){
			let radius=50; //radius of the circle
			map.addSource("geomarker", { //making a source for the radius
				"type": "geojson",
				"data": {
				"type": "FeatureCollection",
				"features": [{
					"type": "Feature",
					"geometry": {
					"type": "Point",
					"coordinates": [person_array[0].longitude, person_array[0].latitude] 
					}
				}]
				}
			});
			map.addLayer({ //displaying the radius of the circle
				"id": "geomarker",
				"type": "circle",
				"source": "geomarker",
				"paint": {
				"circle-radius": radius, //radius with the variable radius
				"circle-color": "#FF0000", //color
				"circle-opacity": 0.5, //opacity
				}
			});
		});
	}
	}).catch(function(error){
		console.log('de data word niet weergegeven ' + error.message);
	})
	console.log(localStorage.getItem('persons'));

	