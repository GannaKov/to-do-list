import { refs } from "./reference.js";

import {
  onItemClick,
  onDropdownClick,
  onStartBtnClick,
  onListBtnClick,
  onSubmitClick,
} from "./handlers.js";

import { renderStartPage, renderTasks } from "./renders.js";

export function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("toDoList"));
}
export function arrControl() {
  const savedToDoList = getFromLocalStorage();
  refs.toDoList = savedToDoList?.length ? [...savedToDoList] : [];
  checkArrLength(refs.toDoList);
}

export function checkArrLength(arr) {
  arr.length > 0 ? renderTasks(arr) : renderStartPage();
}

export function addListener(arr) {
  if (arr.length != 0) {
    const taskItems = document.querySelectorAll(".wbs-item");
    taskItems.forEach((btn) => btn.addEventListener("click", onItemClick));
  }
}

export function eventListenerControl() {
  refs.startAddBtn.addEventListener("click", onStartBtnClick);
  refs.listAddBtn.addEventListener("click", onListBtnClick);
  refs.form.addEventListener("submit", onSubmitClick);
  refs.myDropdownMenu.addEventListener("click", onDropdownClick);
}

export function deleteTask(item) {
  item.remove();
  refs.toDoList.splice(item.dataset.ind, 1);
  localStorage.setItem("toDoList", JSON.stringify(refs.toDoList));
  checkArrLength(refs.toDoList);
}

export function editTask(item) {
  refs.formSection.classList.remove("hidden");
  refs.listAddBtn.classList.add("hidden");
  const title = item.querySelector(".wbs-item__title");
  const task = item.querySelector(".wbs-item__text");
  refs.taskNameInput.value = title.textContent;
  refs.taskInput.value = task.textContent;
  refs.toDoList.splice(item.dataset.ind, 1);
  localStorage.setItem("toDoList", JSON.stringify(refs.toDoList));
}

export function checkBoxToggle(item) {
  item.classList.toggle("checked");
  item.classList.contains("checked")
    ? (refs.toDoList[item.dataset.ind].checked = true)
    : (refs.toDoList[item.dataset.ind].checked = false);
  localStorage.setItem("toDoList", JSON.stringify(refs.toDoList));
}

export function openTask(item) {
  window.location.href = `./task.html?id=${Number(item.dataset.ind) + 1}`;
}
