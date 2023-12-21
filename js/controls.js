import { refs } from "./reference.js";
//import { toDoList } from "../index.js";
import { checkArrLength } from "../index.js";

export function arrControl() {
  const savedToDoList = JSON.parse(localStorage.getItem("toDoList"));
  refs.toDoList = savedToDoList?.length ? [...savedToDoList] : [];
  checkArrLength(refs.toDoList);
  //toDoList.length > 0 ? renderTask(toDoList) : renderStartPage();
}
