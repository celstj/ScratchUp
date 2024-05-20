import './main.css';
import _ from 'lodash';  // Import lodash if needed
import {
    _sidePanel,
    addProjBtn,
    _projUl,
    _projectList,
    restoreProjectList,
    initBaseElements
} from '../src/modules/base.js';

import {
    createInputElements,
} from '../src/modules/ui.js';

import {
    createProjectList,
    toggleSectionVisibility
} from '../src/modules/create-proj.js';


document.addEventListener('DOMContentLoaded', () => {
    // Initialize the base elements
    initBaseElements();

    // Initialize the application
    restoreProjectList();

    // Add starter project if no projects exist in local storage
    if (!_projectList.length) {
        createProjectList('workout');  // false indicates not to add to storage again
    }

    // Initialize the UI related to project creation
    addProjBtn.addEventListener('click', () => {
        const inputContainer = document.querySelector('.input-container');
        if (!inputContainer) {
            createInputElements();
        }
    });

    document.addEventListener('click', (e) => {
        const clickedProjectList = e.target;
        if (clickedProjectList.classList.contains('project-list')) {
            e.preventDefault();
            const sectionId = clickedProjectList.getAttribute('href').substring(1);
            toggleSectionVisibility(sectionId);
        }
    });
});

    