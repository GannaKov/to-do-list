import { refs } from "./reference.js";
import { renderSortedArr, renderTasks } from "./renders.js";

import {
  openTask,
  checkBoxToggle,
  editTask,
  deleteTask,
} from "./customFunctions.js";

export function onItemClick(e) {
  if (e.target.classList.contains("wbs-openTask__btn")) {
    openTask(e.currentTarget);
  }
  if (e.target.classList.contains("checkbox")) {
    checkBoxToggle(e.currentTarget);
  }
  if (e.target.classList.contains("wbs-btn__delete")) {
    const item = e.currentTarget;
    Notiflix.Confirm.show(
      "Confirm",
      "Are you sure?",
      "Yes",
      "No",
      okCb(item),
      function cancelCb() {
        alert("If you say so...");
      },
      {
        width: "320px",
        borderRadius: "8px",
      }
    );
  }
  if (e.target.classList.contains("wbs-btn__edit")) {
    editTask(e.currentTarget);
  }
}

export function onStartBtnClick() {
  refs.formSection.classList.remove("hidden");
  refs.startSection.classList.add("hidden");
}
export function onListBtnClick() {
  refs.formSection.classList.remove("hidden");
  refs.listAddBtn.classList.add("hidden");
}

export function onDropdownClick(e) {
  refs.dropdownBtn.textContent = e.target.textContent;
  const itemArr = [...refs.myDropdownMenu.children];

  itemArr.forEach((item) => {
    item.firstElementChild.classList.remove("active");
  });
  e.target.classList.add("active");
  if (e.target.getAttribute("id") === "all") {
    renderTasks(refs.toDoList);
  }
  if (e.target.getAttribute("id") === "done") {
    renderSortedArr(refs.toDoList, true);
  }
  if (e.target.getAttribute("id") === "not_done") {
    renderSortedArr(refs.toDoList, false);
  }
}

export function onSubmitClick(e) {
  e.preventDefault();

  const form = e.target;
  const taskName = form.elements.task_name;
  const task = form.elements.task;
  if (taskName.value.trim() === "" || task.value.trim() === "") {
    alert("Please fill the form before submitting.");
  } else {
    refs.toDoList.unshift({
      name: taskName.value,
      task: task.value,
      checked: false,
    });

    refs.formSection.classList.add("hidden");
    renderTasks(refs.toDoList);
    taskName.value = "";
    task.value = "";
    localStorage.setItem("toDoList", JSON.stringify(refs.toDoList));
  }
}

function okCb(item) {
  return function () {
    deleteTask(item);
  };
}
