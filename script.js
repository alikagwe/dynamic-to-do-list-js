document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load existing tasks from localStorage
    loadTasks();

    // Add task on button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = ""; // Clear input after adding
        } else {
            alert("Please enter a task.");
        }
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText);
                taskInput.value = "";
            } else {
                alert("Please enter a task.");
            }
        }
    });

    // Function to add task to the DOM and localStorage
    function addTask(taskText, save = true) {
        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Add remove functionality
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeFromStorage(taskText);
        };

        // Append button and list item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to localStorage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from localStorage
    function removeFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Avoid re-saving while loading
    }
});
