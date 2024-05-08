
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

import { sidePanel, mainPage, addProjBtn, _projUl, projectList } from './base.js';


export default function createProj() {

    let formInput, inputConfirm, inputCancel;

    function createInputElements() {
        // form Input container creation for project List
        const inputContainer = document.createElement('div');
        inputContainer.classList.add("input-container");

        formInput = document.createElement('input');
        formInput.classList.add('form-input');
        formInput.setAttribute('id','proj-title-input');
        inputContainer.appendChild(formInput);

        inputConfirm = document.createElement("button");
        inputConfirm.classList.add("input-tick", "input-btn", "confirm-btn");
        inputConfirm.textContent = '\u2713';
        inputContainer.appendChild(inputConfirm);

        inputCancel = document.createElement("button");
        inputCancel.classList.add("input-cross", "input-btn", "cancel-btn");
        inputCancel.textContent = '\u2715';
        inputContainer.appendChild(inputCancel);

        sidePanel.insertBefore(inputContainer, addProjBtn);

        inputCancel.addEventListener('click', handleCancelClick);
        inputConfirm.addEventListener('click', handleConfirmClick);
    }

    addProjBtn.addEventListener('click', () =>{
        const inputContainer = document.querySelector('.input-container');
        if (!inputContainer) {
            createInputElements();
        }
    });
    
    function handleCancelClick(event) {
        const inputContainer = event.currentTarget.parentNode;
            inputContainer.remove();
    }

    function handleConfirmClick(event) {
        const inputContainer = event.currentTarget.parentNode;
        const projectName = formInput.value;

        inputContainer.remove();
        createProjectList(projectName);
    }
    
    let counter = 1;
    
    // grab input value and push into 'project list' array
    function createProjectList(projectName) {
        const untitled = "untitled" + counter;
        const projectTitle = projectName || untitled;
        const modifiedId = projectTitle.replace(/\s+/g, '-');

        // increment counter after setting href, for unique 'untitled' projects
        counter++;

        const p_listItem = document.createElement('li');
        const p_link = document.createElement('a');

        // attach input string to link text or "untitled" if String = empty
        p_link.textContent = projectTitle;
        p_link.classList.add('project-list');
        p_link.href = `#${modifiedId}`;

        p_listItem.appendChild(p_link);
        _projUl.appendChild(p_listItem);
        ///
        ///!! TODO : stock projectList into a database save etcetc
        //

        // new proejct object with name and empty tasks array

        projectList.push({
            name: projectTitle,
            tasks: [],
            checklist: [],
            notes: []
        });
        createProjectMainSpace(projectTitle);
    }
    

    function createProjectMainSpace(projectTitle) {
        const modifiedId = projectTitle.replace(/\s+/g, '-');

        const mainProjCont = document.createElement('div');
        mainProjCont.setAttribute('id', modifiedId);
        mainProjCont.classList.add('proj-pages');

        const mainProjContTitle = document.createElement('h2');
        mainProjContTitle.textContent = projectTitle;

        mainProjCont.appendChild(mainProjContTitle);
        mainPage.appendChild(mainProjCont);

        mainProjCont.style.display = 'none';
    }


    // handle dynamically added project list links
    document.addEventListener('click', (e) => {
        const clickedProjectList = e.target;

        if (clickedProjectList.classList.contains('project-list')) {
            e.preventDefault();
            const sectionId = clickedProjectList.getAttribute('href').substring(1);
            toggleSectionVisibility(sectionId);
        }
    });

    let activeSectionId = null;

    function toggleSectionVisibility(sectionId) {
        const section = document.getElementById(sectionId);

        if (activeSectionId !== sectionId) {
            const activeSection = document.getElementById(activeSectionId);

            if (activeSection) {
                activeSection.style.display = 'none';
                console.log("previops active section: " + activeSection.value);
            } 
            if (section) {
                section.style.display = 'block';
                activeSectionId = sectionId;
                console.log("current active section: " + activeSectionId);
            }    
        }

        //hide other sections
        const allSections = document.querySelectorAll('.proj-pages');
        allSections.forEach(section => {
            if (section.id !== sectionId) {
                section.style.display = 'none';
            }
        });
    }

    // document.addEventListener('DOMContentLoaded', handleSideProjectLinks);
};
