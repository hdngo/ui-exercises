const el = document.getElementById("container");

let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function (e) {
  pos = {
    // current scroll pos
    left: el.scrollLeft,
    top: el.scrollTop,
    // get current mouse pos
    x: e.clientX,
    y: e.clientY
  };

  // change the cursor and prevent user from selecting the text
  el.style.cursor = "grabbing"; // optional
  el.style.userSelect = "none";

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  // deltas
  const dx = e.clientX - pos.x;
  const dy = e.clientY - pos.y;

  // scroll the el
  el.scrollTop = pos.top - dy;
  el.scrollLeft = pos.left - dx;
};

// reset css props on release
const mouseUpHandler = function (e) {
  el.style.cursor = "grab"; // optional
  el.style.removeProperty("user-select");

  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};

el.addEventListener("mousedown", mouseDownHandler);

/*
  Notes:
  - as long as an element is scrollable, we can scroll it to a pos. (x,y) via scrollTop and scrolLeft
  - method for drag to scroll is similar to that used in draggable-element
  -- we handle the mousedown event first and store the current scroll and mouse pos
  -- on mousemove, track the deltas and scroll the element the same amount
  -- on mouseup, reset the css properties but more importantly, remove the eventhandlers so it's not constantly scrolling

  Sources:
  - https://htmldom.dev/drag-to-scroll
*/
