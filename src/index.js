import "./styles/index.scss";

import {
  componentImgSVG,
  componentImgPNG,
  sum,
} from "./components/test-component";

function componentText(text) {
  const element = document.createElement("h1");
  element.textContent = text;
  return element;
}

function componentDivImg() {
  const element = document.createElement("div");
  element.classList.add("image");
  return element;
}

console.log(sum(1, 2));

document.body.prepend(
  componentText("Hello World"),
  componentDivImg(),
  componentImgSVG(),
  componentImgPNG()
);
