

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

import { sidePanel, mainPage } from './base.js';


export default function createProj() {
    const projs = document.createElement('h3');
    projs.textContent = "Projects";

    sidePanel.appendChild(projs);
};