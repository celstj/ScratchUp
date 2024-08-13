import './main.css';
import _ from 'lodash';  // Import lodash if needed
import {
    _sidePanel,
    _mainPage,
    addProjBtn,
    _projUl,
    _projectList,
    restoreProjectList,
    initBaseElements
} from '../src/modules/base.js';

import {
    createInputContainer,
    placeInputContainerOnSide,
} from '../src/modules/ui.js';

import {
    checkProjectList,
    toggleSectionVisibility,
} from './modules/proj.js';

import {
    todayUpComingTasks,
} from './modules/task.js';



document.addEventListener('DOMContentLoaded', () => {
    // Initialize the base elements
    initBaseElements();

    // Initialize the application
    restoreProjectList();

    // render Today and Upcoming's tasks
    todayUpComingTasks();

    // Add starter project if no projects exist in local storage
    if (!_projectList.length) {
        checkProjectList('workout');  // false indicates not to add to storage again
    }

    // Initialize the UI related to project creation
    addProjBtn.addEventListener('click', () => {
        const inputContainer = document.querySelector('.input-container');
        if (!inputContainer) {
            createInputContainer();
            placeInputContainerOnSide(createInputContainer(), _sidePanel, addProjBtn);
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

    const upcomingNav = document.querySelector('#upcoming');

    if (upcomingNav) {
        upcomingNav.style.display = 'none';
    }

});