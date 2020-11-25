// current drag el
let draggingEl;

let { x, y } = 0;

const mouseDownHandler = function (e) {
  draggingEl = e.target;

  // calc the mouse position
  const rect = draggingEl.getBoundingClientRect();

  // distance from the left of the outer edge of the el
  x = e.pageX - rect.left;
  // distance from the top of the top edge of the el
  y = e.pageY - rect.top;

  // attach listeners
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

let placeholder;
let isDraggingStarted = false;

const mouseMoveHandler = function (e) {
  const prevEl = draggingEl.previousElementSibling;
  const nextEl = draggingEl.nextElementSibling;

  // placeholder
  const draggingRect = draggingEl.getBoundingClientRect();

  if (!isDraggingStarted) {
    // update flag
    isDraggingStarted = true;

    // let the placeholder take the height of the dragging el
    placeholder = document.createElement("div");
    placeholder.classList.add("placeholder");
    draggingEl.parentNode.insertBefore(placeholder, draggingEl.nextSibling);

    placeholder.style.height = `${draggingRect.height}.px`;
  }

  // initial steps for moving the target el
  // set position for the dragging el
  // setting it as absolute means there'll be a shift (prior to step of adding placeholder)
  draggingEl.style.position = "absolute";
  // moves the el by the delta
  draggingEl.style.top = `${e.pageY - y}px`;
  draggingEl.style.left = `${e.pageX - x}px`;

  // user moves item to the top
  if (prevEl && isAbove(draggingEl, prevEl)) {
    swap(placeholder, draggingEl);
    swap(placeholder, prevEl);
    return;
  }

  // bottom
  if (nextEl && isAbove(nextEl, draggingEl)) {
    swap(nextEl, placeholder);
    swap(nextEl, draggingEl);
  }
};

const mouseUpHandler = function () {
  // remove the position styles
  draggingEl.style.removeProperty("top");
  draggingEl.style.removeProperty("left");
  draggingEl.style.removeProperty("position");

  x = null;
  y = null;
  draggingEl = null;

  // remove the placeholder
  placeholder && placeholder.parentNode.removeChild(placeholder);
  // reset flag
  isDraggingStarted = false;

  // remove handlers
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};

const isAbove = function (nodeA, nodeB) {
  const rectA = nodeA.getBoundingClientRect();
  const rectB = nodeB.getBoundingClientRect();

  return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};

const swap = function (nodeA, nodeB) {
  const parentA = nodeA.parentNode;
  // if nodeB is the current sibling of A, A should simply take B's place so A's new sibling will be itself,
  // otherwise, A's sibling should be nodeA.nextSibling
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  // move `nodeA` to before `nodeB`
  nodeB.parentNode.insertBefore(nodeA, nodeB);

  //TODO: make sense of the swap
  // move `nodeB` to before the sibling of `nodeA`
  parentA.insertBefore(nodeB, siblingA);
};

// attach mousedown event to each item
const list = document.getElementById("list");

[].slice.call(list.querySelectorAll(".draggable")).forEach(function (item) {
  item.addEventListener("mousedown", mouseDownHandler);
});

/*
  notes:
  - use the same approached from the drag element exercises
  - while dragging an item, the drag target's sibling element will move up and fill the space previously occupied by the drag target;
  therefore we need to create a dynamic placeholder to insert it right before the drag target (on mousemove) so there's no vertical shift yet
  see: placeholder, isDraggingStarted
  - we need to determine if a user is moving an item above or below another one;
  a node is above another if its horizontal center point is less than the one it's moving  (a vs b);
  the center point of a node is calced by the sum of its top and half of its height (.top + .height / 2)
  -- if the user moves an item to the top, we swap the placeholder and prvious item,
  -- we swap the next and dragging item if the user moves the item down
  
  sources:
  - https://htmldom.dev/drag-and-drop-element-in-a-list
*/
