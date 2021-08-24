let boardPositions





function startGame() {
    createGame();
    startEvents();
  };

//Create Game
function createGame() {
    let boardContainer = document.getElementById("game")
    let rowDiv
    let piecePosition
    let pieceContainerDiv
    
    let board3 = [
    
      [null, null, "fill",  "fill", "fill", null,  null], 
      [null, null, "fill",  "fill", "fill", null,  null], 
      ["fill","fill","fill","fill","fill","fill","fill"],
      ["fill","fill","fill",  0 , "fill","fill", "fill"], 
      ["fill","fill","fill","fill","fill","fill","fill"], 
      [null, null, "fill", "fill", "fill", null,   null], 
      [null, null, "fill", "fill", "fill", null,   null]
 
]


let board2 = [
    
  [null,null, 0,  "fill", "fill", null,  null], 
  [null, "fill", "fill",  "fill", "fill","fill",  null], 
  ["fill","fill","fill","fill","fill","fill","fill"],
  ["fill","fill","fill","fill", "fill","fill", "fill"], 
  ["fill","fill","fill","fill","fill","fill","fill"], 
  [null, "fill", "fill", "fill", "fill","fill",null], 
  [null, null, "fill", "fill", "fill", null,   null]

]



let board = [
  [null,null,null, null, "fill", null,null, null,null], 
  [null,null,null, "fill", "fill", "fill",null, null,null], 
  [null,null,"fill", "fill", "fill", "fill","fill", null,null], 
  [null,"fill","fill", "fill", "fill", "fill","fill", "fill",null], 
  ["fill","fill","fill", "fill", 0 , "fill","fill", "fill", "fill"], 
  [null,"fill","fill", "fill", "fill", "fill","fill", "fill",null],
  [null,null,"fill", "fill", "fill", "fill","fill", null,null],
  [null,null,null, "fill", "fill", "fill",null, null,null],
  [null,null,null, null, "fill", null,null, null,null]
]




    for (let i = 0; i < board.length; i++) {
        rowDiv = document.createElement("div")
        rowDiv.className = "boardRow"

        
        for (let j = 0; j < board[i].length; j++){
            piecePosition = board[i][j];
            pieceContainerDiv = document.createElement("div")
            pieceContainerDiv.className = "pieceContainer"
            
            if (piecePosition === null) {

                pieceContainerDiv.appendChild(createPiece("nullPiece", i, j))
            }

            else if (piecePosition === "fill") {
                pieceContainerDiv.appendChild(createPiece("occupiedPiece", i, j))
            }
            else {
                pieceContainerDiv.appendChild(createPiece("emptyPiece", i, j))
            }

            
            rowDiv.appendChild(pieceContainerDiv)
        }

        
        boardContainer.appendChild(rowDiv)
    }

    boardPositions = document.getElementsByClassName("piece")
    let count = countPieces()
    messageDiv.innerHTML = count + " Pieces"
}

function startEvents() {
    let pieceDiv 
    let classOfPiece

    for (let i = 0; i < boardPositions.length; i++ ) {
        boardPositions[i].onclick = function() {
            classOfPiece = boardPositions[i].className 

            if (classOfPiece.indexOf("occupiedPiece") >=0 ) {
                clearSelections()
                
                if(classOfPiece.indexOf("selected") < 0) {
                  boardPositions[i].className = classOfPiece + " selected"
                    
                }
            }
            else if (classOfPiece.indexOf("emptyPiece") >=0 && classOfPiece.indexOf("validDest") >= 0)  {
                makeJump(boardPositions[i])
                clearSelections()
            }         
        }

    }
}


function createPiece (type, row, col) {
  let div = document.createElement("div");
  div.className = type + " piece";
  div["data-linhas"] = row
  div["data-colunas"] = col

  return div;
};











function checkPossibleJump(startDiv, endDiv) { //MODIFICAR

    return (

    // Condicionais 

    //Checar se a posição final está vazia 
      (endDiv.className.indexOf("emptyPiece") > -1) || 
        // Checar se a posição final e inicial estão na mesma linha e se estão na mesma coluna 
      ((startDiv["data-linhas"] === endDiv["data-linhas"] || startDiv["data-colunas"] === endDiv["data-colunas"])) ||


    //Checar se a distancia entre a posição final e inicial é de duas casas
      (Math.abs(startDiv["data-linhas"] - endDiv["data-linhas"]) === 2 && Math.abs(startDiv["data-colunas"] - endDiv["data-colunas"]) === 2) ||
      (pieceInBetween(startDiv, endDiv).className.indexOf("occupiedPiece") < 0)
    );
};


  
function makeJump (destDiv) {
      let selectedDiv

      for (let i = 0; i < boardPositions.length; i++) {

          
          if (boardPositions[i].className.indexOf("selected") > 0) {
              selectedDiv = boardPositions[i]
              break;
             
          }
        }

   
     selectedDiv.className = selectedDiv.className.replace("selected", "").replace("occupiedPiece", "emptyPiece")


    
     destDiv.className = destDiv.className.replace("validDest", "").replace("emptyPiece", "occupiedPiece")


    
     let inBetweenPiece = pieceInBetween(selectedDiv, destDiv)

     inBetweenPiece.className = inBetweenPiece.className.replace("occupiedPiece", "emptyPiece")


     let count = countPieces()
     
 
     messageDiv.innerHTML = count + " Pieces"
    
     
    
     
    
    
    }


    function clearSelections(){
    
      let pieceDiv; 
      for (let i = 0; i < boardPositions.length; i++) {
        pieceDiv = boardPositions[i];
        pieceDiv.className = pieceDiv.className.replace("selected", "").replace("validDest", "");
      }
    }
  




    function checkForVictory(){
        
        let pieceDiv 
        
        
        for (let i = 0; i < boardPositions.length; i++) {
            
            for (let j = 0; j < boardPositions.length; j++ ) {
              pieceDiv = boardPositions[i]
              
              

              if (pieceDiv.className.indexOf('occupiedPiece') > -1 && checkPossibleJump(pieceDiv, boardPositions[j])) {
                return true;
              }
            }
          }
          return false;
        }



   
    function countPieces () {
        let pieceDiv 
        let count = 0 

        for (let i = 0; i < boardPositions.length; i++) {
            pieceDiv = boardPositions[i] 

            if (pieceDiv.className.indexOf("occupiedPiece") > -1){
                count ++
            }
        }

        return count

    }


    function pieceInBetween (pieceA, pieceB) {
          
        if (pieceA["data-linhas"] === pieceB["data-linhas"]) {
          row = pieceA["data-linhas"]
          
          col = pieceA["data-colunas"] > pieceB["data-colunas"] ? pieceA["data-colunas"] - 1 : pieceB["data-colunas"] - 1
        } else {
          col = pieceA["data-colunas"]
          row = pieceA["data-linhas"] > pieceB["data-linhas"] ? pieceA["data-linhas"] - 1: pieceB["data-linhas"] - 1
        }
        for (let i = 0; i < boardPositions.length; i++) {
          inBetweenPiece = boardPositions[i]
          if (inBetweenPiece["data-linhas"] === row && inBetweenPiece["data-colunas"] === col) {
            return inBetweenPiece
          }
        }
      }


          
      startGame()
