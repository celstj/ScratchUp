import {
    _sidePanel,
    addProjBtn,
    _projUl,
    _projectList
} from './base.js';

import {    
    createProjectList
} from './create-proj';

let formInput, inputConfirm, inputCancel;


function createInputElements() {
    const inputContainer = document.createElement('div');
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

    _sidePanel.insertBefore(inputContainer, addProjBtn);

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
        createProjectList(projectName);
        const inputContainer = event.currentTarget.parentNode;
        inputContainer.remove();
    }
}

export {
    createInputElements,
    handleCancelClick,
    handleConfirmClick
};