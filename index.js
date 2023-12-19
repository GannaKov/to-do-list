let toDoList = [];
const form = document.querySelector(".wbs-form");
const list = document.querySelector(".wbs-list");
const taskNameInput = document.querySelector("#task_name");
const taskInput = document.querySelector("#task");
document.addEventListener("DOMContentLoaded", formControl());

function arrControl() {
  const savedToDoList = JSON.parse(localStorage.getItem("toDoList"));
  toDoList = savedToDoList?.length ? [...savedToDoList] : [];
  console.log("1", toDoList);
  toDoList.length > 0 && renderTask();
}
arrControl();
//--------------------

function formControl() {
  form.addEventListener("submit", onSubmitClick);
}

function onSubmitClick(e) {
  e.preventDefault();

  const form = e.target;
  const taskName = form.elements.task_name;
  const task = form.elements.task;
  if (taskName.value.trim() === "" || task.value.trim() === "") {
    alert("Please fill the form before submitting.");
  } else {
    toDoList.push({ name: taskName.value, task: task.value, checked: false });
    renderTask();
    taskName.value = "";
    task.value = "";
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }
}

function renderTask() {
  list.innerHTML = "";

  const markup = toDoList
    .map(
      (item, index) => `<li class="wbs-item ${
        item.checked ? "checked" : ""
      }" data-ind=${index}>
            <div class="wbs-card">
            <button class="wbs-openTask__btn" type="button">Open Task</button>
              <div class="wbs-inn_wrp">
                <h2 class="wbs-item__title">${item.name}</h2>
                <span class="wbs-item__checkbox checkbox">
                 <svg
              class="checkbox-icon checkbox"
              viewBox="0 0 32 32"
              style="width: 20px"
            >
              <path class="checkbox" d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
            </svg>
                </span>
                <!-- <label class="wbs-checkBox"> -->
               <!-- <input type="checkbox" class="wbs-item__checkbox" name="status" />-->
                <!-- </label> -->
              </div>
              <div class="wbs-cardBottom">
                <p class="wbs-item__text">${item.task}</p>
                <div class="wbs-btn_wrp">
                  <button type="button" class="wbs-btn__bottom wbs-btn__edit">
                    Edit
                  </button>
                  <button type="button" class="wbs-btn__bottom wbs-btn__delete">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>`
    )
    .join("");
  list.insertAdjacentHTML("beforeend", markup);
  addListener();
}
function addListener() {
  if (toDoList.length != 0) {
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
  if (
    e.target.classList.contains("wbs-btn__delete") ||
    e.target.classList.contains("wbs-btn__edit")
  ) {
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
          // etc...
        }
      );
      //  deleteTask(e.currentTarget);
    }
    if (e.target.classList.contains("wbs-btn__edit")) {
      editTask(e.currentTarget);
    }
  }
}

function deleteTask(item) {
  item.remove();
  toDoList.splice(item.dataset.ind, 1);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  renderTask();
}

function editTask(item) {
  //mes();
  const title = item.querySelector(".wbs-item__title");
  const task = item.querySelector(".wbs-item__text");
  taskNameInput.value = title.textContent;
  taskInput.value = task.textContent;
  toDoList.splice(item.dataset.ind, 1);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
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
    ? (toDoList[item.dataset.ind].checked = true)
    : (toDoList[item.dataset.ind].checked = false);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}
function openTask(item) {
  window.location.href = `./task.html?id=${Number(item.dataset.ind) + 1}`;
}
//---------------
//
// var dropdownElementList = [].slice.call(
//   document.querySelectorAll(".dropdown-toggle")
// );
// var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
//   return new bootstrap.Dropdown(dropdownToggleEl);
// });

const myDropdownMenu = document.querySelector(".dropdown-menu");
const dropdown = document.querySelector(".dropdown");
myDropdownMenu.addEventListener("click", onDropdownClick);

function onDropdownClick(e) {
  console.log(e.target.textContent);
  // bootstrap.Dropdown.getInstance(element);
  console.log(bootstrap.Dropdown.getInstance());
}
