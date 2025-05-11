const textarea = document.getElementById("note");
const saveBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");
const showListBtn = document.getElementById("showList");
const status = document.getElementById("status");

const notes = [];
showListBtn.innerHTML = "📝 Show List";

if (localStorage.getItem("quick-note")) {
  const savedNotes = JSON.parse(localStorage.getItem("quick-note"));
  notes.push(...savedNotes);
}

saveBtn.addEventListener("click", () => {
  const note = textarea.value.trim();
  if (note) {
    notes.push(note);
    showStatus("Note saved!");
    textarea.value = "";
    addNotesToLocalStorage(notes);
    displayNotes(notes);
  }
});

function addNotesToLocalStorage(notes) {
  localStorage.setItem("quick-note", JSON.stringify(notes));
}

function displayNotes(notes) {
  const listContainer = document.getElementById("listContainer");
  listContainer.className = 'list-container';
  listContainer.innerHTML = "";

  if (notes.length > 0) {
    const ul = document.createElement("ul");
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      ul.appendChild(li)
    })
    listContainer.appendChild(ul);
  } else {
    listContainer.textContent = "No notes available.";
  }
}

clearBtn.addEventListener("click", () => {
  textarea.value = "";
  notes.length = 0;
  localStorage.removeItem("quick-note");
  showStatus("Note cleared.");
  displayNotes(notes);
});

function toggleListVisibility() {
  const listContainer = document.getElementById("listContainer");

  if (listContainer.style.display === "block") {
    showListBtn.innerHTML = "📝 Show List";
    listContainer.style.display = "none";
  } else {
    displayNotes(notes);
    showListBtn.innerHTML = "📝 Hide List";
    listContainer.style.display = "block";
  }
}

showListBtn.addEventListener("click", displayNotes);
showListBtn.addEventListener("click", toggleListVisibility);

function showStatus(msg) {
  status.textContent = msg;
  setTimeout(() => (status.textContent = ""), 1500);
}
