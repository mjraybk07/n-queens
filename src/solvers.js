/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// i: number
// o: solution: a single matrix
// constraint: board size and # of rooks both equal to n


// initialize a board variable
// set solution variable to undefined

// recursive case: recurse

// define and inner recursive function

//   get row

//    loop over row
//      toggle piece
//      check for rook conflicts
//      if conflict is found
//        untoggle the piece

//      if no conflict is found
//        call findNRooksSolution on the next row

// call inner rersive function

// if hasAnyRooksConflicts is false
//  set solution to current board
// return solution


window.findNRooksSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});
  var found = false;

  if ( n === 1 || n === 2 || n === 3 ) {
    return solution;
  }

  var solver = function (row) {

    // base case
    if ( row === n && found === false ) {
      found = true;
      solution = board.rows();
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if ( !board.hasAnyRooksConflicts() ) {
        solver(row + 1);
      }
      board.togglePiece(row, i);
    }

  };

  solver(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// -- TESTS --

console.log('-- TESTS --');

var input = findNRooksSolution(4);
console.log(input);

console.log('-- TESTS --');
