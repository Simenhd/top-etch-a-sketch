let gridLinesToggled = true;
let mouseDown = false;
let selectedColor = "primary";
let showGridLines = true;


const gameBoard = document.querySelector('.board-container');
const gridSizeSlider = document.querySelector('.slidecontainer .slider');
const gridSizeDisplay = document.querySelector('.bottom-settings-container h4');
// settings buttons
const clearButton = document.querySelector('button#clear');
const colorOptionButtons = document.querySelectorAll('.color-options button');
const gridLinesButton = document.querySelector('button#gridlines');

function gridGenerator(size) {    
    for (let i = 0; i < size; i++) {
        let column = document.createElement("div");
        column.className = "column";
        for (let j = 1; j <size; j++) {
            let rowWrapper = document.createElement("div");
            let row = document.createElement("div"); 
            rowWrapper.className = "row-wrapper";

            // ← apply the border state here:
            rowWrapper.style.border = showGridLines
            ? "1px solid black"
            : "0";

            row.className = "row";
            row.id = (i*size) + j
            rowWrapper.appendChild(row);
            column.appendChild(rowWrapper); 
        };
        gameBoard.appendChild(column);
    };
};

// Reset grid
function resetGrid() {
    gridTiles.forEach(div => {
        div.style.backgroundColor = "";
        div.style.opacity = 1
    })
};

// Delete grid
function deleteGrid() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    };
};



// Generate grid of
gridGenerator(16);

// Select all tiles
let gridTiles = document.querySelectorAll('.row');
let gridTileWrappers = document.querySelectorAll('.row-wrapper');



// Function to attach event listeners to grid tiles
function attachEventListeners() {
    gridTiles.forEach(div => {
        div.addEventListener('mousedown', () => {
            mouseDown = true;
        });
        div.addEventListener('mouseup', () => {
            mouseDown = false;
        });
        div.addEventListener('mouseover', (e) => {
            if (mouseDown) {
                console.log("Hover detected");
                
                switch (selectedColor) {
                    case "primary":
                        e.currentTarget.style.backgroundColor = "#90CAF9";
                        e.currentTarget.style.opacity = 1;
                        break;
                    case "rainbow":
                        e.currentTarget.style.backgroundColor = random_rgba();
                        e.currentTarget.style.opacity = 1;
                        break;
                    case "darken": {
                        let currentColor = e.currentTarget.style.backgroundColor;
                        let currentOpacity = parseFloat(e.currentTarget.style.opacity) || 0;
                        e.currentTarget.style.opacity = currentOpacity + 0.1;
                        console.log(currentColor);  
                        if (currentColor === "") {
                            e.currentTarget.style.backgroundColor = "#90CAF9"
                        }
                        break;
                    }
                    case "lighten": {
                        let currentOpacity = parseFloat(e.currentTarget.style.opacity) || 0;
                        e.currentTarget.style.opacity = currentOpacity - 0.1;
                        break;
                    }
                }
            }
        });
    });
};



colorOptionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        colorOptionButtons.forEach(b => {b.style.border = ""});
        selectedColor = e.target.id;
        e.currentTarget.style.border = "2px solid black"

    })
})

// Function to generate random RGBA
function random_rgba() {
    var o = Math.round, r = Math.random, s = 230; // Max RGB value set to 230 to prevent white
    var red = o(r() * s);
    var green = o(r() * s);
    var blue = o(r() * s);
    
    return `rgba(${red},${green},${blue},${(0.5 + r() * 0.5).toFixed(1)})`; // 0.5 < alpha < 1 
}


// Attach event listeners to initial grid
attachEventListeners();

gridSizeSlider.addEventListener('input', (e) => {
    // Remove existing tiles
    deleteGrid();

    // Add new tiles
    gridGenerator(e.target.value);

    // select new tiles
    gridTiles = document.querySelectorAll('.row');
    gridTileWrappers = document.querySelectorAll('.row-wrapper');

    // Attach event handlers to new grids
    attachEventListeners();

    // Update grid size display
    gridSizeDisplay.textContent = `${e.target.value} x ${e.target.value}`

});

// Evnent listener for clear button
clearButton.addEventListener('click', (e) => {
    resetGrid();
});

// Event listener for gridline toggle
gridLinesButton.addEventListener('click', (e) => {
    if (showGridLines) {
        gridTileWrappers.forEach((div => div.style.border = "0px"));
        showGridLines = false;
    } else {
        gridTileWrappers.forEach((div => div.style.border = "1px solid black"));
        showGridLines = true;
    };

    gridLinesButton.textContent = 
        showGridLines
        ? "Disable"
        : "Enable"
    
});