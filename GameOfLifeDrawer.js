// This file creates an instance of Board from GameOfLifeModel and draws it on the screen 

// define some colors
var black = Color(0,0,0);
var red = Color(255,0,0);
var green = Color(0,255,0);
var blue = Color(0,0,255);
   
// create the drawing pad object and associate with the canvas
pad = Pad(document.getElementById('canvas'));
pad.clear();
    
var BOARD_SIZE = 9;

// set constants to be able to scale to any canvas size
var MAX_X = 100;
var MAX_Y = 100;
var RADIUS = 5;
var LINE_WIDTH = 2;
var x_factor = 10 * pad.get_width() / MAX_X;
var y_factor = 10 * pad.get_height() / MAX_Y;

// these loops determine which squares will be initialized as being "alive" - 50% probability
initialCoordinates = [];
for (var i = 0; i < BOARD_SIZE; i++)
{
	for (var j = 0; j < BOARD_SIZE; j++)
	{
		if (Math.random() < 0.50)
		{
			initialCoordinates.push([i, j]);
		}
	}
}

// initialize the Board
var b = Board(BOARD_SIZE);
b.setInitialBoardState(initialCoordinates);

// this function draws each square from the board and then updates the board
updateGUI = function () {
	pad.clear();
	
	// draw a box
	pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 10, black);

	for (var i = 0; i < BOARD_SIZE; i++)
	{
		for (var j = 0; j < BOARD_SIZE; j++)
		{
			if (b.getSquares()[i][j].getState() === 'alive') 
			{
				pad.draw_circle(Coord((i+1)*x_factor, (j+1)*y_factor),
					RADIUS, LINE_WIDTH, green, green);
			} 
			else 
			{
				pad.draw_rectangle(Coord((i+1)*x_factor-RADIUS, (j+1)*y_factor-RADIUS),
					RADIUS*2, RADIUS*2, LINE_WIDTH, red);
			}
		}
	}
	
	b.updateBoard(); 
};

// update the screen every 500 ms
setInterval(updateGUI, 500);