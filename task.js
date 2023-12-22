import { getFromLocalStorage } from "./js/customFunctions.js";
import { renderOneTask } from "./js/renders.js";
import { onItemClick } from "./js/handlers.js";
import { refs } from "./js/reference.js";

//const savedToDoList = getFromLocalStorage();

function arrControlOneTask() {
  const savedToDoList = getFromLocalStorage();
  refs.toDoList = savedToDoList?.length ? [...savedToDoList] : [];
  renderOneTask(savedToDoList);
}
arrControlOneTask();
export function addListener() {
  console.log("in Task", refs.toDoList);
  const taskItem = document.querySelector(".wbs-item");
  taskItem.addEventListener("click", onItemClick);
}
addListener();
