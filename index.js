console.log("hallo");

const toDoList = [];

const form = document.querySelector(".wbs-form");
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
    toDoList.push({ task: task.value, name: taskName.value });
    renderTask();
    taskName.value = "";
    task.value = "";
  }
}

function renderTask() {
  list.innerHTML = "";
  const markup = toDoList
    .map(
      (item) => ` <li class="wbs-item">
            <div class="wbs-card">
              <h2 class="wbs-item__title">${item.name}</h2>
              <p class="wbs-item__text">${item.task}</p>
            </div>
            <button type="button" class="wbs-btn__edit">Edit</button>
            <button type="button" class="wbs-btn__delete">Delete</button>
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
    const editBtns = document.querySelectorAll(".wbs-btn__edit");
    const deleteBtns = document.querySelectorAll(".wbs-btn__delete");
    const taskitems = document.querySelectorAll(".wbs-item");
    taskitems.forEach((btn) => btn.addEventListener("click", onItemClick));
    // console.log(deleteBtns);
    // editBtns.forEach((btn) => btn.addEventListener("click", onEditBtnClick));
    // console.log(deleteBtns);
    // deleteBtns.forEach((btn) =>
    //   btn.addEventListener("click", onDeleteBtnClick)
    // );
  }
}

function deleteTasks(item) {
  item.remove();
}
function onEditBtnClick() {
  console.log("Edit btn");
}
function onItemClick(e) {
  console.log(e.target.className);
  console.log("target", e.target);
  console.log("cur target", e.currentTarget);
  if (e.target.className === "wbs-btn__delete") {
    deleteTasks(e.currentTarget);
  }
}
