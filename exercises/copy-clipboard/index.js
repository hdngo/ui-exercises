const copyButton = document.getElementById("copyButton");
const el = document.getElementById("code");

copyButton.addEventListener("click", function () {
  // gets the current window selection (if some text is highlighted, selection will point to the node)
  const selection = window.getSelection();

  // save the current selection
  const currentRange =
    selection.rangeCount === 0 ? null : selection.getRangeAt(0);

  // select the text content of the code element
  const range = document.createRange();
  range.selectNodeContents(el);
  selection.removeAllRanges();
  selection.addRange(range);

  // copy to the clipboard
  try {
    document.execCommand("copy");
    copyButton.innerHTML = "Copied";
  } catch (err) {
    // unable to copy
    copyButton.innerHTML = "Copy";
  } finally {
    // restore the previous selection
    selection.removeAllRanges();
    currentRange && selection.addRange(currentRange);
  }
});

/*
  Notes:
  - document.createRange() -> creates a Range object
  - setting a start and end for the range via setStart, setEnd enable more methods
  - set{Start,End} takes params ({startNode, endNode}, {startOffset, endOffset})
  - range.selectNodeContents(node) -> sets the range to contain the contents of the node
  - while a range is available, the content will be highlighted

  Sources:
  https://htmldom.dev/copy-highlighted-code-to-the-clipboard
  https://developer.mozilla.org/en-US/docs/Web/API/Document/createRange
*/
