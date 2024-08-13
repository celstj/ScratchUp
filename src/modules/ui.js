import {
    _sidePanel,
    _mainPage,
    _projUl,
    _projectList
} from './base.js';

import {    
    checkProjectList,
} from './proj.js';

let formInput, inputConfirm, inputCancel, inputContainer, taskCreateContainer;

function createInputContainer() {
    inputContainer = document.createElement('div');
    inputContainer.classList.add("input-container");

    formInput = document.createElement('input');
    formInput.classList.add('form-input');
    formInput.setAttribute('id', 'proj-title-input');
    inputContainer.appendChild(formInput);

    inputConfirm = document.createElement("button");
    inputConfirm.classList.add("input-tick", "input-btn", "confirm-btn");
    inputConfirm.textContent = '\u2713';
    inputContainer.appendChild(inputConfirm);

    inputCancel = document.createElement("button");
    inputCancel.classList.add("input-cross", "input-btn", "cancel-btn");
    inputCancel.textContent = '\u2715';
    inputContainer.appendChild(inputCancel);

    formInput.addEventListener('dragstart', (e) => e.preventDefault());
    formInput.addEventListener('dragover', (e) => e.preventDefault());
    formInput.addEventListener('drop', (e) => e.preventDefault());

    return inputContainer;
}

function placeInputContainerOnSide(container, sidePanel, addProjBtn) {
    sidePanel.insertBefore(container, addProjBtn);

    inputCancel.addEventListener('click', handleCancelClick);
    inputConfirm.addEventListener('click', handleConfirmClick);
}

function handleCancelClick(event) {
    const inputContainer = event.currentTarget.parentNode;
    inputContainer.remove();
}

function handleConfirmClick(event) {
    const projectName = formInput.value.trim();
    if (projectName) {
        checkProjectList(projectName);
        const inputContainer = event.currentTarget.parentNode;
        inputContainer.remove();
    }
}

function createTaskInputElements() {
    taskCreateContainer = document.createElement('div');
    taskCreateContainer.classList.add('task-creation-container');

    const taskBox = document.createElement('div');
    taskBox.classList.add('task-box');

    const taskForm = document.createElement('form');
    taskForm.classList.add('task-form');

    const taskHeader = document.createElement('h3');
    taskHeader.setAttribute('id', 'task-header');
    taskHeader.textContent = "New Task";

    // task Title creation
    const taskTitle = document.createElement('label');
    taskTitle.setAttribute('for', 'task-title');
    taskTitle.textContent = 'Title';

    const taskTitleInput = document.createElement('input');
    taskTitleInput.setAttribute('type', 'text');
    taskTitleInput.setAttribute('id', 'task-title');
    taskTitleInput.setAttribute('name', 'taskTitle');
    
    // task Description creation
    const taskDescription = document.createElement('label');
    taskDescription.setAttribute('for', 'task-description');
    taskDescription.textContent = 'Description';

    const taskDescriptionInput = document.createElement('input');
    taskDescriptionInput.setAttribute('type', 'text');
    taskDescriptionInput.setAttribute('id', 'task-description');
    taskDescriptionInput.setAttribute('name', 'taskDescription');

    // task due date creation
    const taskDue = document.createElement('label');
    taskDue.setAttribute('for', 'task-due');
    taskDue.textContent = 'Due Date';

    const taskDueInput = document.createElement('input');
    taskDueInput.setAttribute('type', 'date');
    taskDueInput.setAttribute('id', 'task-due');
    taskDueInput.setAttribute('name', 'taskDue');
    taskDueInput.setAttribute('max', '9999-12-12');

    taskDueInput.addEventListener('click', () => {
        taskDueInput.showPicker(); // This triggers the date picker to open
    });

    //task priority creation
    const taskPriorityForm = document.createElement('div');
    taskPriorityForm.setAttribute('id', 'task-priority-form');
    const taskPriority = document.createElement('legend');
    taskPriority.textContent = 'Priority';

    const prioritySelectMenu = document.createElement('select');
    prioritySelectMenu.setAttribute('id', 'task-priority');
    prioritySelectMenu.setAttribute('name', 'task-priority');

    const taskPriorityHigh = document.createElement('option');
    taskPriorityHigh.setAttribute('value', 'high priority');
    taskPriorityHigh.textContent = 'High Priority';

    const taskPriorityMedium = document.createElement('option');
    taskPriorityMedium.setAttribute('value', 'medium priority');
    taskPriorityMedium.textContent = 'Medium Priority';


    const taskPriorityLow = document.createElement('option');
    taskPriorityLow.setAttribute('value', 'low priority');
    taskPriorityLow.textContent = 'Low Priority';

    // task confirmation
    const taskConfirm = document.createElement('button');
    taskConfirm.classList.add('task-confirm-btn');
    taskConfirm.textContent = "confirm";

    const taskCancel= document.createElement('button');
    taskCancel.classList.add('task-cancel-btn');
    taskCancel.textContent = '\u2715';
    taskCancel.addEventListener('click', () => {
        taskCreateContainer.remove();
    });

    // Append priority elements
    taskPriorityForm.appendChild(taskPriority);
    taskPriorityForm.appendChild(prioritySelectMenu);
    prioritySelectMenu.appendChild(taskPriorityLow);
    prioritySelectMenu.appendChild(taskPriorityMedium);
    prioritySelectMenu.appendChild(taskPriorityHigh);

/// append elements to form
    taskForm.appendChild(taskHeader);
    taskForm.appendChild(taskTitle);
    taskForm.appendChild(document.createElement('br'));
    taskForm.appendChild(taskTitleInput);
    taskForm.appendChild(document.createElement('br'));
    taskForm.appendChild(taskDescription);
    taskForm.appendChild(document.createElement('br'));
    taskForm.appendChild(taskDescriptionInput);
    taskForm.appendChild(document.createElement('br'));
    taskForm.appendChild(taskDue);
    taskForm.appendChild(document.createElement('br'));
    taskForm.appendChild(taskDueInput);
    taskForm.appendChild(document.createElement('br'));
    taskForm.appendChild(taskPriorityForm);
    taskForm.appendChild(document.createElement('br'));
    taskForm.appendChild(taskConfirm);

    taskBox.appendChild(taskForm);
    taskBox.appendChild(taskCancel);
    taskCreateContainer.appendChild(taskBox);

    return taskCreateContainer;
}

function createTaskList(projectName, newTask, taskIndex) {
    const taskTitleModifiedId = newTask.title.replace(/\s+/g, '-');
    const taskListContainer = document.querySelector(`#${projectName} .todo-list`);

    const toDoListItem = document.createElement('li');
    toDoListItem.classList.add('tasklist-item');
    toDoListItem.setAttribute('id', `task-${taskIndex}`);

    const taskItemId = document.createElement('div');
    taskItemId.setAttribute('id', taskTitleModifiedId);

    const taskLabelBoxMain = document.createElement('div');
    taskLabelBoxMain.classList.add('task-label-main');

    const taskLabelBoxRight = document.createElement('div');
    taskLabelBoxRight.classList.add('task-label-right');

    const lowPriority = document.createElement('div');
    lowPriority.classList.add('priority-circle', 'low-priority');

    const mediumPriority = document.createElement('div');
    mediumPriority.classList.add('priority-circle', 'medium-priority');
    
    const highPriority = document.createElement('div');
    highPriority.classList.add('priority-circle', 'high-priority');

    const taskPriority = newTask.priority;
    
    if (taskPriority === 'low priority') {
        taskItemId.appendChild(lowPriority);
    } else if (taskPriority === 'medium priority') {
        taskItemId.appendChild(mediumPriority);
    } else {
        taskItemId.appendChild(highPriority);
    }

    const taskLabel = document.createElement('h3');
    taskLabel.classList.add('task-title-label');
    taskLabel.textContent = `${newTask.title}`;

    const taskLabelDescription = document.createElement('p');
    taskLabelDescription.classList.add('task-label-description');
    taskLabelDescription.textContent = `${newTask.description}`;

    const taskLabelDueDate = document.createElement('p');
    taskLabelDueDate.classList.add('task-label-duedate');
    taskLabelDueDate.textContent = `${newTask.dueDate}`;

    const taskLabelEdit = document.createElement('button');
    taskLabelEdit.classList.add('task-buttons', 'task-edit-btn');
    taskLabelEdit.textContent = '\uD83D\uDD89';

    const taskLabelDelete = document.createElement('button');
    taskLabelDelete.classList.add('task-buttons', 'task-delete-btn');
    taskLabelDelete.innerHTML = '&#128465;';

    taskLabelBoxMain.appendChild(taskLabel);
    taskLabelBoxMain.appendChild(taskLabelDescription);

    taskLabelBoxRight.appendChild(taskLabelDueDate);
    taskLabelBoxRight.appendChild(taskLabelEdit);
    taskLabelBoxRight.appendChild(taskLabelDelete);

    taskItemId.appendChild(taskLabelBoxMain);
    taskItemId.appendChild(taskLabelBoxRight);
    toDoListItem.appendChild(taskItemId);
    taskListContainer.appendChild(toDoListItem);
}


export {
    formInput,
    inputConfirm, 
    inputCancel,
    inputContainer,
    taskCreateContainer,
    createInputContainer,
    placeInputContainerOnSide,
    handleCancelClick,
    handleConfirmClick,
    createTaskInputElements,
    createTaskList
};