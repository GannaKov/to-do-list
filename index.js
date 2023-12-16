const toDoList = [];

const form = document.querySelector(".wbs-form");
const taskNameInput = document.querySelector("#task_name");
const taskInput = document.querySelector("#task");
//--------------------
form.addEventListener("submit", onSubmitClick);
const list = document.querySelector(".wbs-list");

function onSubmitClick(e) {
  e.preventDefault();

  const form = e.target;
  const taskName = form.elements.task_name;
  const task = form.elements.task;
  if (taskName.value.trim() === "" || task.value.trim() === "") {
    alert("Please fill the form before submitting.");
  } else {
    toDoList.push({ name: taskName.value, task: task.value });
    renderTask();
    taskName.value = "";
    task.value = "";
  }
}

function renderTask() {
  list.innerHTML = "";
  console.log("in render", toDoList);
  const markup = toDoList
    .map(
      (item, index) => ` <li class="wbs-item" data-ind=${index}>
            <div class="wbs-card">
              <h2 class="wbs-item__title">${item.name}</h2>
              <p class="wbs-item__text">${item.task}</p>
            </div>
            <button type="button" class="wbs-btn__edit" data-ind=${index}>Edit</button>
            <button type="button" class="wbs-btn__delete" data-ind=${index}>Delete</button>
          </li>`
    )
    .join("");
  list.insertAdjacentHTML("beforeend", markup);
  addListener();
  //   const editBtn = document.querySelector(".wbs-btn__edit");
  //   const deleteBtn = document.querySelector(".wbs-btn__delete");
}
function addListener() {
  if (toDoList.length != 0) {
    const taskitems = document.querySelectorAll(".wbs-item");
    taskitems.forEach((btn) => btn.addEventListener("click", onItemClick));
  }
}

function deleteTask(item) {
  item.remove();
  toDoList.splice(item.dataset.ind, 1);
  renderTask();
}

function onItemClick(e) {
  if (e.target.className === "wbs-btn__delete") {
    deleteTask(e.currentTarget);
  }
  if (e.target.className === "wbs-btn__edit") {
    editTask(e.currentTarget);
  }
}
function editTask(item) {
  const title = item.querySelector(".wbs-item__title");
  const task = item.querySelector(".wbs-item__text");
  taskNameInput.value = title.textContent;
  taskInput.value = task.textContent;
  toDoList.splice(item.dataset.ind, 1);
}
