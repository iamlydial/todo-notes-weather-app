// general local storage logic
// constant variable that will select of HTML elements that will be manipulated in the JS code.
// The Document method querySelector() returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned.
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelector(".input-box");
const taskContainer = document.querySelector(".todo-list-container");
const tasks = document.querySelector(".checked");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateLocalStorageTask() {
  localStorage.setItem("tasks", taskContainer.innerHTML);
}

//creation of notes logic starts
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "assets/delete.png";
  notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateLocalStorage();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.onkeyup = function () {
        updateLocalStorage();
      };
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

// to do list column logic starts

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("todo-list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Write Something!");
  } else {
    let background = document.createElement("div");
    background.className = "todo-list-class";
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    // crate a span for the cross icon
    let span = document.createElement("span");
    // add cross icon symbol
    span.innerHTML = "\u00d7";
    span.addEventListener("click", function () {
      background.remove(); // Remove the background div when the cross icon is clicked
    });
    // append the icon to the li element
    li.appendChild(span);
    background.appendChild(li);
    // Append the background div to the list container
    listContainer.appendChild(background);
  }
  inputBox.value = "";
  saveData();
}

// Add an event listener for the Enter key press
inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default Enter key behavior (e.g., creating a line break)
    addTask(); // Call the addTask function to add the task
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      let background = e.target.closest(".todo-list-class");
      if (background) {
        background.remove();
      }
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
