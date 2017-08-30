const booksMovies = {};

//API keys
booksMovies.movieKey = "b8b83ba71713f763aef645ce0a40da06";
booksMovies.baseUrl = "https://www.googleapis.com/books/v1/volumes";
booksMovies.bookKey = "AIzaSyCzmy3LAli_4J8VGAHaAfdkCL3xC_4iVlE"


const paragraph = "We’re buzzing in our pews, the electricity of raw gossip flitting around us like so many wings. We feed on it, spread it around like a honey that sticks. Our madam archdeacon is at the center of it all, and if the rumors are true, no vestment can hide her guilt from the likes of us. The service is about to start. The organ hums to life, signalling the start of the processional: the venerable queen is about to emerge. Suspicion thickens the air like pollen. Our faces turn towards the narthex, primed to sting. Conditions are favorable for swarming.";


//Get user's movie input
// bookMovies.getUserMovie = () => {
// 	$("form").on("submit", function(e) {
// 		e.preventDefault();
// 		let userMovieChoice = $("input[***the name of the submit button***]").val();
// 		bookMovies.getMovieInfo(userMovieChoice);
// 	});
// }

//Handling submit function
let handleSubmit = (e) => {
	e.preventDefault();
	let userInput = $(".queryInput").val();
	booksMovies.getMovieInfo(userInput);
	console.log(userInput);
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
		console.log(res);
		booksMovies.getData(userMovieChoice);
	})
}


//get book information
booksMovies.getData = (query) => {
	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes",
		method: "GET",
		dataType: "json",
		data: {
			key: booksMovies.Bookkey,
			format: "json",
			q: query
		}
	}).then((res) => {
		console.log(res);
		booksMovies.bookTitle = res.items[0].volumeInfo.title;
		console.log(booksMovies.bookTitle);
	});
};

booksMovies.displayData = () => {
};

booksMovies.events = () => { // <-- Events, ie on click / submit
	$(".movieQuery").on("submit", handleSubmit)
}

booksMovies.init = () => { // <-- INITIALIZING
	console.log ("This works");
	booksMovies.events();
};

$(() => { // <-- DOCUMENT READY
  booksMovies.init();
});
