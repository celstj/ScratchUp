

/*
IMPORT BASE

class =  title (?)
    new empty array 

    - visible on sidebar
    - open workspace with Project name as Title
    - DEFAULT project on initial loadout

    - delete
    - (maybe undo)

    edit UI:
        - dynamic name change on side panel
        - edit all constructors in task list workspace
            (dynamically on project open worksplace or popup editable task modal)

     NEW PROJECT BTN from base onclick() => {
        // do something
    }

- delete task
- (maybe) undo prev step
*/

import { sidePanel, mainPage, addProjBtn } from './base.js';

let formInput;

export default function createProj() {

    function addNewProject() {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add("input-container");

        formInput = document.createElement('input');
        formInput.classList.add('form-input');
        inputContainer.appendChild(formInput);

        const inputConfirm = document.createElement("button");
        inputConfirm.classList.add("input-tick", "input-btn");
        inputConfirm.textContent = '\u2713';
        inputContainer.appendChild(inputConfirm);

        const inputCancel = document.createElement("button");
        inputCancel.classList.add("input-cross", "input-btn");
        inputCancel.textContent = '\u2715';
        inputContainer.appendChild(inputCancel);

        sidePanel.insertBefore(inputContainer, addProjBtn);
        sidePanel.insertBefore(document.createElement("br"),addProjBtn);
    }

    addProjBtn.addEventListener('click', () => formInput || addNewProject());

};