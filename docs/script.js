let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.onclick = () => toggleTask(index);

        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.className = "delete-btn";
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    input.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

/* Popup functions */
function clearAll() {
    document.getElementById("popup").style.display = "flex";
}

function confirmClear() {
    tasks = [];
    renderTasks();
    closePopup();
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

/* Load + Enter key */
document.addEventListener("DOMContentLoaded", function () {
    renderTasks();

    document.getElementById("taskInput").addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
});
