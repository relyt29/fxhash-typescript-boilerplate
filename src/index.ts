// NAME YOUR PROJECT
// < project Baby's Hello World>
// < project Relyt29>
// < 2023-01-02 >


import p5 from "p5";
import { fxrand, isFxpreview, fxpreview } from "./fxhash";
import { 
  seed, 
  setSeed, 
  gridSize,
  setGridSize,
  setCellSize,
  setMicroCellSize,
  setNanoCellSize,
  HUE_MAX, SATURATION_MAX, BRIGHTNESS_MAX, OPACITY_MAX } from "./constants";

const sketch = function (p5: p5) {

  p5.preload = function () {
    // SET SEED TO CONTROL PRNG FUNCTION REQUIRED BY fx(hash)
    setSeed(p5.int(Math.floor(fxrand() * 999999))); // to hold random seed
    p5.colorMode(p5.HSB, HUE_MAX, SATURATION_MAX, BRIGHTNESS_MAX, OPACITY_MAX);
  }

  function setupGrid(m: number) {
    setGridSize(p5.min(p5.windowWidth, p5.windowHeight) * m);
    setCellSize(gridSize / 10);   // grid cell
    setMicroCellSize(gridSize / 100);  // grid micro-cell
    setNanoCellSize(gridSize / 1000); // grid nano-cell
  }

  p5.setup = function () {
    setupGrid(1);
    p5.createCanvas(gridSize, gridSize);
    p5.randomSeed(seed);
    p5.noiseSeed(seed);

    p5.background("navajowhite");
    p5.textSize(gridSize / 16);
    p5.textAlign("center");
    p5.text("Make cool art", gridSize / 2, gridSize / 2);
  }

  p5.draw = function () {



    if (isFxpreview == true) {
      fxpreview();
    }
    p5.noLoop();

  }

  p5.windowResized = function () {
    setupGrid(1);
    p5.resizeCanvas(gridSize, gridSize);
  }

  p5.keyPressed = function () {
    if (p5.key == 's') {
      setupGrid(5);
      p5.resizeCanvas(gridSize, gridSize);
      p5.saveCanvas('artwork_' + seed, 'png');
    }

  }

}

const myp5 = new p5(sketch, window.document.body);
