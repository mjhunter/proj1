// this file tests all of the features in GameOfLifeModel.js

// tests that QUint is working
test ( "QUint Test", function() {
	var result = 1 === 1;
	ok( result, result ? "Passed!" : "Failed!" );
});

// tests that the square's position and initial state are correct
test ( "Square Creation Test", function() {
	var s = Square(1,2);

	var result1 = s.getPosition()[0] === 1 && s.getPosition()[1] === 2;
	var result2 = s.getState() === "dead";
	ok( result1, result1 ? "Passed!" : s.getPosition() + " != " + "[1,2]" );
	ok( result2, result2 ? "Passed!" : "Failed!" );
});

// checks that the square updates correctly
test ( "Square Update Test I", function() {
	var s = Square(1,2);

	s.revive();
	s.update();
	var result1 = s.getState() === "alive";
	ok( result1, result1 ? "Passed!" : "Expected: alive --- Actual: " + s.getState() );

	s.kill();
	s.update();
	var result2 = s.getState() === "dead";
	ok( result2, result2 ? "Passed!" : "Expected: dead --- Actual: " + s.getState() );
});

// tests that the board is initialized correctly
test ( "Board Creation Test", function() {
	var b = Board(10);
	var expectedS1 = Square(1,2);
	var actualS1 = b.getSquares()[1][2];
	var result1 = expectedS1.getState() === actualS1.getState() 
		&& expectedS1.getPosition[0] === actualS1.getPosition[0]
		&& expectedS1.getPosition[1] === actualS1.getPosition[1];
	ok ( result1, result1 ? "Passed!" : "Expected: " + expectedS1 + " --- Actual: " + actualS1 );
	
	var expectedS2 = Square(9,9);
	var actualS2 = b.getSquares()[9][9];
	var result2 = expectedS2.getState() === actualS2.getState() 
		&& expectedS2.getPosition[0] === actualS2.getPosition[0]
		&& expectedS2.getPosition[1] === actualS2.getPosition[1];
	ok ( result2, result2 ? "Passed!" : "Expected: " + expectedS2 + " --- Actual: " + actualS2 );
});

// tests that the squares in the board can be changed and will update correctly
test ( "Board Square Manipulation Test", function() {
	var b = Board(10);
	b.getSquares()[4][5].revive();
	b.getSquares()[4][5].update();
	var result = b.getSquares()[4][5].getState() === "alive";
	ok (result, result ? "Passed!" : "Expected: alive --- Actual: " + b.getSquares[4][5].getState());
});

// tests that the board's setInitialBoardState function works correctly
test ( "Board Initial State Test", function() {
	var b = Board(10);
	var coordinates = [[2,2], [3,2], [4,2], [1,3], [2,3], [3,3]];
	b.setInitialBoardState(coordinates);
	for (var i = 0; i < coordinates.length; i++)
	{
		var x = coordinates[i][0];
		var y = coordinates[i][1];
		var result = b.getSquares()[x][y].getState() === "alive";
		ok (result, result ? "Passed!" : "Expected: alive --- Actual: " + b.getSquares[x][y].getState());
	}

	var result = b.getSquares()[0][0].getState() === "dead";
	ok ( result, result ? "Passed!" : "Expected: dead --- Actual: " + b.getSquares()[0][0].getState());	
});

// tests that Board's updateBoard function works correctly
test ( "Board Update Test", function() {
	var b = Board(10);
	var beforeCoordinates = [[2,2], [3,2], [4,2], [1,3], [2,3], [3,3]];
	var afterCoordinates = [[1,2], [1,3], [2,4], [3,1], [4,2], [4,3]];
	b.setInitialBoardState(beforeCoordinates);
	b.updateBoard();
	
	var result = true;
	var numIncorrect = 0;
	var errorMessage = "";
	for (var i = 0; i < afterCoordinates.length; i++)
	{
		var x = afterCoordinates[i][0];
		var y = afterCoordinates[i][1];
		currentSquare = b.getSquares()[x][y];
		result = result && currentSquare.getState() === "alive";

		if (!result)
		{
			numIncorrect++;
			errorMessage = "Square at " + x + "," + y + ": " + "Expected: alive --- Actual: " + currentSquare.getState() + " --- Num Incorrect: " + numIncorrect;
		}
	}

	ok (result, result ? "Passed!" : errorMessage);

	b.updateBoard();
	
	numIncorrect = 0;
	result = true;
	for (var i = 0; i < beforeCoordinates.length; i++)
	{
		var x = beforeCoordinates[i][0];
		var y = beforeCoordinates[i][1];
		currentSquare = b.getSquares()[x][y];
		result = result && currentSquare.getState() === "alive";

		if (!result)
		{
			numIncorrect++;
			errorMessage = "Square at " + x + "," + y + ": " + "Expected: alive --- Actual: " + currentSquare.getState() + " --- Num Incorrect: " + numIncorrect;
		}
	}

	ok (result, result ? "Passed!" : errorMessage);
});