import { getFromLocalStorage } from "./js/customFunctions.js";
import { renderOneTask } from "./js/renders.js";

const savedToDoList = getFromLocalStorage();

renderOneTask(savedToDoList);
