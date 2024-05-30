// import base from '../modules/base.js';

/*
IMPORT BASE


    append in project array (name) ??
        constructor/class
            - title
            - description
            - due date
            - priority : low, medium, high
            - progress : not started, in progress, complete

    placement: 
       - inside project workspace

    NEW TASK LIST BTN from base onclick() => {
        // do something
    }

- delete task
- (maybe) undo prev step
*/

import {
    checkProjectList,
    toggleSectionVisibility,
    renderProjectList,
    createProjectListItem,
    createProjectMainSpace
} from './proj.js';

import {
    _sidePanel,
    _mainPage,
    addProjBtn,
    _projUl,
    _projectList,
    restoreProjectList,
    saveProjectListToLocal,
    initBaseElements
} from './base.js';

import {
    projectInputElement,
    handleCancelClick,
    handleConfirmClick
} from './ui.js';


function createTaskItem(projectName, taskTitle, taskDescription, taskDueDate, taskPriority) {

    const project = _projectList.find(proj => proj.name === projectName);

    if (project) {
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
            priority: taskPriority
        };

        project.tasks.push(newTask);

        // Add UI logic to display the new task list
        // For example, you can create DOM elements and append them to the page
    } else {
        console.error(`Project ${projectName} not found.`);
    }
};

function renderTaskItem() {

}

export {
    createTaskItem,
    renderTaskItem
};