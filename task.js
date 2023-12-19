const savedToDoList = JSON.parse(localStorage.getItem("toDoList"));
function renderTask() {
  const params = new URLSearchParams(window.location.search);
  console.log(params);
  const id = Number(params.get("id")) - 1;
  console.log(id);
  console.log(savedToDoList[id]);

  const markup = `<li class="wbs-item ${
    savedToDoList[id].checked ? "checked" : ""
  }" data-ind=${id}>
              <div class="wbs-card">
              <button class="wbs-openTask__btn" type="button">Open Task</button>
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
            </li>`;

  console.log(markup);
}

renderTask();
// function getParameterByName(name, url) {
//   if (!url) url = window.location.href;

//   const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);

//   if (!results) return null;
//   if (!results[2]) return "";

//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }
