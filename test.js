import { refs } from "./js/reference.js";

const taskItem = document.querySelector(".wbs-item");
taskItem.addEventListener("click", onItemClick);

export function onItemClick(e) {
  if (e.target.classList.contains("wbs-btn__edit")) {
    editTaskTest(e.currentTarget);
  }
  //   if (e.target.classList.contains("okBtn")) {
  //     editTaskTest(e.currentTarget);
  //   }
}

function editTaskTest(item) {
  const title = item.querySelector(".wbs-item__title");
  const task = item.querySelector(".wbs-item__text");
  const textarea = item.querySelector(".wbs-item__textArea ");
  const input = item.querySelector(".wbs-item__input");
  const editOkBtn = item.querySelector(".wbs-btn__edit");
  editOkBtn.classList.toggle("okBtn");
  title.classList.toggle("hidden");
  input.classList.toggle("hidden");
  task.classList.toggle("hidden");
  textarea.classList.toggle("hidden");
  if (editOkBtn.classList.contains("okBtn")) {
    editOkBtn.textContent = "OK";
    input.value = title.textContent;
    textarea.value = task.textContent.trim().replace(/\s\s+/g, " ");
    textarea.style.height = textarea.scrollHeight + "px";
  } else {
    editOkBtn.textContent = "Edit";
    title.textContent = input.value;
    task.textContent = textarea.value;
    task.style.whiteSpace = "pre-wrap";
  }
}

// Prev Vers
// export function editTask(item) {
//   refs.formSection.classList.remove("hidden");
//   refs.listAddBtn.classList.add("hidden");
//   const title = item.querySelector(".wbs-item__title");
//   const task = item.querySelector(".wbs-item__text");
//   refs.taskNameInput.value = title.textContent;
//   refs.taskInput.value = task.textContent;
//   refs.toDoList.splice(item.dataset.ind, 1);
//   localStorage.setItem("toDoList", JSON.stringify(refs.toDoList));
// }
