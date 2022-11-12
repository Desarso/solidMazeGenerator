import { createState, afterEffects } from "solid-js";
import Flipping from "flipping/dist/flipping.css.js";

export default function createFlipState(init, options) {
  const [state, setState] = createState(init);
  let flipping;
  afterEffects(() => (flipping = new Flipping(options)));
  return [
    state,
    (...args) => {
      flipping.read();
      setState(...args);
      flipping.flip();
    }
  ];
}
