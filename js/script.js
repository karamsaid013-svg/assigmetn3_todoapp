const STORAGE_KEY = "assignment3TodoTasks";

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const feedback = document.querySelector("#feedback");
const emptyState = document.querySelector("#empty-state");

let tasks = loadTasks();

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);

  try {
    return JSON.parse(raw) || [];
  } catch (error) {
    console.warn("Bad saved data, starting fresh.", error);
    return [];
  }
}

function saveTasks() {
  const json = JSON.stringify(tasks);
  localStorage.setItem(STORAGE_KEY, json);
}

function showFeedback(message, success) {
  feedback.textContent = message;

  if (success === true) {
    feedback.classList.add("success");
  } else {
    feedback.classList.remove("success");
  }
}

function isWhitespaceOnly(text) {
  if (text === "") {
    return true;
  }

  for (let i = 0; i < text.length; i++) {
    if (text[i] !== " " && text[i] !== "\t") {
      return false;
    }
  }

  return true;
}

function addTask(text) {
  if (isWhitespaceOnly(text)) {
    showFeedback("Please enter a task before adding it.", false);
    return;
  }

  const newTask = {
    id: `${Date.now()}`,
    text: text,
    completed: false
  };

  tasks = [...tasks, newTask];
  saveTasks();
  renderTasks();
  taskInput.value = "";
  showFeedback("Task added.", true);
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
  showFeedback("Task deleted.", true);
}

function createTaskElement(task) {
  const item = document.createElement("li");
  item.classList.add("task-item");
  item.dataset.id = task.id;

  if (task.completed === true) {
    item.classList.add("completed");
  }

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.classList.add("toggle-button");
  toggleButton.dataset.action = "toggle";
  toggleButton.textContent = "✓";

  if (task.completed === true) {
    toggleButton.setAttribute("aria-label", `Mark ${task.text} as incomplete`);
  } else {
    toggleButton.setAttribute("aria-label", `Mark ${task.text} as complete`);
  }

  const taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.textContent = task.text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete-button");
  deleteButton.dataset.action = "delete";
  deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
  deleteButton.textContent = "Delete";

  item.append(toggleButton);
  item.append(taskText);
  item.append(deleteButton);

  return item;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks
    .map(createTaskElement)
    .forEach((item) => taskList.append(item));

  if (tasks.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  addTask(taskInput.value);
}

function handleTaskListClick(event) {
  const actionButton = event.target.closest("button[data-action]");

  if (!actionButton) {
    return;
  }

  const taskItem = actionButton.closest(".task-item");

  if (!taskItem) {
    return;
  }

  const taskId = taskItem.dataset.id;

  if (actionButton.dataset.action === "toggle") {
    toggleTask(taskId);
  }

  if (actionButton.dataset.action === "delete") {
    deleteTask(taskId);
  }
}

taskForm.addEventListener("submit", handleFormSubmit);
taskList.addEventListener("click", handleTaskListClick);

renderTasks();
