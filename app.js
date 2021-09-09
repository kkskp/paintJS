const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 1.0;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting() {
    painting = true;
}

function onMouseDown() {
    painting = true;
    if (filling === true) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(0, 0, 700, 700);
    }
}

function stopPainting() {
    painting = false;
}

function onMouseUp() {
    stopPainting();
}

function changeColor(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}

function fillCanvas() {
    if (filling === false) {
        filling = true;
        fill.innerText = "Paint";
    } else {
        filling = false;
        fill.innerText = "Fill";
    }
}
function handleCM(event) {
    event.preventDefault();
    console.log(event);
}

function saveFile() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "drawing.png";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
    color.addEventListener("click", changeColor)
);

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (fill) {
    fill.addEventListener("click", fillCanvas);
}

if (saveBtn) {
    saveBtn.addEventListener("click", saveFile);
}
