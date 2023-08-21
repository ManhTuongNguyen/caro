const VALUE_EMPTY = 1;
const VALUE_X = 2;
const VALUE_O = 3;
const DEFAULT_COLS = 25;
const DEFAULT_ROWS = 18;
const DEFAULT_CELL_SIZE = 2.6;

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.value = VALUE_EMPTY;
    this.getHtml = function(){
        let top = x * DEFAULT_CELL_SIZE;
        let left = y * DEFAULT_CELL_SIZE;
        let cellHtml = '<div id="cell-'+x+'-'+y+'" onclick="play('+x+','+y+')" class="cell" style="position: absolute; width: '+
            DEFAULT_CELL_SIZE+'rem; height:'+
            DEFAULT_CELL_SIZE+'rem; left:'+
            left+'rem; top:'+
            top+'rem; line-height: '+
            DEFAULT_CELL_SIZE+'rem;"></div>';
        return cellHtml;
    };
    
    this.draw = function () {
        let cellDiv = document.getElementById("cell-"+x+"-"+y);
        let message = document.getElementById("message");
        switch (this.value){
            case VALUE_X:
                cellDiv.innerHTML = "X";
                message.innerText = "O to play";
                cellDiv.classList.add('x-class');
                cellDiv.classList.add('not-allowed');
                break;
            case VALUE_O:
                cellDiv.innerHTML = "O";
                message.innerText = "X to play";
                cellDiv.classList.add('not-allowed');
                break;
            default:
                cellDiv.innerHTML = "";
                break;
        }
    }
}

function GameBoard(rows, cols, elementId) {
    this.rows = rows;
    this.cols = cols;
    this.elementId = elementId;
    this.turn = VALUE_O;
    this.cells = [];
    this.isOver = false;
    
    this.draw = function () {
        let gameBoardDiv = document.getElementById(this.elementId);
        gameBoardDiv.innerHTML = "";
        for(let i = 0; i < this.rows; i++){
            let row = [];
            this.cells.push(row);
            for(let j = 0; j < this.cols; j++){
                let cell = new Cell(i, j);
                row.push(cell);
                gameBoardDiv.innerHTML += cell.getHtml();
            }
        }
    };

    this.play = function (x, y) {
        if(this.isOver) {
            return;
        }
        let cell = this.cells[x][y];
        if(cell.value === VALUE_EMPTY){
            cell.value = this.turn;
            cell.draw();
            this.check(x, y);
            if(this.turn === VALUE_O){
                this.turn = VALUE_X;
            } else {
                this.turn = VALUE_O;
            }
        } else {
            Toastify({
                text: "Cell is not empty",
                offset: {
                  x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                  y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
              }).showToast();
            // alert("Cell is not empty");
        }
    };
    
    this.check = function (x, y) {
        let cell = this.cells[x][y];
        //Horizontal
        let count = 1;
        let i = 1;
        while((y + i < this.cols) && this.cells[x][y + i].value ===  cell.value){
            count++;
            i++;
            console.log('1');
        }
        i = 1;
        while((y - i >= 0) && this.cells[x][y - i].value ===  cell.value){
            count++;
            i++;
            console.log('1');
        }
        this.endGame(count);
        // Vertical
        count = 1;
        i = 1;
        while((x + i < this.rows) &&this.cells[x + i][y].value ===  cell.value){
            count++;
            i++;
            console.log('1');
        }
        i = 1;
        while((x - i >= 0) &&this.cells[x - i][y].value ===  cell.value){
            count++;
            i++;
            console.log('1');
        }
        this.endGame(count);
        //Left diagonal
        count = 1;
        i = 1;
        j = 1;
        while((y + i < this.cols) && (x + i < this.rows) && this.cells[x + i][y + j].value ===  cell.value){
            count++;
            i++;
            j++;
            console.log('1');
        }
        i = 1;
        j = 1;
        while((x - i >= 0) && (y - j >= 0) && this.cells[x - i][y - j].value ===  cell.value){
            count++;
            i++;
            j++;
            console.log('1');
        }
        this.endGame(count);
        //Right diagonal
        count = 1;
        i = 1;
        j = 1;
        while((y + j < this.cols) && (x - i >= 0) && this.cells[x - i][y + j].value ===  cell.value){
            count++;
            i++;
            j++;
            console.log('1');
        }
        i = 1;
        j = 1;
        while((y - j >= 0) && (x + i < this.rows) &&this.cells[x + i][y - j].value ===  cell.value){
            count++;
            i++;
            j++;
            console.log('1');
        }
        this.endGame(count);
    };

    this.endGame = function (count) {
        if(count >= 5){
            this.isOver = true;
            Toastify({
                text: "You won!!!",
                offset: {
                  x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                  y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
              }).showToast();
            // alert("You won!!!");
        }
    };
}

function play(x, y) {
   gameBoard.play(x, y);
}

function start() {
    if (document.getElementById("game-board")) {
        // destroy old gameboard
        document.getElementById("game-board").remove();
        const para = document.createElement("div");
        para.id = "game-board";
        document.body.appendChild(para);
    }
    gameBoard = new GameBoard(DEFAULT_ROWS, DEFAULT_COLS, "game-board");
    gameBoard.draw();
}
let gameBoard;

start();
