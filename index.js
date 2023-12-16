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
  console.log(taskName, task);
  toDoList.push({ task: task.value, name: taskName.value });
  console.log(toDoList);
  renderTask();
  console.log(form.elements);
  taskName.value = "";
  task.value = "";
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
          </li>`
    )
    .join("");
  list.insertAdjacentHTML("beforeend", markup);
}
