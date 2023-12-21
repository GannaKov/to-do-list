import { refs } from "./reference.js";
//import { toDoList } from "../index.js";
import { checkArrLength } from "../index.js";
import { renderSortedArr } from "./renders.js";
import { renderTask } from "./renders.js";
export function addListener(arr) {
  if (arr.length != 0) {
    const taskitems = document.querySelectorAll(".wbs-item");
    taskitems.forEach((btn) => btn.addEventListener("click", onItemClick));
  }
}

function onItemClick(e) {
  if (e.target.classList.contains("wbs-openTask__btn")) {
    openTask(e.currentTarget);
  }
  if (e.target.classList.contains("checkbox")) {
    checkBoxToggle(e.currentTarget);
  }
  if (e.target.classList.contains("wbs-btn__delete")) {
    const item = e.currentTarget;
    Notiflix.Confirm.show(
      "Notiflix Confirm",
      "Are you sure??",
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

function deleteTask(item) {
  item.remove();
  refs.toDoList.splice(item.dataset.ind, 1);
  localStorage.setItem("toDoList", JSON.stringify(refs.toDoList));
  checkArrLength(refs.toDoList);
  // renderTask(toDoList);
}

function editTask(item) {
  refs.formSection.classList.remove("hidden");
  refs.listAddBtn.classList.add("hidden");
  const title = item.querySelector(".wbs-item__title");
  const task = item.querySelector(".wbs-item__text");
  refs.taskNameInput.value = title.textContent;
  refs.taskInput.value = task.textContent;
  refs.toDoList.splice(item.dataset.ind, 1);
  localStorage.setItem("toDoList", JSON.stringify(refs.toDoList));
}
//------------
function okCb(item) {
  return function () {
    deleteTask(item);
  };
}
function checkBoxToggle(item) {
  item.classList.toggle("checked");
  item.classList.contains("checked")
    ? (refs.toDoList[item.dataset.ind].checked = true)
    : (refs.toDoList[item.dataset.ind].checked = false);
  localStorage.setItem("toDoList", JSON.stringify(refs.toDoList));
}
function openTask(item) {
  window.location.href = `./task.html?id=${Number(item.dataset.ind) + 1}`;
}

export function onStartBtnClick() {
  console.log("onStartBtnClick");
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
    renderTask(refs.toDoList);
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
    renderTask(refs.toDoList);
    taskName.value = "";
    task.value = "";
    localStorage.setItem("toDoList", JSON.stringify(refs.toDoList));
  }
}
