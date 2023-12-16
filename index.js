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

  const markup = toDoList
    .map(
      (item, index) => `<li class="wbs-item" data-ind=${index}>
            <div class="wbs-card">
              <div class="wbs-inn_wrp">
                <h2 class="wbs-item__title">${item.name}</h2>
                <!-- <label class="wbs-checkBox"> -->
                <input type="checkbox" name="status" />
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

function deleteTask(item) {
  item.remove();
  toDoList.splice(item.dataset.ind, 1);
  renderTask();
}

function onItemClick(e) {
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
function editTask(item) {
  //mes();
  const title = item.querySelector(".wbs-item__title");
  const task = item.querySelector(".wbs-item__text");
  taskNameInput.value = title.textContent;
  taskInput.value = task.textContent;
  toDoList.splice(item.dataset.ind, 1);
}
//------------
function okCb(item) {
  return function () {
    // Ваша логика здесь, используя параметр
    deleteTask(item);
  };
}
