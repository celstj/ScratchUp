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
       - side panel project dropdown
       - inside project workspace

    NEW TASK LIST BTN from base onclick() => {
        // do something
    }

- delete task
- (maybe) undo prev step
*/

import { sidePanel, mainPage, addProjBtn, _projUl, projectList } from './base.js';
// import { newProject } from './create-proj.js';

export function createTask(projectName, taskTitle, taskDescription, taskDueDate, taskPriority) {

    const project = projectList.find(proj => proj.name === projectName);

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