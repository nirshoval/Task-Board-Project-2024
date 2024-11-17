"strict-mode";

// Create array
let tasks = [];

// load tasks from local storage
loadFromLocalStorage();

// Add new task to the array 
function addData() {

    // Prevent Refresh
    event.preventDefault();

    const titleBox = document.getElementById("titleBox");
    const taskDetailBox = document.getElementById("taskDetailBox");
    const dueDateBox = document.getElementById("dueDateBox");
    const timeBox = document.getElementById("timeBox");

    // Add value to object
    const task = {
        title: titleBox.value,
        detail: taskDetailBox.value,
        date: dueDateBox.value,
        time: timeBox.value,
        id: +tasks.length
    };

    // display array of tasks
    displayNewTask(task, tasks.length);

    // Add the new task object to array
    tasks.push(task);

    // save to local storage
    saveToLocalStorage();

    clearUI();
}

// Display new tasks in the container
function displayNewTask(newTask, currentTasksLength) {
    const tasksContainer = document.getElementById("tasksContainer");
    const child = document.createElement("div");
    child.setAttribute("class", "task");
    const date = new Date(newTask.date);
    const formattedDate = date.toLocaleDateString("en-GB");
    child.innerHTML = `<span id ="${currentTasksLength}" class="deleteIcon btn btn-danger" onclick="deleteTask(this)">
                            ❌
                        </span>
                        <h4 class="task-title">
                            ${newTask.title}
                        </h4>
                        <h6 class="task-detail scroll">
                            ${newTask.detail}
                        </h6>
                        <p class="task-footer">
                            <span class="due-date">${formattedDate}</span>
                            <span class="time">${newTask.time}</span>
                        </p>`
    tasksContainer.appendChild(child);

    child.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Display Tasks
function displayAllTasks() {
    const tasksContainer = document.getElementById("tasksContainer");
    let content = "";
    for (const task of tasks) {
        const date = new Date(task.date);
        const formattedDate = date.toLocaleDateString("en-GB");
        content += `<div class="task">
                        <span id ="${task.id}" class="deleteIcon btn" onclick="deleteTask(this)">
                        ❌
                        </span>
                        <h4 class="task-title">
                            ${task.title}
                        </h4>
                        <br>
                        <h6 class="task-detail scroll">
                            ${task.detail}
                        </h6>
                        <p class="task-footer">
                            <span class="due-date">${formattedDate}</span>
                            <span class="time">${task.time}</span>
                        </p>
                    </div>`;
    }
    tasksContainer.innerHTML = content;
}

// Find task index in array from element id
function findTaskIndex(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            return i;
        }
    }
    return -1;
}

// Delete task
function deleteTask(element) {
    const sure = confirm("Are you sure?");
    if(!sure) return;
    const id = +element.id;
    const task = document.getElementById(id);
    task.parentElement.remove();
    const index = findTaskIndex(id);
    if (index < 0) {
        return;
    }
    tasks.splice(index, 1);
    saveToLocalStorage();
}

// Reset Boxes
function clearUI() {
    // Clear Boxes
    titleBox.value = "";
    taskDetailBox.value = "";
    dueDateBox.value = "";
    timeBox.value = "";
  
    // Put focus to the Title box
    titleBox.focus();
  }

// Save to Local Storage
function saveToLocalStorage() {
    const json = JSON.stringify(tasks);
    localStorage.setItem("tasks-list", json);
}

// Load from Local Storage
function loadFromLocalStorage() {
    const json = localStorage.getItem("tasks-list");
    if (json !== null && json.length > 0) {
        tasks = JSON.parse(json);
    }
    displayAllTasks();
}



// When the user scrolls down the page - show the button
let backToTop = document.getElementById("backToTop");
window.onscroll = function() {scrollFunction()};

// Toggles button visibility based on scroll position
function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
}

// When the user clicks on the button - scroll up
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}



