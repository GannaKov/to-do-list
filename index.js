import { refs } from "./js/reference.js";
import { renderStartPage } from "./js/renders.js";
import { renderTask } from "./js/renders.js";
import { renderSortedArr } from "./js/renders.js";
import { onListBtnClick } from "./js/customFunctions.js";
import { onStartBtnClick } from "./js/customFunctions.js";
import { onDropdownClick } from "./js/customFunctions.js";
import { onSubmitClick } from "./js/customFunctions.js";
import { arrControl } from "./js/controls.js";

document.addEventListener("DOMContentLoaded", eventListenerControl());

function eventListenerControl() {
  refs.startAddBtn.addEventListener("click", onStartBtnClick);
  refs.listAddBtn.addEventListener("click", onListBtnClick);
  refs.form.addEventListener("submit", onSubmitClick);
  refs.myDropdownMenu.addEventListener("click", onDropdownClick);
}

arrControl();

export function checkArrLength(arr) {
  console.log("in checkArrLength");
  arr.length > 0 ? renderTask(arr) : renderStartPage();
}
