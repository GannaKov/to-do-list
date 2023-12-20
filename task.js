const savedToDoList = JSON.parse(localStorage.getItem("toDoList"));
const oneTask = document.querySelector(".wbs-container");

function renderTask() {
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
  oneTask.insertAdjacentHTML("afterbegin", markup);
}

renderTask();
