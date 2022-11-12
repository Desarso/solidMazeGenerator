import { Component, createSignal, createEffect } from "solid-js";



export const [ctx, setCtx] = createSignal(null);

export const [canvas, setCanvas] = createSignal({
    width: 600,
    height: 400,
  });

const [stroke, setStroke] = createSignal("none");
const [fill, setFill] = createSignal(true);


export const circle = (x: number, y: number, r: number, color: string) => {
    ctx().fillStyle = color;
    ctx().beginPath();
    ctx().arc(x, y, r, 0, Math.PI * 2, false);
    ctx().closePath();
    if(fill()){
      ctx().fill();
    } else{
      ctx().strokeStyle = color;
      ctx().stroke()
    }
  
  };

  export const rect = (x: number, y: number, w: number, h: number, color: string) => {
    ctx().fillStyle = color;
    if(fill() === true){
      ctx().fillRect(x, y, w, h);
      ctx().fill();
    } else{
      ctx().strokeStyle = color;
      ctx().stroke()
      ctx().rect(x, y, w, h);
    }
   

  };

  export function fillSetting(setting: boolean) {
    setFill(setting);
  };


  export const createCanvas = () => {
        setCtx(canvas().getContext("2d"));
  }

  export const line = (x1: number, y1: number, x2: number, y2: number, color?: string) => {
    ctx().beginPath();
    ctx().lineWidth = 2;
    ctx().moveTo(x1, y1);
    ctx().lineTo(x2, y2);
    ctx().strokeStyle = (color || "black");
    ctx().stroke();
  };

  



export const Canvas: Component<{width: number, height: number}> = ({width, height}) => {

    

    // createEffect(() => {
    //     const CANVAS2 = document.querySelector("canvas")   as HTMLCanvasElement;
    //     CANVAS2.width = window.innerWidth;
    //     CANVAS2.height = window.innerHeight;
    //     createCanvas();
    //     drawCircle(100, 100, 50, "red");
    //     window.addEventListener('resize', () => {
    //             CANVAS2.width = window.innerWidth;
    //             CANVAS2.height = window.innerHeight;
    //             createCanvas();
    //             drawCircle(100, 100, 50, "red");
            
    //     })
    // });

    

  




    return (<canvas
        class="canvas"
        ref={setCanvas}
        width={width}
        height={height}
        style="border: 1px solid #000"
        >
        </canvas>);
};
