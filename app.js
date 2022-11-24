const canvas = document.getElementById("header");

let currentTitle = "";
let currentTextColor = "";
let currentBackgroundColor = "";

function draw() {
  const ratio = window.devicePixelRatio;
  const ctx = canvas.getContext("2d");
  const w = 248;
  const h = 20;
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.scale(ratio, ratio);

  ctx.fillStyle = currentBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = currentTextColor;
  ctx.font = "11px Arial";

  const titleUpperCased = currentTitle.toUpperCase();
  const textWidth = ctx.measureText(titleUpperCased).width;

  ctx.fillText(titleUpperCased, canvas.width / (2 * ratio) - textWidth / 2, 14);
}

function copyCanvasToClipboard() {
  canvas.toBlob(function (blob) {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  });

  alert("Copied to clipboard!");
}

function initCopyButton() {
  if (typeof window.ClipboardItem !== "function") {
    return;
  }

  const copyButton = document.getElementById("copyButton");

  copyButton.addEventListener("click", copyCanvasToClipboard);

  copyButton.style.display = "block";
}

function onChangeText(evt) {
  currentTitle = evt.target.value;
  draw();
}

function onColorChange(evt) {
  currentTextColor = evt.target.value;
  draw();
}

function onBackgroundColorChange(evt) {
  currentBackgroundColor = evt.target.value;
  draw();
}

function initInputs() {
  const _$ = document.querySelector.bind(document);
  const textInput = _$("#text");
  const colorInput = _$("#textColor");
  const backgroundColorInput = _$("#backgroundColor");

  currentTitle = textInput.value;
  currentTextColor = colorInput.value;
  currentBackgroundColor = backgroundColorInput.value;

  textInput.addEventListener("input", onChangeText);
  colorInput.addEventListener("input", onColorChange);
  backgroundColorInput.addEventListener("input", onBackgroundColorChange);
}

initInputs();
initCopyButton();
draw();
