
var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	},

  getId : function (loc) {
  var cell = document.getElementById(loc)
  console.log(cell);
  }
};

var model = {

shipLength : 3,
numOfShips : 3,
boardSize : 7,
numOfShipsSunk : 0,

ships : [
	{locations : ["0","0","0"], hits : ["","",""]},
	{locations : ["0","0","0"], hits : ["","",""]},
	{locations : ["0","0","0"], hits : ["","",""]
}],

fire: function (guess) {
	for (var i = 0; i < this.numOfShips; i++) {
		var ship = this.ships[i];
		var index = ship.locations.indexOf(guess);
		if (index >= 0) {
			ship.hits[index] = "hit";
			view.displayHit(guess);
			view.displayMessage("HIT!")
			if(this.isSunk(ship)){
				view.displayMessage("You SUNK my ship!!!");
				this.numOfShipsSunk++;
			}

			return true;
		}
	}
	console.log("missed");
	view.displayMiss(guess);
	view.displayMessage("Hahaha You MISSED!")
	return false;
},

isSunk : function (ship) {
	for (var i = 0; i < this.numOfShips; i++) {
			if (ship.hits[i] !== "hit") {
				return false
			}
	}
	return true;
},

generateShipLocation : function ()
{
	var locations;
	for (var i = 0; i < this.numOfShips; i++) {
	do {
		locations = this.generateShip();

	} while (this.collisionDetection(locations));
		this.ships[i].locations = locations;
	}
},

generateShip : function ()
{
	var direction = Math.floor(Math.random() * 2);
	var row, col;

	if (direction === 1) {
		row = Math.floor(Math.random() * this.boardSize);
		col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
	}
	else {
		col = Math.floor(Math.random() * this.boardSize);
		row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
	}
	var newShipLocation = [];
	for (var i = 0; i < this.shipLength; i++) {
		if (direction === 1) {
			newShipLocation.push(row + '' + (col + i));
		}
		else {
			newShipLocation.push(col + '' + (row + i));
		}
	}
		return newShipLocation;
},

collisionDetection : function (location)
{
	for (var i = 0; i < this.shipLength; i++) {
		var ship = this.ships[i];
		for (var j = 0; j < location.length; j++) {
			if (ship.locations.indexOf(location[j]) >= 0) {
				return true;
			}
		}
	}
	return false;
}

};


var controller = {
	guesses : 0,

	parseGuess : function (guess){

		var alphabet = ["A","B","C","D","E","F","G"];

		if (guess.length !== 2 || guess === null) {
			view.displayMessage("OOps please input a character then a number");
		}
		var location = guess.charAt(0);
		var row = alphabet.indexOf(location);
		var column = guess.charAt(1);
		if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			view.displayMessage("OOps seems like u went off the border");
		}
		else if (isNaN(row) || isNaN(column)) {
			view.displayMessage("OOps first character then column number");
		}
		else {
			return row + column;
		}
		return null;
	},

	processGuess : function (guess) {
		var location = this.parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.numOfShipsSunk === model.numOfShips) {
				view.displayMessage("You sunk all the ships in " + this.guesses + " guesses");
			}
		}
	},

};

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");

	e = e || window.event;
	if (e.keycode === 13) {
		fireButton.click();
		return false;
	}
}

function handleFireButton() {
var guessinput = document.getElementById('guessInput');
var guess = guessinput.value.toUpperCase();
controller.processGuess(guess);

guessinput.value = "";
}

function init() {
var fireButton = document.getElementById("fireButton");
fireButton.onclick = handleFireButton;

var guessInput = document.getElementById("guessInput");
guessInput.onkeypress = handleKeyPress;

model.generateShipLocation();
}


window.onload = init;
