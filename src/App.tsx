import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import {
  Canvas,
  circle,
  createCanvas,
  fillSetting,
  line,
  rect,
} from "./components/Canvas";

const App: Component = () => {
  const [canvas, setCanvas] = createSignal({
    width: 600,
    height: 600,
  });
  let boxColor = getRandomColor();
  let indicatorColor =  invertColor(boxColor, true);
  let walls = findContrastingColor(boxColor, indicatorColor);
  let cols: number, rows: number;
  let w = 10;
  let grid: Cell[] = [];
  let current: Cell;
  let next: any;
  let previous: Cell;
  let [frameRate, setFrameRate] = createSignal(10000);
  let stack: Cell[] = [];

  onMount(async () => {
    createCanvas();
    cols = Math.floor(canvas().width / w);
    rows = Math.floor(canvas().height / w);
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let cell = new Cell(i, j);
        grid.push(cell);
      }
    }
    for (let i = 0; i < grid.length; i++) {
      grid[i].show();
    }
    //set current to random cell
    current = grid[Math.floor(Math.random() * grid.length)];
  });

  const game = async () => {
    await update();
  };

  createEffect(() => {
    const interval = setInterval(game, 1000 / frameRate());

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  const update = async () => {
    // for(let i = 0; i < grid.length; i++){
    //   grid[i].show();
    // }
    let widthInBoxes = canvas().width / w;
    let currentIndex = grid.indexOf(current);

    current.show();
    if (grid[currentIndex + 1]) {
      grid[currentIndex + 1].show();
    }
    if (grid[currentIndex - 1]) {
      grid[currentIndex - 1].show();
    }
    if (grid[currentIndex + widthInBoxes]) {
      grid[currentIndex + widthInBoxes].show();
    }
    if (grid[currentIndex - widthInBoxes]) {
      grid[currentIndex - widthInBoxes].show();
    }
    current.visited = true;
    current.highlight();

    //Step 1
    next = current.checkNeighbors();
    if (next) {
      next.show();
    }

    if (next) {
      next.visited = true;
      //Step 2
      stack.push(current);

      //Step 3

      removeWalls(current, next);

      //Step 4

      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
  };

  class Cell {
    i: number;
    j: number;
    visited: boolean = false;
    walls: boolean[] = [true, true, true, true];

    constructor(i: number, j: number) {
      this.i = i;
      this.j = j;
    }

    show() {
      let x = this.i * w;
      let y = this.j * w;

      if (this.visited) {
        rect(x, y, w, w, boxColor);
      }
      if (this.walls[0]) {
        line(x, y, x + w, y, walls);
      }
      if (this.walls[1]) {
        line(x + w, y, x + w, y + w, walls);
      }
      if (this.walls[2]) {
        line(x + w, y + w, x, y + w, walls);
      }
      if (this.walls[3]) {
        line(x, y + w, x, y, walls);
      }
    }

    checkNeighbors() {
      let neighbors = [];
      let top = grid[index(this.i, this.j - 1)];
      let right = grid[index(this.i + 1, this.j)];
      let bottom = grid[index(this.i, this.j + 1)];
      let left = grid[index(this.i - 1, this.j)];

      if (top && !top.visited) {
        neighbors.push(top);
      }
      if (right && !right.visited) {
        neighbors.push(right);
      }
      if (bottom && !bottom.visited) {
        neighbors.push(bottom);
      }
      if (left && !left.visited) {
        neighbors.push(left);
      }

      if (neighbors.length > 0) {
        let r = Math.floor(Math.random() * neighbors.length);
        return neighbors[r];
      } else {
        return undefined;
      }
    }

    highlight() {
      let x = this.i * w;
      let y = this.j * w;
      rect(x + 1, y + 1, w - 2, w - 2, indicatorColor);
    }
  }

  function index(i: number, j: number) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
      return -1;
    }
    return i + j * cols;
  }

  function removeWalls(a: Cell, b: Cell) {
    let x = a.i - b.i;
    if (x === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (x === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }
    let y = a.j - b.j;
    if (y === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (y === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
  }

  return (
    <div class="app-container">
      <Canvas width={canvas().width} height={canvas().height} />
      <input
        type="range"
        min="1"
        max="250"
        onInput={(e) => {
          // console.log(e.target.value);
          setFrameRate(1*(e.target.value)^2);
          console.log(1*(e.target.value)^2)
          // setFrameRate(e.target.value);
        }}
        class="slider"
        id="myRange"
      />
    </div>
  );
};

export default App;

function invertColor(hex: string, bw: any) {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  let r: any = parseInt(hex.slice(0, 2), 16),
    g: any = parseInt(hex.slice(2, 4), 16),
    b: any = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str: string, len?: number) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}


//find ocntrasting hex color between two other hex colors
function findContrastingColor(hex1: string, hex2: string) {
  var color1 = hexToRgb(hex1);
  var color2 = hexToRgb(hex2);
  var color3 = {
    r: (color1.r + color2.r) / 2,
    g: (color1.g + color2.g) / 2,
    b: (color1.b + color2.b) / 2,
  };
  return rgbToHex(color3.r, color3.g, color3.b);
}

//convert hex color to rgb
function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

//convert rgb color to hex
function rgbToHex(r: number, g: number, b: number) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return (
    "#" +
    ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
  );
}

//generate random hex color
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}