
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
	{locations : ["01","11","21"], hits : ["","",""]},
	{locations : ["36","46","56"], hits : ["","",""]},
	{locations : ["43","33","53"], hits : ["","",""]
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
	}

};

controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");
controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");
controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");
