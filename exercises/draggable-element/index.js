// current mouse pos.
let x = 0;
let y = 0;

// query the el
const el = document.getElementById("drag");

// handle mousedown that's triggered on drag
const mouseDownHandler = function (e) {
  // get the current mouse pos.
  x = e.clientX;
  y = e.clientY;

  // attach the listeners to the document
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  // how far the mouse has moved
  const dx = e.clientX - x;
  const dy = e.clientY - y;

  // set the pos. the el
  el.style.top = `${el.offsetTop + dy}px`;
  el.style.left = `${el.offsetLeft + dx}px`;

  // reassign the pos. of the mouse
  x = e.clientX;
  y = e.clientY;
};

const mouseUpHandler = function (e) {
  // remove the handers of 'mousemove' and 'mouseup'
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};

el.addEventListener("mousedown", mouseDownHandler);

/*
  Notes:
  - track mousedown and take the current mouse pos.
  - track mousemove on doc to calc mouse movement and determine the dragged el pos.
  - track mouseup to know when to remove event handlers 

  how it works:
  - instantiate the position x, y
  - on mousedown, have a listener that gets sets the x,y to the new mouse position (client{X,Y}) and then add the mousemove and up listeners
  - on mousemove, calc the dif by subtracting the new position (client{X,Y}) from the updated {x,y} values from the mousedown handler and update the top left offset values  by the differences for {X,Y}
  - on mouseup, remove the listeners so that the sequence resumes with a mousedown and things arent updated out of order

  Sources:
  https://htmldom.dev/make-a-draggable-element
*/
