/******Constants and DOM references******/

let boardPositions
let container = document.getElementById("container")
let game = document.getElementById("game")
let messageShow = document.getElementById("checkWinBox")
let reset = document.getElementById("reset")
let removeGame = document.getElementById("removeGame")
let englishBoardButton = document.getElementById("englishBoard")
let frenchBoardButton = document.getElementById("frenchBoard")
let diamondBoardButton = document.getElementById("diamondBoard")
let asymmetricBoardButton = document.getElementById("asymmetricBoard")
let allRows = document.getElementsByClassName("boardRow")
let typeGame = document.getElementById("typeGame")

const englishBoard = [
  [null, null, "fill",  "fill", "fill", null,  null], 
  [null, null, "fill",  "fill", "fill", null,  null], 
  ["fill","fill","fill","fill","fill","fill","fill"],
  ["fill","fill","fill",  0 , "fill","fill", "fill"], 
  ["fill","fill","fill","fill","fill","fill","fill"], 
  [null, null, "fill", "fill", "fill", null,   null], 
  [null, null, "fill", "fill", "fill", null,   null]
]


const frenchBoard = [
  
  [null,    null,   0,  "fill",   "fill", null,  null], 
  [null, "fill", "fill",  "fill", "fill","fill", null], 
  ["fill","fill","fill","fill","fill","fill",  "fill"],
  ["fill","fill","fill","fill", "fill","fill", "fill"], 
  ["fill","fill","fill","fill","fill","fill",  "fill"], 
  [null, "fill", "fill", "fill", "fill","fill",  null], 
  [null, null, "fill", "fill", "fill",    null,  null]

]

const diamondBoard = [

  [null,  null,  null, null,   "fill", null,     null, null,  null], 
  [null,  null,  null, "fill", "fill", "fill",  null,  null,  null], 
  [null,null,"fill", "fill", "fill", "fill","fill",   null,   null], 
  [null,"fill","fill", "fill", "fill", "fill","fill", "fill", null], 
  ["fill","fill","fill", "fill", 0 , "fill","fill", "fill", "fill"], 
  [null,"fill","fill", "fill", "fill", "fill","fill", "fill", null],
  [null,null,"fill", "fill", "fill", "fill","fill",   null,   null],
  [null,  null,  null, "fill", "fill", "fill",  null,  null,  null],
  [null,  null,  null, null,   "fill", null,     null, null,  null]

]

const asymmetricBoard = [

  [null,  null,  "fill", "fill",   "fill", null, null, null], 
  [null,  null,  "fill", "fill",   "fill", null, null, null], 
  [null,  null,  "fill", "fill",   "fill", null, null, null], 
  ["fill","fill","fill", "fill", "fill","fill","fill", "fill"], 
  ["fill","fill","fill", 0, "fill" , "fill","fill", "fill"], 
  ["fill","fill","fill", "fill", "fill","fill","fill", "fill"],
  [null,  null,  "fill", "fill",   "fill", null, null, null],
  [null,  null,  "fill", "fill",   "fill", null, null, null]

]




/**********BUTTONS*********/

//Restart Button
reset.onclick = function() {
 
  clearAllSelections()
  resetGame ()
  let numberPieces = document.getElementsByClassName("occupiedPosition")
  messageShow.innerHTML = `${numberPieces.length}` 
  
}



// Change Boards
englishBoardButton.onclick = function() {
    if (typeGame.innerHTML === "Inglês"){
     return
  }
  removeTheGame()
  createGame(englishBoard)
  typeGame.innerHTML = "Inglês"
  game.classList.add("englishGame")
  //game.style.width = "350px"
  //game.style.height = "350px"
  startEvents()
}


frenchBoardButton.onclick = function() {
  if (typeGame.innerHTML === "Francês"){
    return
  }
  removeTheGame()
  createGame(frenchBoard)
  typeGame.innerHTML = "Francês"
  game.classList.add("frenchGame")
 // game.style.width = "350px"
 // game.style.height = "350px"
  startEvents()
}

diamondBoardButton.onclick = function() {
  if (typeGame.innerHTML === "Diamante"){
    return
  }
  removeTheGame()
  createGame(diamondBoard)
  typeGame.innerHTML = "Diamante"
  game.classList.add("diamondGame")
  //game.style.width = "450px"
  //game.style.height = "450px"
  startEvents()
}

asymmetricBoardButton.onclick = function() {
  if (typeGame.innerHTML === "Assimétrico"){
    return
  }
  removeTheGame()
  createGame(asymmetricBoard)
  typeGame.innerHTML = "Assimétrico"
  game.classList.add("asymmetricGame")
  //game.style.width = "400px"
  //game.style.height = "400px"
  startEvents()
}



// Function to create and start a game
function startGame(board) {
  createGame(board);

  startEvents()
}



//Create the Game
function createGame(board) {


  //Create rows in the game
  for (let i = 0; i < board.length; i++) {
    let rows = document.createElement("div")
    rows.className = "boardRow"


    //Create div that contains each piece and append the piece
    for (let j = 0; j < board[i].length; j++) {
      let piecePosition = board[i][j]
      let piecePositionDiv = document.createElement("div")
      piecePositionDiv.className = "pieceContainer"


      if (piecePosition === null) {
        piecePositionDiv.appendChild( createPiece("nullPiece", i, j) )
      }
      else if (piecePosition === "fill") {
        piecePositionDiv.appendChild( createPiece("occupiedPosition", i, j) )
      }
      else {
        piecePositionDiv.appendChild( createPiece("emptyPiece zeroPosition", i, j) )
      }
      
      rows.appendChild(piecePositionDiv)
    }
    // Insert rows in game
    game.appendChild(rows)
  }

  boardPositions = document.getElementsByClassName("piece")
  let count = countPieces()
    messageShow.innerHTML = `${count}`
}


// Create the pieces
function createPiece (type, i, j) {
  let div = document.createElement("div");
  div.className = `${type} piece`;
  div["data-row"] = i
  div["data-column"] = j

  return div;
}


// Count the Pieces
function countPieces () {
   let count = 0
   for (let i = 0; i < boardPositions.length; i++) {
     if ( boardPositions[i].className.indexOf("occupiedPosition") > -1){
          count ++
      }
    }
    return count
}


// Onclick events 
function startEvents() {
  for (let i = 0; i < boardPositions.length; i++ ) {

    boardPositions[i].onclick = function() {
      let classOfSelectedPosition = boardPositions[i].className

      if (classOfSelectedPosition.indexOf("occupiedPosition") > -1 ) {
        clearAllSelections()
        
        if(classOfSelectedPosition.indexOf("selected") < 0) {
          boardPositions[i].classList.add("selected")
          highlightValidJumps(boardPositions[i]);
        }
      }
      else if (classOfSelectedPosition.indexOf("emptyPiece") > -1 &&
               classOfSelectedPosition.indexOf("validJump") > -1)  {
               executeJump(boardPositions[i])
               clearAllSelections()
        }         
     }
  }
}

//Clear borders and different color
function clearAllSelections() {

  for (let i = 0; i < boardPositions.length; i++) {
    boardPositions[i].classList.remove("selected", "validJump")
  }
}


function highlightValidJumps(startPosition) {

  for (let i = 0; i < boardPositions.length; i++ ) {
    if (jumpIsValid(startPosition, boardPositions[i])) {
      boardPositions[i].classList.add("validJump") 

    }
  }
}

// Check if the jump is valid
function jumpIsValid(startPosition, finalPosition) {

  return !((finalPosition.className.indexOf("emptyPiece") < 0) || //Check if Empty

        //Check if in same column or row
        (!(startPosition["data-row"] === finalPosition["data-row"] || 
        startPosition["data-column"] === finalPosition["data-column"])) ||

        //Check if distance between start and final position is 2
        (Math.abs(startPosition["data-row"] - finalPosition["data-row"]) !== 2 && 
        Math.abs(startPosition["data-column"] - finalPosition["data-column"]) !== 2) ||

       //Check if there is a piece in between
        (getPieceInMiddle(startPosition, finalPosition).className.indexOf("occupiedPosition") < 0)
    )
}


//Execute the Jump
function executeJump (finalPosition) {
  let selectedPiece
  for (let i = 0; i < boardPositions.length; i++) {
    //Find the selected Piece
    if (boardPositions[i].className.indexOf("selected") > -1) {
      selectedPiece = boardPositions[i];
      break;
    }
  }


 //Remove the piece at start position
  selectedPiece.classList.remove("selected", "occupiedPosition")
  selectedPiece.classList.add("emptyPiece")


  //Add piece to final position
  finalPosition.classList.remove("validJump", "emptyPiece")
  finalPosition.classList.add("occupiedPosition")

 //Remove piece in between
   let pieceInMiddle = getPieceInMiddle(selectedPiece, finalPosition)

   pieceInMiddle.classList.remove("occupiedPosition")
   pieceInMiddle.classList.add("emptyPiece")

  //Count Pieces
   let count = countPieces()
   messageShow.innerHTML = `${count}`
    
  //Victory
  if (count === 1) {
    messageShow.innerHTML = "Você Venceu!!!"
  }

  //Defeat
  else if (!checkIfCanWin()) {
    for (let i = 0; i < boardPositions.length; i++ ) {
      if (boardPositions[i].className.indexOf("occupiedPosition") > -1)  {
            boardPositions[i].classList.remove("occupiedPosition")
            boardPositions[i].classList.add("youLostPosition")
            
      }
       messageShow.innerHTML = "Tente Novamente."
  }
}
}

//Check if It's possible to win
function checkIfCanWin() {
  
  for (let i = 0; i < boardPositions.length; i++) {
    for (let j = 0; j < boardPositions.length; j++ ) {
      if (boardPositions[i].className.indexOf("occupiedPosition") > -1 && jumpIsValid(boardPositions[i], boardPositions[j])) {
        return true;
      }
    }
  }
  return false;
}

//Piece between start and final positions
function getPieceInMiddle (startPosition, finalPosition) {
  let rowMiddle 
  let colMiddle
  let pieceInMiddle
  
  if (startPosition["data-row"] === finalPosition["data-row"]) {
    rowMiddle = startPosition["data-row"]
    colMiddle = (startPosition["data-column"] > finalPosition["data-column"] ? 
    startPosition["data-column"] - 1 : finalPosition["data-column"] - 1)
  } 
  else {
    colMiddle = startPosition["data-column"];
    rowMiddle = (startPosition["data-row"] > finalPosition["data-row"] ? 
    startPosition["data-row"] - 1 : finalPosition["data-row"] - 1)
  }

  for (let i = 0; i < boardPositions.length; i++) {
    pieceInMiddle = boardPositions[i];
    if (pieceInMiddle["data-row"] === rowMiddle && 
        pieceInMiddle["data-column"] === colMiddle) {
      return pieceInMiddle;
    }
  }
}


// Function used to restart the game
function resetGame () {
  for (let i = 0; i < boardPositions.length; i++ ) {
    if ((boardPositions[i].className.indexOf("emptyPiece") > -1 ) &&
        boardPositions[i].className.indexOf("zeroPosition") < 0) {
          boardPositions[i].classList.remove("emptyPiece")
          boardPositions[i].classList.add("occupiedPosition")
    }
    else if (boardPositions[i].className.indexOf("zeroPosition") > -1) {
       boardPositions[i].classList.remove("occupiedPosition")
       boardPositions[i].classList.remove("youLostPosition")
       boardPositions[i].classList.add("emptyPiece")
    }
    else if ((boardPositions[i].className.indexOf("youLostPosition") > -1 ) &&
    boardPositions[i].className.indexOf("zeroPosition") < 0) {
      boardPositions[i].classList.remove("youLostPosition")
      boardPositions[i].classList.add("occupiedPosition")
}
             
  }    
}



// Function used to change gameboards
function removeTheGame () {
  
  let m = allRows.length  
  for (let i = 0; i < m;  i++ ){
    game.removeChild(allRows[0])
  }
}

startGame(englishBoard)



