import { refs } from "./reference.js";
import { addListener } from "./customFunctions.js";

export function renderStartPage() {
  console.log("in renderStart");
  refs.startSection.classList.remove("hidden");
  refs.listSection.classList.add("hidden");
}

export function renderTasks(arr) {
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
                <p class="wbs-item__text short-task">${item.task}</p>
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

export function renderSortedArr(arr, boolean) {
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
                <p class="wbs-item__text short-task">${item.task}</p>
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
//------------
export function renderOneTask(savedToDoList) {
  const params = new URLSearchParams(window.location.search);

  const id = Number(params.get("id")) - 1;

  const markup = `<div class="wbs-item ${
    savedToDoList[id].checked ? "checked" : ""
  }" data-ind=${id}>
              <div class="wbs-card">
              
                <div class="wbs-inn_wrp">
                  <h2 class="wbs-item__title">${savedToDoList[id].name}</h2>
                  <span class="wbs-item__checkbox checkbox">
                   <svg
                class="checkbox-icon checkbox"
                viewBox="0 0 32 32"
                style="width: 20px"
              >
                <path class="checkbox" d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
              </svg>
                  </span>
                </div>
                <div class="wbs-cardBottom">
                  <p class="wbs-item__text">${savedToDoList[id].task}</p>
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
            </div>`;
  refs.oneTask.insertAdjacentHTML("afterbegin", markup);
}