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

let formInput, inputConfirm, inputCancel, inputContainer;

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
    const taskCreateContainer = document.createElement('div');
    taskCreateContainer.classList.add('task-creation-container');
    const taskBox = document.createElement('div');
    taskBox.classList.add('task-box');

    const taskForm = document.createElement('form');
    taskForm.classList.add('task-form');

    // task Title creation
    const tTitle = document.createElement('label');
    tTitle.setAttribute('for', 'tTitle');
    tTitle.textContent = 'Title';

    const br1 = document.createElement('br');

    const tTitleInput = document.createElement('input');
    tTitleInput.setAttribute('type', 'text');
    tTitleInput.setAttribute('id', 'tTitle');
    tTitleInput.setAttribute('name', 'tTitle');
    
    // task Description creation

    // task due date creation

    //task priority creation

    //task progress creation

}

export {
    formInput,
    inputConfirm, 
    inputCancel,
    inputContainer,
    createInputContainer,
    placeInputContainerOnSide,
    handleCancelClick,
    handleConfirmClick
};