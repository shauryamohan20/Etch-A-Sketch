// demo.js - fully functional with "shake to clear" and working buttons
const container = document.querySelector('.container');
const gameboy = document.querySelector('.gameboy');
const input = document.getElementById('gridSizeInput');
let activeColor = 'black';
let gridSize = 16;

// create grid with event listeners
function createGrid(size) {
  container.innerHTML = ''; // clear old
  // build rows/cells
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.classList.add('rowFirst');
    container.appendChild(row);

    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('rowRest', 'cell');
      row.appendChild(cell);

      // one listener per cell; behavior depends on activeColor
      cell.addEventListener('mouseenter', () => {
        // paint cell according to mode
        cell.classList.remove('colorBlack', 'colorRed');
        if (activeColor === 'black') cell.classList.add('colorBlack');
        else if (activeColor === 'red') cell.classList.add('colorRed');
      });
    }
  }
  // put the current grid size into the input for user convenience
  input.value = size;
}

// clear grid colors (immediate)
function clearGridImmediate() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('colorBlack', 'colorRed');
  });
}

// shake-to-clear: animate frame, then clear when animation finished
function shakeToClear() {
  // prevent double-trigger while already shaking
  if (gameboy.classList.contains('shake')) return;

  // add shake class to animate
  gameboy.classList.add('shake');

  // play a fun tiny "clear" sound? (omitted - simple)
  // after animationend, remove shake class and clear grid
  function onAnimEnd() {
    gameboy.classList.remove('shake');
    clearGridImmediate();
    gameboy.removeEventListener('animationend', onAnimEnd);
  }

  gameboy.addEventListener('animationend', onAnimEnd);
}

// set new grid size (reads input)
function setGridSizeFromInput() {
  const val = parseInt(input.value);
  if (isNaN(val) || val < 1 || val > 100) {
    alert('Please enter a valid grid size between 1 and 100.');
    input.value = gridSize; // restore last size
    return;
  }
  gridSize = val;
  createGrid(gridSize);
}

// color mode toggles
const blackBtn = document.querySelector('.blackColor');
const redBtn = document.querySelector('.redColor');
const clearBtn = document.querySelector('.clearButton');
const setGridBtn = document.querySelector('.setGrid');

blackBtn.onclick = () => { activeColor = 'black'; blackBtn.classList.add('active'); redBtn.classList.remove('active'); };
redBtn.onclick = () => { activeColor = 'red'; redBtn.classList.add('active'); blackBtn.classList.remove('active'); };
clearBtn.onclick = () => shakeToClear();
setGridBtn.onclick = () => setGridSizeFromInput();

// allow pressing Enter in the input to set grid
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') setGridSizeFromInput();
});

// initial grid
createGrid(gridSize);

// set initial button active style (optional tiny visual)
blackBtn.classList.add('active');
