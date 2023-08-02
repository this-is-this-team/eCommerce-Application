/* Test modules and async */
// TODO: Delete this file when start work

import imgSVG from "../assets/rsschool-test.svg";
import imgJPG from "../assets/rsschool-test.jpg";

export function componentImgSVG() {
  const img = document.createElement("img");
  img.src = imgSVG;
  img.width = "200"
  return img;
}

export function componentImgPNG() {
  const img = new Image();
  img.src = imgJPG;
  img.width = "200"
  return img;
}

export const sum = async (a, b) => a * b;
