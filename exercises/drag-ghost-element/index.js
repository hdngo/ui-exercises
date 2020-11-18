const el = document.getElementById("drag");
console.log(el);
let ghostEl;

el.addEventListener("dragstart", function (e) {
  // create the ghost el; it's also possible to use an existing dom el though
  ghostEl = document.createElement("div");
  ghostEl.classList.add("dragging");
  ghostEl.innerHTML = "I'm fly";

  document.body.appendChild(ghostEl);

  // customize the drag image
  e.dataTransfer.setDragImage(ghostEl, 0, 0);
});

// remove the ghost el when the user's finished dragging
el.addEventListener("dragend", function (e) {
  document.body.removeChild(ghostEl);
});

/*
Notes:
- using the `draggable` attr lets the browser know an el can be dragged by default
- by default, the browser shows a ghost element created from the original el


Sources:
https://htmldom.dev/show-a-ghost-element-when-dragging-an-element
*/
