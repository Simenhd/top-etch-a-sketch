
const gameBoard = document.querySelector('.board-container');
const gridSizeSlider = document.querySelector('.slidecontainer .slider');
const gridSizeDisplay = document.querySelector('.settings-container h4')

function gridGenerator(size) {    
    for (let i = 0; i < size; i++) {
        let column = document.createElement("div");
        column.className = "column";
        for (let j = 1; j <size; j++) {
            let row = document.createElement("div"); 
            row.className = "row";
            row.id = (i*size) + j
            column.appendChild(row)
        };
        gameBoard.appendChild(column);
    };
};

// Reset grid
function resetGrid() {
    gridTiles.forEach(div => {
        div.style.backgroundColor = "";
    })
};

// Delete grid
function deleteGrid() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    };
};

// Generate grid 
gridGenerator(16);

// Select all tiles
const gridTiles = document.querySelectorAll('.row');

// Format when mouse over a tile
gridTiles.forEach(div => {
    div.addEventListener('mouseover', (e) => {
        console.log("Hover detected");
        currentButton = e.currentTarget;
        currentButton.style.backgroundColor = "#ff0000"
    });
});

gridSizeSlider.addEventListener('change', (e) => {
    // Remove existing tiles
    deleteGrid();

    // Add new tiles
    gridGenerator(e.target.value);

    // Update grid size display
    gridSizeDisplay.textContent = `${e.target.value} x ${e.target.value}`

});







