'use strict';

// Global data, we need to create an array populated with all of the images, which are prospective products.
Product.names = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

// Set up the main array
Product.all = [];
// Set up an array to prevent duplicates.
Product.viewed = [];
// Click counter to 25.
Product.totalClicks = 0;

// Where the product images will be located on the website.
Product.container = document.getElementById('image_container');
Product.pictures = [document.getElementById('left'), 
  document.getElementById('center'), 
  document.getElementById('right')
  ];
Product.list = document.getElementById('productlist');

// Create constructor function for the product images.
function Product(name) {
	this.name = name.slice(0, -4);
	// Tell where to find the image.
	this.path = 'images/' + name;	
	// Need to create something for the single GIF, so it remains a GIF.
	this.votes = 0;
	this.views = 0;
	Product.all.push(this);
}

for (var i = 0; i < Product.names.length; i++) {
	new Product(Product.names[i]);
}

// Our Function Declarations
// Randomize the images.
function makeRandom() {
	return Math.floor(Math.random() * Product.names.length);
}

// Make sure we get 3 random pictures/indexes.
function displayPictures() {
	while (Product.viewed.length < 6) {
		var randomness = makeRandom();
		while (!Product.viewed.includes(randomness)) {
			Product.viewed.push(randomness);
		}
	}
	for (var i = 0; i < 3; i++) {
		var temp = Product.viewed.shift();
		// console.log(Product.all);
		// console.log(Product.viewed);
		Product.pictures[i].src = Product.all[temp].path;
		Product.pictures[i].alt = Product.all[temp].name;
		Product.pictures[i].title = Product.all[temp].name;
		Product.all[temp].views += 1;
	}
}

// Make a function handler that keeps track of the clicks.
function handleClick(event) {
	// Let the user know if they didn't click on an image.
	if (event.target === Product.container) {
		return alert('Be sure to click on an image.');
	}
	// Make sure that we have a way to remove the event listener.
	if (Product.totalClicks > 24) {
		Product.container.removeEventListener('click', handleClick);
		Product.container.style.display = 'none';
		showList();
	}
	Product.totalClicks += 1;
	for (var i = 0; i < Product.names.length; i++) {
		if (event.target.alt === Product.all[i].name) {
			Product.all[i].votes += 1;
			console.log(event.target.alt + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views');
		}
	}
	displayPictures();
}

function showList() {
	for (var i = 0; i < Product.all.length; i++) {
		var liEl = document.createElement('li');
		var conversion = (Product.all[i].votes / Product.all[i].views * 100).toFixed(1);
		liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views, for a click-through conversion rate of ' + conversion + '%';

		if (conversion > 49) {
			liEl.style.color = 'white';
			liEl.style.backgroundColor = "#2E89A7";
		}

		if (conversion < 30) {
			liEl.style.color = 'white';
			liEl.style.backgroundColor = 'red';
		}

		Product.list.appendChild(liEl);
	}
}

displayPictures();
Product.container.addEventListener('click', handleClick);