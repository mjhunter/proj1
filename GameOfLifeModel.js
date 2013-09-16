// This file implements a representation of Dan Conway's Game of Life
// The board is composed of a n by n array of Squares, each of which are either "alive" or "dead"

// Square is a class that holds a coordinate and can be changed between being "alive" and dead"
Square = function(x,y) {
	var position = new Array(x,y);
	var state = "dead";
	var nextState = "dead";
	return {
		kill: function () { nextState = "dead"; },
		revive: function () { nextState = "alive"; },
		update: function () { state = nextState; },
		getState: function () { return state; },
		getPosition: function () { return position; },
	}
}

// Board is a class that holds a n by n array of Squares.  
// To create a new Board, call b = Board(n) and then initialize it by calling 
// b.setInitialBoardState(c), where c is an array that contains all coordinates that will
// be initialized as "alive.  Each element in c is of the form [x,y]
Board = function(size) {
	var squares = [];
    
	// fill the empty board with newly created Squares
	for (var i = 0; i < size; i++)
	{
		var row = [];
		for (var j = 0; j < size; j++)
		{
			row.push(new Square(i, j));        
		}
		squares.push(row);
	}
    
	return {
		// this method allows a user to set a board's initial state coordinates 
		// is an array of coordinates that will be initially set to alive.  
		// elements are of the form [x,y]
		setInitialBoardState: function (coordinates) {
			for (var i = 0; i < coordinates.length; i++)
			{
				var x = coordinates[i][0];
				var y = coordinates[i][1];
				squares[x][y].revive();
				squares[x][y].update();
			}
		},
        
		// determines the next state for each square and sets it
		updateBoard: function () {
			// determines the next state for each square
			for (var i = 0; i < size; i++)
			{
				for (var j = 0; j < size; j++)
				{
					// this code snippet gets the number of live neighbors of the square
					var numLiveNeighbors = 0;            
					for (var x = -1; x <= 1; x++)
					{
						for (var y = -1; y <= 1; y++)
						{
							// don't count the original square or attempt to go outside the bounds of the array
							if (!(x == 0 && y == 0) && i + x >= 0 && i + x <= size - 1 && j + y >= 0 && j + y <= size - 1)
							{
								if (squares[i + x][j + y].getState() === "alive")
								{
									numLiveNeighbors++;
								}
							}
                
						}
					}
					if (squares[i][j].getState() === "alive")
					{
						if (numLiveNeighbors < 2 || numLiveNeighbors >= 4)
						{
							squares[i][j].kill();
						}
					}
					else if (squares[i][j].getState() === "dead")
					{
						if (numLiveNeighbors === 3)
						{
							squares[i][j].revive();   
						}
					}
				}
			}
            
			// after nextState is determined, update them all
			for (var i = 0; i < size; i++)
			{
				for (var j = 0; j < size; j++)
				{
					squares[i][j].update();                    
				}
			}
		},

		getSquares: function () {
            		return squares;
        	},  
	}
}