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
    width: 1800,
    height: 1050,
  });

  let cols: number, rows: number;
  let w = 15;
  let grid: Cell[] = [];
  let current: Cell;
  let next: any;
  let previous: Cell;
  let frameRate = 1000;
  let stack: Cell[] = [];

  onMount(async () => {
    cols = Math.floor(canvas().width / w);
    rows = Math.floor(canvas().height / w);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          let cell = new Cell(i, j);
          grid.push(cell);
        }
      }
          createCanvas();
    }
    // createCanvas();
    current = grid[0];
    for (let i = 0; i < grid.length; i++) {
      grid[i].show();
    }

    game();
  });

  const game = async () => {
    await update();
    await render();
  };

  createEffect(() => {
    const interval = setInterval(game, 1000 / frameRate);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  const update = async () => {
    current.visited = true;
    // current.highlight();

    //Step 1
    next = current.checkNeighbors();

    if (next) {
      next.visited = true;
      current.highlight();
      //Step 2
      stack.push(current);


      //Step 3

      removeWalls(current, next);
    

      //Step 4
      current.show();
      next.show();
      current = next;
      
    }else if(stack.length > 0){
      current  = stack.pop();
      
    }

    
  };

  const render = async () => {


  
   
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

      console.log(this);

      if (this.visited) {
        rect(x, y, w, w, "purple");
      }
      if (this.walls[0]) {
        line(x, y, x + w, y, "white");
      }
      if (this.walls[1]) {
        line(x + w, y, x + w, y + w, "white");
      }
      if (this.walls[2]) {
        line(x + w, y + w, x, y + w, "white");
      }
      if (this.walls[3]) {
        line(x, y + w, x, y, "white");
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
      rect(x, y, w, w, "green");
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
      console.log(a);
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
    <div>
      <Canvas width={canvas().width} height={canvas().height} />
    </div>
  );
};

export default App;
