const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const reset = document.getElementById('reset');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// populateUI();

// Save selected movie index and price for local storage
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count of seats
function updateSelectedCount() {
	// Selected Seats
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	console.log('selectedSeats arr ' + selectedSeats.length);
	console.log('selectedSeats ' + selectedSeats);

	// Copy selected seats into new array
	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	// Count total selected seats
	const selectedSeatsCounts = selectedSeats.length;

	// Display (update) the selected seats
	count.innerText = selectedSeatsCounts;
	total.innerText = selectedSeatsCounts * ticketPrice;
}

// Get data from local storage
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	console.log('Selected seats: ' + selectedSeats);

	// Get all selected seats from storage
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			// console.log(selectedSeats.indexOf(index));
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}
	// Select the Index of the array
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
		console.log('movieSelect.selectedIndex' + movieSelect.selectedIndex);
		// console.log('Selectedmovie index' + selectedMovieIndex);
	}
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;

	setMovieData(e.target.selectedIndex, e.target.value);

	updateSelectedCount();
});

// Seat clicked event
container.addEventListener('click', (e) => {
	// Clicked available seats
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
});

// initial count and total set
updateSelectedCount();
