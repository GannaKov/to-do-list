const refs = {
  form: document.querySelector(".wbs-form"),
  list: document.querySelector(".wbs-list"),
  taskNameInput: document.querySelector("#task_name"),
  taskInput: document.querySelector("#task"),
  startSection: document.querySelector(".start__section"),
  startAddBtn: document.querySelector(".wbs-start__btnAdd"),
  listSection: document.querySelector(".list__section"),
  listAddBtn: document.querySelector(".wbs-list__btnAdd"),
  formSection: document.querySelector(".form__section"),
  myDropdownMenu: document.querySelector(".dropdown-menu"),
  dropdown: document.querySelector(".dropdown"),
  dropdownBtn: document.querySelector("#dropdownMenuButton1"),
};
let toDoList = [];
// const form = document.querySelector(".wbs-form");
// const list = document.querySelector(".wbs-list");
// const taskNameInput = document.querySelector("#task_name");
// const taskInput = document.querySelector("#task");
// const startSection = document.querySelector(".start__section");
// const startAddBtn = document.querySelector(".wbs-start__btnAdd");
// const listSection = document.querySelector(".list__section");
// const listAddBtn = document.querySelector(".wbs-list__btnAdd");
// const formSection = document.querySelector(".form__section");

// const myDropdownMenu = document.querySelector(".dropdown-menu");
// const dropdown = document.querySelector(".dropdown");
// const dropdownBtn = document.querySelector("#dropdownMenuButton1");

//document.addEventListener("DOMContentLoaded", formControl());

refs.startAddBtn.addEventListener("click", onStartBtnClick);
refs.listAddBtn.addEventListener("click", onListBtnClick);
refs.form.addEventListener("submit", onSubmitClick);

function arrControl() {
  const savedToDoList = JSON.parse(localStorage.getItem("toDoList"));
  toDoList = savedToDoList?.length ? [...savedToDoList] : [];
  checkArrLength(toDoList);
  //toDoList.length > 0 ? renderTask(toDoList) : renderStartPage();
}
arrControl();

function checkArrLength(arr) {
  console.log("in checkArrLength");
  arr.length > 0 ? renderTask(arr) : renderStartPage();
}

function renderStartPage() {
  console.log("in renderStart");
  refs.startSection.classList.remove("hidden");
  refs.listSection.classList.add("hidden");
}

function onStartBtnClick() {
  console.log("onStartBtnClick");
  refs.formSection.classList.remove("hidden");
  refs.startSection.classList.add("hidden");
}
function onListBtnClick() {
  refs.formSection.classList.remove("hidden");
  refs.listAddBtn.classList.add("hidden");
}
//--------------------

// function formControl() {
//   refs.form.addEventListener("submit", onSubmitClick);
// }

function onSubmitClick(e) {
  e.preventDefault();

  const form = e.target;
  const taskName = form.elements.task_name;
  const task = form.elements.task;
  if (taskName.value.trim() === "" || task.value.trim() === "") {
    alert("Please fill the form before submitting.");
  } else {
    toDoList.unshift({
      name: taskName.value,
      task: task.value,
      checked: false,
    });

    refs.formSection.classList.add("hidden");
    renderTask(toDoList);
    taskName.value = "";
    task.value = "";
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }
}

function renderTask(arr) {
  console.log("renderTask");
  refs.list.innerHTML = "";
  refs.listSection.classList.remove("hidden");
  refs.listAddBtn.classList.remove("hidden");
  const markup = arr
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
  refs.list.insertAdjacentHTML("beforeend", markup);
  addListener(arr);
}
function addListener(arr) {
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
  toDoList.splice(item.dataset.ind, 1);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  checkArrLength(toDoList);
  // renderTask(toDoList);
}

function editTask(item) {
  refs.formSection.classList.remove("hidden");
  refs.listAddBtn.classList.add("hidden");
  const title = item.querySelector(".wbs-item__title");
  const task = item.querySelector(".wbs-item__text");
  refs.taskNameInput.value = title.textContent;
  refs.taskInput.value = task.textContent;
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

refs.myDropdownMenu.addEventListener("click", onDropdownClick);

function onDropdownClick(e) {
  refs.dropdownBtn.textContent = e.target.textContent;
  const itemArr = [...refs.myDropdownMenu.children];

  itemArr.forEach((item) => {
    item.firstElementChild.classList.remove("active");
  });
  e.target.classList.add("active");
  if (e.target.getAttribute("id") === "all") {
    renderTask(toDoList);
  }
  if (e.target.getAttribute("id") === "done") {
    renderSortedArr(toDoList, true);
  }
  if (e.target.getAttribute("id") === "not_done") {
    renderSortedArr(toDoList, false);
  }
}

function renderSortedArr(arr, boolean) {
  refs.list.innerHTML = "";

  const filteredItems = arr.reduce((acc, item, index) => {
    if (item.checked === boolean) {
      acc.push(`
        <li class="wbs-item ${item.checked ? "checked" : ""}" data-ind=${index}>
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
          </li>
      `);
    }
    return acc;
  }, []);
  refs.list.insertAdjacentHTML("beforeend", filteredItems.join(""));
  addListener(arr);
}
