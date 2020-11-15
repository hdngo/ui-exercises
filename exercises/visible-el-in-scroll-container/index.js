const isVisible = function (ele, container) {
  const containerTop = container.scrollTop; // scroll distance
  const containerBottom = containerTop + container.clientHeight;

  const eleTop = ele.offsetTop - container.offsetTop; // fixed offset top minus 8px body margin
  const eleBottom = eleTop + ele.offsetHeight;
  // offsetHeight is used instead of clientHeight to account for the button borders

  /* The element is fully visible in the container if the top of the element and the bottom are within the bounds of the container
     eleTop > containerTop means top of el hasn't been scrolled past yet
     eleBottom < containerBottom means bottom of el hasn't been scrolled past yet
     eleTop < containerTop means scrolled past top of el
     containerTop < eleBottom means haven't scrolled past bottom  of el (b/c container top + height = bottom el)
     eleTop < containerBottom means top of el before bottom of container
     containerBottom < eleBottom means bottom of el is past visible bottom of container  (top peaks out)

     // 1st condition = fully in view
    // 2nd condition = bottom is partially in view
    // 3rd condition = top is partially in view
     
  */
  return (
    (eleTop >= containerTop && eleBottom <= containerBottom) ||
    (eleTop <= containerTop && containerTop <= eleBottom) ||
    (eleTop <= containerBottom && containerBottom <= eleBottom)
  );
};

const container = document.querySelector(".container");
const button = document.querySelector("button");

container.addEventListener("scroll", function () {
  console.log(isVisible(button, container));
});

document.addEventListener("click", function () {
  console.log(isVisible(button, container));
});

/*
  Notes:
  scrollTop - amount scrolled within an element
  
  offsetTop is the offset amount of an element relative to its offset parent
  
  clientHeight (visible height sans borders):
    returns the inner height of an element in pixels, including padding but not the horizontal scrollbar height, border, or margin

  offsetHeight:
    is a measurement which includes the element borders, the element vertical padding, the element horizontal scrollbar (if present, if rendered) and the element CSS height.

  scrollHeight:
    is a measurement of the height of an element's content including content not visible on the screen due to overflow

  default button border is 2px solid, button innerheight in this ex. is 18 (clientHeight) and 22 w/ (offsetHeight)
  sources:
  https://htmldom.dev/check-if-an-element-is-visible-in-a-scrollable-container
  https://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight#:~:text=clientHeight%3A%20Same%20as%20offset%2Dheight,(if%20it%20has%20one).
    
*/
