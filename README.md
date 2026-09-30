# Assignment 3: Interactive To-Do List App

A fully interactive to-do list built using only HTML, CSS, and vanilla JavaScript.

## Features

- Add a task using the **Add Task** button or the **Enter** key.
- Reject empty/whitespace-only tasks with visible feedback.
- Mark tasks as complete or incomplete.
- Delete individual tasks.
- Persist tasks and completion state with `localStorage`.
- Re-render the list dynamically without a page reload.
- Responsive layout for desktop and mobile screens.
- Uses JavaScript array methods `map()` and `filter()`.

## Chapter-Aligned JavaScript

The JavaScript was kept close to Sessions 07-09:

- `const`, `let`, objects, arrays, conditionals, functions, template literals
- `map()`, `filter()`, and `forEach()`
- DOM selection with `querySelector()`
- DOM creation with `createElement()`, `textContent`, `classList`, `dataset`, `append()`
- Event listeners, `preventDefault()`, event delegation, `closest()`
- `localStorage`, `JSON.stringify()`, and `JSON.parse()`
- `try/catch`
- Spread syntax for adding/updating array items


## Project Structure

```text
assignment3_todo_app/
|-- index.html
|-- css/
|   `-- style.css
|-- js/
|   `-- script.js
|-- screenshots/
|   |-- empty-state.png
|   |-- tasks-state.png
|   `-- mobile-state.png
`-- README.md
```

## How to Run

1. Open the project folder.
2. Double-click `index.html`, or open it in any modern browser.
3. No framework, package installation, or external library is required.

## Main JavaScript Functions

- `loadTasks()` - loads tasks from localStorage with `try/catch`.
- `saveTasks()` - saves the tasks array using JSON.
- `showFeedback()` - displays validation/success messages.
- `isWhitespaceOnly()` - rejects empty or whitespace-only task input.
- `addTask()` - validates and adds a task.
- `toggleTask()` - updates complete/incomplete state using `map()`.
- `deleteTask()` - deletes a task using `filter()`.
- `createTaskElement()` - creates one task's DOM elements.
- `renderTasks()` - clears and rebuilds the visible list.
- `handleFormSubmit()` - handles the form submit event.
- `handleTaskListClick()` - uses event delegation for toggle/delete actions.
