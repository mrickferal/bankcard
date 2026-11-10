const range = {
  init: function () {
    console.log("Hello world, I'm range.js");

    range.input = document.getElementById("input-range");
    range.label = document.getElementById("input-range-label");

    // create an array from the elements
    range.boxesAmounts = Array.from(document.querySelectorAll(".amount__box"));

    for (range.box of range.boxesAmounts) {
      range.box.addEventListener("click", range.handleAmountSwitch);
    }

    // get the value of the input type range and use `parseFloat()` to convert the string value to a point number
    range.value = parseInt(range.input.value);

    range.updateInput();
    range.synchronizeActiveAmountBox();

    range.input.addEventListener("input", range.handleInput);
    range.input.addEventListener("click", range.handleInput);
  },
  /**
   * Updates the value and visual style of the input range slider.
   * @return {void}
   */
  updateInput: function () {
    console.log("range.updateInput()");

    // set the percentage for the input
    let percentage = (100 * range.value) / 8000;

    // update the value of the input range slider
    range.input.value = range.value;

    // change the style of `range.input` background according to its value in percentage
    range.input.style.background = `linear-gradient(90deg, rgba(117,20,241,1) 0%, rgba(175,26,170,1) ${percentage}%, rgba(223,61,90,1) ${percentage}%, rgba(62,48,56,1) ${percentage}%)`;
    range.label.innerText = `$${range.value}`;
  },
  /**
   * Handles the input event on the range slider and updates its appearance and label.
   * @param {Event} event
   * @return {void}
   */
  handleInput: function (event) {
    console.log("range.handleInput()");

    // get the DOM element form which the event occured and use `parseFloat()` to convert the string value to a point number
    range.value = parseInt(event.currentTarget.value);

    // set the percentage for the input
    let percentage = (100 * range.value) / 8000;

    // change the style of the input background according to its value in percentage
    range.input.style.background = `linear-gradient(90deg, rgba(117,20,241,1) 0%, rgba(175,26,170,1) ${percentage}%, rgba(223,61,90,1) ${percentage}%, rgba(62,48,56,1) ${percentage}%)`;
    range.label.innerText = `$${range.value}`;

    range.synchronizeActiveAmountBox();
  },
  /**
   * Handles the click event on amount boxes and updates the selected amount.
   * @param {Event} event
   * @return {void}
   */
  handleAmountSwitch: function (event) {
    console.log("range.handleAmountSwitch()");

    // get the DOM element form which the event occured
    let clickedElement = event.currentTarget;

    // initialaze an index
    let index = 0;
    // the index is the index of the `clickedElement`
    index = range.boxesAmounts.indexOf(clickedElement);

    for (range.box of range.boxesAmounts) {
      // the `clickedElement` is strictly equal to `range.box`
      if (clickedElement === range.box) {
        // add the 'active' class to the clicked element
        clickedElement.classList.add("active");
        // get the value of clicked box which is in a HTML dataset attribut whose name is 'data-amount' and use `parseFloat()` to convert the string value to a point number
        range.value = parseInt(range.box.dataset.amount);
        range.updateInput();
      } else {
        // remove the 'active' class from all other boxes
        range.box.classList.remove("active");
      }
    }
  },
  /**
   * Synchronizes the active amount box with the current range value.
   * Loops through all amount boxes and compares their 'data-amount' value with the current `range.value`.
   * - If a box amount matches the range value, it receives the 'active' class.
   * - All other boxes have the 'active' class removed.
   * This method is used to keep the UI in sync when:
   * - The page is first loaded.
   * - The range input value changes.
   * @return {void}
   */
  synchronizeActiveAmountBox: function () {
    console.log("range.synchronizeActiveAmountBox()");

    for (range.box of range.boxesAmounts) {
      // get the numeric amount from the box's data attribute
      const boxAmount = parseInt(range.box.dataset.amount);

      // activate the box that matches the current range value
      if (boxAmount === range.value) {
        range.box.classList.add("active");
      } else {
        // remove active state from all non-matching boxes
        range.box.classList.remove("active");
      }
    }
  },
};
