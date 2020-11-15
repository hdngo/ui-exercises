document.getElementById("app").innerHTML = `
<h1>Calc mouse position relative to an element</h1>

<button>Click</button>
`;

const ele = document.querySelector("button");

ele.addEventListener("mousedown", function (e) {
  // Get the target
  const target = e.target;

  // Get the bounding rectangle of target
  const rect = target.getBoundingClientRect();

  // Mouse position
  /* e.client{x,y} is the offset of the mouse rel. to the viewport
     rect{left, top} is the left offset of the element relative to the viewport
     b/c the event is on the button, the e.client value will always be >= the rect outer top and left edges
  */
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  console.log(`x: ${x}, y: ${y}`);
});

/*
  Notes:
  - Element.getBoundingClientRect() returns a DOMRect object
  providing info about the size of an element and its position
  relative to the viewport
  - object is the smallest rect. containing the entire element (w/ padding and border);
  [left (x), top (y), right, bottom] are relative to the top left viewport
  w, h are relative to the element rect.
  - amount of scrolling done in a viewport area (excl. scrollable elements) is taken in account
  when computing the bounding rect.
  -- meaning the rect's bounding edges change every time the scroll position changes
  because values are relative to the viewport
  - to get the bounding rect. values relative to the document,
  add the current scroll poso. to the top and left using window.scrollX and window.scrollY

  - clientX, Y coordinates are relative to the visible part of the page
  - pageX, Y coords are relative to the top left of the page

  cross browser fallback involves using window.page{X,Y}Offset instead of window.scroll{X,Y}

  sources:
  - https://htmldom.dev/show-a-custom-context-menu-at-clicked-position
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
*/
