import {
    _sidePanel,
    _mainPage,
    addProjBtn,
    _projUl,
    _projectList
} from './base.js';

import {    
    checkProjectList,
    renderProjectList,
    createProjectListItem,
    createProjectMainSpace
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
    taskTitle.setAttribute('for', 'tTitle');
    taskTitle.textContent = 'Title';

    const taskTitleInput = document.createElement('input');
    taskTitleInput.setAttribute('type', 'text');
    taskTitleInput.setAttribute('id', 'tTitle');
    taskTitleInput.setAttribute('name', 'tTitle');
    
    // task Description creation
    const taskDescription = document.createElement('label');
    taskDescription.setAttribute('for', 'taskDescription');
    taskDescription.textContent = 'Description';

    const taskDescriptionInput = document.createElement('input');
    taskDescriptionInput.setAttribute('type', 'text');
    taskDescriptionInput.setAttribute('id', 'taskDescription');
    taskDescriptionInput.setAttribute('name', 'taskDescription');

    // task due date creation
    const taskDue = document.createElement('label');
    taskDue.setAttribute('for', 'taskDue');
    taskDue.textContent = 'Due Date';

    const taskDueInput = document.createElement('input');
    taskDueInput.setAttribute('type', 'date');
    taskDueInput.setAttribute('id', 'taskDue');
    taskDueInput.setAttribute('name', 'taskDue');

    //task priority creation
    const taskPriorityForm = document.createElement('div');
    taskPriorityForm.setAttribute('id', 'task-priority');
    const taskPriority = document.createElement('legend');
    taskPriority.textContent = 'Priority';

    const prioritySelectMenu = document.createElement('select');
    prioritySelectMenu.setAttribute('id', 'taskPriority');
    prioritySelectMenu.setAttribute('name', 'taskPriority');

    const taskPriorityHigh = document.createElement('option');
    taskPriorityHigh.setAttribute('value', 'high priority');
    taskPriorityHigh.textContent = 'High Priority';

    const taskPriorityMedium = document.createElement('option');
    taskPriorityMedium.setAttribute('value', 'medium priority');
    taskPriorityMedium.textContent = 'Medium Priority';


    const taskPriorityLow = document.createElement('option');
    taskPriorityLow.setAttribute('value', 'low priority');
    taskPriorityLow.textContent = 'Low Priority';

    //task progress creation
    const taskProgressForm = document.createElement('div');
    taskProgressForm.setAttribute('id', 'task-progress');
    const taskProgress = document.createElement('legend');
    taskProgress.textContent = 'Progress';
    
    const progressSelectMenu = document.createElement('select');
    progressSelectMenu.setAttribute('id', 'taskProgress');
    progressSelectMenu.setAttribute('name', 'taskProgress');

    const taskProgressNotStarted = document.createElement('option');
    taskProgressNotStarted.setAttribute('value', 'not started');
    taskProgressNotStarted.textContent = 'Not Started';

    const taskProgressInProgress = document.createElement('option');
    taskProgressInProgress.setAttribute('value', 'in progress');
    taskProgressInProgress.textContent = 'In Progress';

    const taskProgressComplete = document.createElement('option');
    taskProgressComplete.setAttribute('value', 'complete');
    taskProgressComplete.textContent = 'Complete';


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

    //Append Progress elements
    taskProgressForm.appendChild(taskProgress);
    taskProgressForm.appendChild(progressSelectMenu);
    progressSelectMenu.appendChild(taskProgressNotStarted);
    progressSelectMenu.appendChild(taskProgressInProgress);
    progressSelectMenu.appendChild(taskProgressComplete);

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
    taskForm.appendChild(taskProgressForm);
    taskForm.appendChild(document.createElement('br'));
    taskForm.appendChild(taskConfirm);

    taskBox.appendChild(taskForm);
    taskBox.appendChild(taskCancel);
    taskCreateContainer.appendChild(taskBox);

    return taskCreateContainer;
}

// document.querySelectorAll('input[type="radio"]').forEach(radio => {
//     radio.addEventListener('click', function() {
//         // Uncheck all radios in the same group
//         document.querySelectorAll(`input[name="${this.name}"]`).forEach(
//             r => r.removeAttribute('checked'));
//         // Check the clicked radio
//         this.setAttribute('checked', 'checked');
//         console.log(`${this.id} selected`);
//     });
// });

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
    createTaskInputElements
};