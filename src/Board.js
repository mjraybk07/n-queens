// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

  */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //


    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.rows()[rowIndex];
      var count = 0;

      for ( var i = 0; i < row.length; i++ ) {
        if ( row[i] === 1 ) {
          count++;
        }
      }
      return count >= 2;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rowsArray = this.rows();

      for ( var i = 0; i < rowsArray.length; i++ ) {
        if ( this.hasRowConflictAt(i) ) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var count = 0;

      var column = board.map(function(row) {
        return row[colIndex];
      });

      for ( var i = 0; i < column.length; i++ ) {
        var value = column[i];
        if ( value === 1 ) {
          count++;
        }
      }
      return count >= 2;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();

      for ( var i = 0; i < board.length; i++ ) {
        if ( this.hasColConflictAt(i) ) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //

    // c - 0  1  2  3
    // r - 0  1  2  3
    // x - 0  0  0  0

    // c - 0  1  2
    // r - 1  2  3
    // x --1 -1 -1

    // c - 1  2  3
    // r - 0  1  2
    // x - 1  1  1

    // c - 2  3
    // r - 0  1
    // x - 2  2

    // c - 0  1
    // r - 2  3
    // x --2 -2


    // set a counter to 0
    // set column index
    // set row index


    // get all the rows
    // iterate through the rows starting at the
    //

    // create an array for the diagonal (TODO)

    // iterate through the diagonal
    //   if element in diagonal is equal to 1
    //     increment counter
    // if counter is greater than 1
    //   return true
    // return false


    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //console.log(majorDiagonalColumnIndexAtFirstRow);
      var board = this.rows();
      var counter = 0;
      var columnIndex = 0;
      var rowIndex = 0;
      var diagonal = [];
      var size = this.attributes.n;
      // var limit = size - this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, columnIndex);

      // Handle negative case --------
      if ( majorDiagonalColumnIndexAtFirstRow < 0 ) {
      // if argument is less than zero
      //   subtract 'arg' from rowIndex
      //   add  'arg' to size
        rowIndex -= majorDiagonalColumnIndexAtFirstRow;
        size += majorDiagonalColumnIndexAtFirstRow;

      // Handle positive case ------
      } else if ( majorDiagonalColumnIndexAtFirstRow > 0 ) {
      // if argument is greater than zero
      //   add 'arg' to the column index
      //   subtract 'arg' from size
        columnIndex += majorDiagonalColumnIndexAtFirstRow;
        size -= majorDiagonalColumnIndexAtFirstRow;
      }


      for ( var i = 0; i < size; i++ ) {
        var value = board[rowIndex][columnIndex];
        diagonal.push(value);
        columnIndex++;
        rowIndex++;
      }

      //console.log(diagonal);
      for ( var i = 0; i < diagonal.length; i++ ) {
        if ( diagonal[i] === 1 ) {
          counter++;
        }
      }
      if ( counter > 1 ) {
        return true;
      }
      return false;
    },

    // var majorDiagonalColumnIndexAtFirstRow = []
    // var allDiagonals = [-3, -2, -1, 0, 1, 2, 3];
    // create size variable set to the length of board
    // create mdc set to empty array
    // iterate from neg size to pos size
    //  push the index to the mjdci
    // generate array of potential diagonals
    // iterate through diagonals array
    //  if call hasMDCAt returns true
    //    return true
    // return false

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var context = this;
      var result = false;
      var size = this.attributes.n;
      var majorDiagonalColumnIndexAtFirstRow = [];

      for ( var i = -size + 1; i < size; i++ ) {
        majorDiagonalColumnIndexAtFirstRow.push(i);
      }

      majorDiagonalColumnIndexAtFirstRow.forEach(function(num) {
        if ( context.hasMajorDiagonalConflictAt(num) ) {
          result = true;
        }
      });
      return result;
    },



    // Minor Diagonals - go from top-rig  ht to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

// ----------------- TESTS -----------------
console.log('TEST ---------- TEST');

//  -- test for row conflicts --

var testBoard = new Board({n: 5});
var inputD = testBoard.hasAnyRowConflicts();
//console.log('testBoard.hasAnyRowConflicts()....', inputD); // false
testBoard.togglePiece(0, 1);
var inputA = testBoard.hasRowConflictAt(0);
var inputB = testBoard.hasRowConflictAt(1);
var inputC = testBoard.hasAnyRowConflicts();
// console.log('testBoard.hasRowConflictAt(0)....', inputA); // True
// console.log('testBoard.hasRowConflictAt(1)....', inputB); // False
// console.log('testBoard.hasAnyRowConflicts()....', inputC); // true


// -- tests for column conflicts --

var newBoard = new Board({n: 5});
newBoard.togglePiece(0, 1);
newBoard.togglePiece(1, 1);
//console.log('newBoard', newBoard.rows());
var input1 = newBoard.hasColConflictAt(0); // false
var input2 = newBoard.hasColConflictAt(1); // true
var input3 = newBoard.hasColConflictAt(2); // false
// console.log('hasColConflictAt', input1);
// console.log('hasColConflictAt', input2);
// console.log('hasColConflictAt', input3);
// console.log('hasAnyRowConflicts', newBoard.hasAnyRowConflicts());

//   -- tests for major diagonal at
var majDiagBoard = new Board ({n: 4});
console.log(majDiagBoard);
// majDiagBoard.togglePiece(1, 0);
// majDiagBoard.togglePiece(2, 1);
majDiagBoard.togglePiece(1, 0);
majDiagBoard.togglePiece(2, 1);
console.log(majDiagBoard.rows());
//var gfrcimd = majDiagBoard._getFirstRowColumnIndexForMajorDiagonalOn(0, 1);
//console.log(gfrcimd);
// var test = majDiagBoard.hasMajorDiagonalConflictAt(-1); // true
// console.log('this is the test', test);
var test = majDiagBoard.hasAnyMajorDiagonalConflicts();
console.log('this is a test', test);

