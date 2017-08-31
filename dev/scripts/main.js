const booksMovies = {};

//API keys
booksMovies.movieKey = "b8b83ba71713f763aef645ce0a40da06";
booksMovies.baseUrl = "https://www.googleapis.com/books/v1/volumes";
booksMovies.bookKey = "AIzaSyCzmy3LAli_4J8VGAHaAfdkCL3xC_4iVlE"


const paragraph = "We’re buzzing in our pews, the electricity of raw gossip flitting around us like so many wings. We feed on it, spread it around like a honey that sticks. Our madam archdeacon is at the center of it all, and if the rumors are true, no vestment can hide her guilt from the likes of us. The service is about to start. The organ hums to life, signalling the start of the processional: the venerable queen is about to emerge. Suspicion thickens the air like pollen. Our faces turn towards the narthex, primed to sting. Conditions are favorable for swarming.";

//STOPWATCH JS INCOMMING
// Stopwatch by Cathy Dutton 
// https://codepen.io/cathydutton/pen/GBcvo

window.onload = function () {
  
  var seconds = 0; 
  var tens = 0; 
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var buttonStart = document.getElementById('button-start');
  var buttonStop = document.getElementById('button-stop');
  var buttonReset = document.getElementById('button-reset');
  var Interval ;

  buttonStart.onclick = function() {
     clearInterval(Interval);
     Interval = setInterval(startTimer, 10);
  }
  
    buttonStop.onclick = function() {
       clearInterval(Interval);
       console.log (seconds);
       var totalTime = seconds;
  }

  buttonReset.onclick = function() {
     clearInterval(Interval);
    tens = "00";
  	seconds = "00";
    appendTens.innerHTML = tens;
  	appendSeconds.innerHTML = seconds;
  }
  
  function startTimer () {
    tens++; 
    
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  }
}

//Handling submit function
let handleSubmit = (e) => {
	e.preventDefault();
	let userInput = $(".queryInput").val();
	booksMovies.getMovieInfo(userInput);
}

// Gets users free time submission
let freeTimeTest = () => {
	$(".freeTimeInput").on("submit", (e) => {
		e.preventDefault();
		let freeTimeHours = $(".freeTimeHours").val();
		let freeTimeMinutes = $(".freeTimeMinutes").val();
		console.log(freeTimeHours);
		console.log(freeTimeMinutes);
		// console.log("success");
	});
}

//get user movie information
booksMovies.getMovieInfo = (userMovieChoice) => {
	$.ajax({
		url: "https://api.themoviedb.org/3/search/movie",
		method: "GET",
		dataType: "json",
		data: {
			api_key: booksMovies.movieKey,
			query: userMovieChoice,
			include_adult: false
		}
	}).then((res) => {
		let movieResults = res.results;
		booksMovies.displayMovieInfo(movieResults);
		booksMovies.getData(userMovieChoice); 
	});
}

// display movie information onto page
booksMovies.displayMovieInfo = (movieResults) => {
		// console.log(movieResults);
		// $().empty();
		

		for (let i = 0; i < 4; i++) {
			// 	movie backdrop path
			let movBg = `https://image.tmdb.org/t/p/w500${movieResults[i].backdrop_path}`;
			// movie poster
			let movImage = $("<img>").attr("src", `https://image.tmdb.org/t/p/w500${movieResults[i].poster_path}`).attr("alt", `${movieResults[i].title} poster image`);
			//movie title <h2> and adding to page
			let movTitle = $("<h2>").text(movieResults[i].title);
			//movie year
			let movYear = movieResults[i].release_date.split("-");
			movYear = $("<h3>").text(movYear[0]);
			// container for movies 
			let movContainer = $("<div>").addClass("movie").append(movImage, movTitle, movYear);
			//append into movie results class
			$('.movieResults').append(movContainer);
		}
}

//get book information
booksMovies.getData = () => { // <-- query parameter
	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes",
		method: "GET",
		dataType: "json",
		data: {
			key: booksMovies.Bookkey,
			format: "json",
			// orderBy: "relevance",
			q: 'hunger games' // <-- query parameter
		}
	}).then((res) => { // <-- Then should be based on selected book from list of arrays
		console.log(res);
		var bookTitle = res.items[0].volumeInfo.title;
		var subTitle = res.items[0].volumeInfo.subtitle;
		var authors = res.items[0].volumeInfo.authors[0];
		var categories = res.items[0].volumeInfo.categories[0];
		var description = res.items[0].volumeInfo.description;
		var pageCount = res.items[0].volumeInfo.pageCount;
		var wordTotal = pageCount * 275;
		var bookImage = res.items[0].volumeInfo.imageLinks.thumbnail;
		var bookImageSplit = bookImage.split("&zoom=1");
		var bookImageLarge = bookImageSplit[0];
		console.log(`Book Title is ${bookTitle}`);
		console.log(`Book Subtitle is ${subTitle}`);
		console.log(`Book Author is ${authors}`);
		console.log(`Book category is ${categories}`);
		console.log(`Book description is ${description}`);
		console.log(`Book pageCount is ${pageCount}`);
		console.log(`Book wordTotal is ${wordTotal}`);
		console.log(`Book image is ${bookImage}`);
		console.log(`Book image is ${bookImageLarge}`);

		$('.bookPoster').html(`<img src="${bookImageLarge}">`);
		$('.bookTitle').html(`<h1>${bookTitle}</h1>`); 
		$('.bookAuthor').html(`<p>${authors}</p>`); 
		$('.bookOverview').html(`<h2>Overview</h2><p>${description}</p>`);

		$('.readingVerbiage').html(`${paragraph}`);

	});
};



booksMovies.displayData = function() {
	var userReading = totalTime;
	console.log(totalTime);
	var secondsPerBook = totalTime * booksMovies.getData.wordTotal / 100;
	var bookWords = booksMovies.getData.pageCount * secondsPerPage;

	// var bookWords = booksMovies.getData.pageCount * secondsPerPage;
	var userFreeTime = ($(".freeTimeHours") * 60) + $(".freeTimeMinutes");
	var userResults = (bookWords / 60) / userFreeTime;
	console.log(userReading);
	console.log(secondsPerBook);
	console.log(bookWords);
	console.log(userFreeTime);
	console.log(userResults);
};

booksMovies.events = () => { // <-- Events, ie on click / submit
	$(".movieQuery").on("submit", handleSubmit);
	booksMovies.displayData();

};

booksMovies.init = () => { // <-- INITIALIZING
	booksMovies.events();

	freeTimeTest();
	booksMovies.displayData();

};



$(() => { // <-- DOCUMENT READY
  booksMovies.init();
});


