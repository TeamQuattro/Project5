const booksMovies = {};

//API keys
booksMovies.movieKey = "b8b83ba71713f763aef645ce0a40da06";
booksMovies.baseUrl = "https://www.googleapis.com/books/v1/volumes";
booksMovies.bookKey = "AIzaSyCzmy3LAli_4J8VGAHaAfdkCL3xC_4iVlE"


const paragraph = "We liked to mash up the entire box of Junior Mints into one big ball. Make it into the Death Star and eat it like Jedi Knights. We tied Red Vines together till we could climb out of our lives and into the white light of heaven. Our shoes stuck to the floor like fly paper; the buzz of people waiting for the lights to dim. Would hide in the bathroom so we could watch again. Stale scent of history burned at the edges of our existence. Memory of car chases and falling in love. We always wanted a refill.";

// $("#go1").click(function (e) {
//     goToByScroll("movieInfo");
//     e.preventDefault();
// });

function goToByScroll(id) {
	let toMe = $("." + id)
	$("html,body").delay(600).animate({ scrollTop: toMe.offset().top }, 1100);
	toMe.addClass("hightlightResult");
	setTimeout(function () {
		toMe.removeClass("hightlightResult", 1500);
	}, 500);
}

// Stopwatch courtesy of Cathy Dutton 
// https://codepen.io/cathydutton/pen/GBcvo

window.onload = function () {
  
	let seconds = 0; 
	let tens = 0; 
	let appendTens = document.getElementById("tens");
	let appendSeconds = document.getElementById("seconds");
	let buttonStart = document.getElementById("button-start");
	let buttonStop = document.getElementById("button-stop");
	let buttonReset = document.getElementById("button-reset");
	let Interval ;

	buttonStart.onclick = function() {
		clearInterval(Interval);
		Interval = setInterval(startTimer, 10);
	}
  
	buttonStop.onclick = function() {
		clearInterval(Interval);
		let totalTime = seconds;
		window.booksMovies.totalTime = totalTime;
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

// DONE CHECKING UP TO THIS POINT

//Handling submit function
let handleSubmit = (e) => {
	e.preventDefault();
	$(".movieResults").empty();
	$(".movieInfo").removeClass("hidden");
	goToByScroll("movieInfo");
	let userInput = $(".queryInput").val();
	booksMovies.getMovieInfo(userInput);

}

// Gets users free time submission
let freeTimeTest = () => {
	$(".freeTimeInput").on("submit", (e) => {
		e.preventDefault();
		$(".results").removeClass("hidden");
		goToByScroll("results");
		$(".emptyResults").empty();
		booksMovies.displayData(booksMovies.totalTime);

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
	})
	.then((res) => {
		let movieResults = res.results;
		booksMovies.displayMovieInfo(movieResults);
	});
	// .fail((err) => {
	// 	// let noImg = "Sorry, no image found";
	// 	if(err.poster_path === "https://image.tmdb.org/t/p/w500null") {
	// 		console.log("hello");
	// 	}
	// });
}

// display movie information onto page
booksMovies.displayMovieInfo = (movieResults) => {

		// $().empty();

		// console.log(movieResults);

		
		for (let i = 0; i < 4; i++) {
			// 	movie backdrop path
			let movBg = `https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movieResults[i].backdrop_path}`;
			// movie poster
			let movImage = $("<img>").attr("src", `https://image.tmdb.org/t/p/w500${movieResults[i].poster_path}`).attr("alt", `${movieResults[i].title} poster image`);
			//movie title <h2> and adding to page
			let movTitle = $("<h2>").text(movieResults[i].title);
			//movie year
			let movYear = movieResults[i].release_date.split("-");
			movYear = $("<h3>").text(movYear[0]);

			//select movie button
			let movSelect = $("<button>").addClass("movieSelect").text("select");

			// container for movies 
			let movContainer = $("<div>").addClass("movie wow fadeInLeft").attr('data-movieBg', movBg).append(movImage, movTitle, movYear, movSelect);
			// .attr('data', 'wideimage')

			//append into movie results class
			$('.movieResults').append(movContainer);
			// $('.bookInfo').css("background", `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url(${movBg})`).css("background-size", `contain`);  

		}

		$('.movieResults').on("click", ".movieSelect", function() {
			// debugger;
			// console.log(this);
			// console.log($(this).siblings());

			//find the parent with a class of movie and grab the data atrribute


			$(".bookInfo").removeClass("hidden");
			$(".stepOneStopwatch").removeClass("hidden");
			$(".freeTimeQuery").removeClass("hidden");
			goToByScroll("bookInfo");
			let selectedMovie = ($(this).siblings('h2').text());
			booksMovies.getData(selectedMovie);

			// $('.bookInfo').css("background-image", `url(${movBg})`);  
		});

		$('.movieResults').on("click", ".movie", function() {
			let bgMovie = $(this);
			// console.log(bgMovie);
			let movieBG = bgMovie.data('moviebg');
			// console.log(movieBG); 
			$('.bookInfo').css("background", `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${movieBG})`).css("background-size", `cover`).css("background-position", `center center`);  
			// $('.bookInfo').css("background-image", `url(${movieBG})`);  
		});

}

//get book information
booksMovies.getData = (query) => { // <-- query parameter
	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes",
		method: "GET",
		dataType: "json",
		data: {
			key: booksMovies.Bookkey,
			format: "json",
			// orderBy: "relevance",
			q: query // <-- query parameter
		}
	}).then((res) => { // <-- Then should be based on selected book from list of arrays
		console.log(res);
		let bookTitle = res.items[0].volumeInfo.title;
		let subTitle = res.items[0].volumeInfo.subtitle;
		let authors = res.items[0].volumeInfo.authors[0];
		let categories = res.items[0].volumeInfo.categories[0];
		let description = res.items[0].volumeInfo.description;
		let pageCount = res.items[0].volumeInfo.pageCount;
		let wordTotal = pageCount * 275;
		let bookImage = res.items[0].volumeInfo.imageLinks.thumbnail;
		let bookImageSplit = bookImage.split("&zoom=1");
		let bookImageLarge = bookImageSplit[0];
		console.log(`Book Title is ${bookTitle}`);
		console.log(`Book Subtitle is ${subTitle}`);
		console.log(`Book Author is ${authors}`);
		console.log(`Book category is ${categories}`);
		console.log(`Book description is ${description}`);
		console.log(`Book pageCount is ${pageCount}`);
		console.log(`Book wordTotal is ${wordTotal}`);
		booksMovies.wordTotal = wordTotal;
		console.log(`Book image is ${bookImage}`);
		console.log(`Book image is ${bookImageLarge}`);

		$('.bookPoster').html(`<img src="${bookImageLarge}">`);
		$('.bookTitle').html(`<h1>${bookTitle}</h1>`); 
		$('.bookAuthor').html(`<p>${authors}</p>`); 
		$('.bookOverview').html(`<h2>Overview</h2><p>${description}</p>`);

		$('.readingVerbiage').html(`<p>${paragraph}<p>`);
		$("#bookTitleResults").append(`${bookTitle}`);

	});
};



booksMovies.displayData = function(totalTime) {
	let secondsPerBook = totalTime * booksMovies.wordTotal / 100;
	$( ".userSecondsPerBook" ).append( secondsPerBook )
	// This if statement is to tell the app that if the user does not put a value into the input to set it to 0
	let freeTimeHours = $(".freeTimeHours").val();
	let freeTimeMinutes = $(".freeTimeMinutes").val();
	if(freeTimeHours == "") {
		freeTimeHours = 0;
	};
	if(freeTimeMinutes == "") {
		freeTimeMinutes = 0;
	};
	let wpm = ((100 / totalTime) * 60).toFixed(0);
	console.log("wpm", wpm)
	$( ".userReadingSpeed" ).append( wpm );
	// This is telling the app to multiply the freeTimeHours by 60 to get hours to minutes
	let userFreeTime = parseInt(freeTimeHours * 60) + parseInt(freeTimeMinutes);
	let userResults = ((secondsPerBook / 60) / userFreeTime).toFixed(0);
	$( ".userDaysToRead" ).append( userResults );
	console.log(secondsPerBook);
	console.log(userFreeTime);
	console.log(userResults);
};

booksMovies.events = () => { // <-- Events, ie on click / submit
	$(".movieQuery").on("submit", handleSubmit);
	// booksMovies.displayData();

};

booksMovies.init = () => { // <-- INITIALIZING
	booksMovies.events();
	freeTimeTest();
};



$(() => { // <-- DOCUMENT READY
  booksMovies.init();
});