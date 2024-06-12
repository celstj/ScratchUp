import {
    _sidePanel,
    _mainPage,
    _projUl,
    _projectList,
    saveProjectListToLocal,
} from './base.js';

import {
    formInput,
    inputConfirm, 
    inputCancel,
    inputContainer,
    createInputContainer,
    placeInputContainerOnSide,
    handleCancelClick,
    handleConfirmClick,
    createTaskInputElements
} from './ui.js';


const projectTitleCount = {};

function checkProjectList(projectName, addToStorage = true) {
    const untitled = "untitled" + (_projectList.length + 1);
    let projectTitle = projectName || untitled;


    if (projectTitleCount[projectTitle]) {
        projectTitleCount[projectTitle]++;
        projectTitle += ` ${projectTitleCount[projectTitle]}`;
    } else {
        projectTitleCount[projectTitle] = 1;
    }

    const newProject = {
        name: projectTitle,
        tasks: [],
        checklist: [],
        notes: []
    };

    if (addToStorage) {
        // Check if project already exists in _projectList
        const existingProjectIndex = _projectList.findIndex(proj => proj.name === newProject.name);
        if (existingProjectIndex === -1) {
            _projectList.push(newProject);
            saveProjectListToLocal();
            console.log("Data added to storage ", _projectList);
        } else {
            console.log("Project already exists in storage: ", newProject);
        }
    }

    createProjectListItem(newProject);
    createProjectMainSpace(newProject);
    console.log('new project unput:', newProject);
    console.log('new project input name:', newProject.name);

    return newProject;
}


let activeSectionId = null;

function toggleSectionVisibility(sectionId) {
    const section = document.getElementById(sectionId);
    if (activeSectionId !== sectionId) {
        const activeSection = document.getElementById(activeSectionId);
        if (activeSectionId) {
            activeSection.style.display = 'none';
        }
        if (section) {
            section.style.display = 'block';
            activeSectionId = sectionId;
        }
    }
    const allSections = document.querySelectorAll('.proj-pages');
    allSections.forEach(section => {
        if (section.id !== sectionId) {
            section.style.display = 'none';
        }
    });
}

function renderProjectList() {
    _projUl.innerHTML = '';
    _projectList.forEach(project => {
        createProjectListItem(project);
        createProjectMainSpace(project);
        // createTaskListItem()
    });
}


function createProjectListItem(project) {
    const projectTitle = project.name;

    const modifiedId = projectTitle.replace(/\s+/g, '-');

    // console.log("project name:createListItem: ",project.name);

    const p_listItem = document.createElement('li');
    const p_link = document.createElement('a');
    p_link.textContent = projectTitle;
    p_link.classList.add('project-list');
    p_link.href = `#${modifiedId}`;
    p_listItem.appendChild(p_link);
    _projUl.appendChild(p_listItem);

    // project-list edit button
    const projEditBtn = document.createElement('button');
    projEditBtn.classList.add('pt-btns');
    projEditBtn.setAttribute('id', 'edit-btn');
    projEditBtn.textContent = '\uD83D\uDD89';
    p_link.appendChild(projEditBtn);

    // project-list remove button 
    const projRemoveBtn = document.createElement('button');
    projRemoveBtn.classList.add('pt-btns');
    projRemoveBtn.setAttribute('id', 'rm-btn');
    projRemoveBtn.textContent = '\u2715';
    p_link.appendChild(projRemoveBtn);
}

function createProjectMainSpace(project) {
    const projectName = project.name || "untitled";
    const modifiedId = projectName.replace(/\s+/g, '-');

    const mainProjCont = document.createElement('div');
    mainProjCont.setAttribute('id', modifiedId);
    mainProjCont.classList.add('proj-pages');

    const mainProjContTitle = document.createElement('h2');
    mainProjContTitle.textContent = projectName;

    const addNewTaskBtn = document.createElement('div');
    addNewTaskBtn.classList.add('new-task-btn');
    addNewTaskBtn.textContent = '+ New Task';

    mainProjCont.appendChild(mainProjContTitle);
    mainProjCont.appendChild(addNewTaskBtn);
    _mainPage.appendChild(mainProjCont);
    mainProjCont.style.display = 'none';

    addNewTaskBtn.addEventListener('click', () => {
        const existingTaskElement = document.querySelector('.task-creation-container');
        if (!existingTaskElement){
        const newTaskElement = createTaskInputElements();
            document.body.insertBefore(newTaskElement, _sidePanel);
        }
    });
};

// Remove Project List
function rmProjListItem() {
    document.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.id === "rm-btn") {
            const clickedElementListParent = e.target.closest('li');
            const projectHref = e.target.parentNode.getAttribute('href');
            const projectName = projectHref.substring(1).replace(/-/g, ' ');
            const projectIndex = _projectList.findIndex(proj => proj.name === projectName);
            const projectMainSpace = document.getElementById(projectHref.substring(1).replace(/\s+/g, '-'));
            
            if (projectIndex !== -1) {
                _projectList.splice(projectIndex, 1);
                saveProjectListToLocal();
                // renderProjectList();

                if (projectMainSpace) {
                    projectMainSpace.remove();
                }

                if(clickedElementListParent) {
                    clickedElementListParent.remove();
                }

                console.log(`Project "${projectName}" removed from the list`);
            } else {
                console.log(`Project "${projectName}" was not found.`);
            }
        };
    });
}
rmProjListItem();


function editProjectListItem() {
    document.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (e.target.id === "edit-btn") {

            const clickedElement = e.target.closest('a');
            const projectHref = e.target.parentNode.getAttribute('href');
            const projectName = projectHref.substring(1).replace(/-/g, ' ');
            const projectIndex = _projectList.findIndex(proj => proj.name === projectName);
            const inputContainer = createInputContainer();

            inputContainer.setAttribute('id','edit-proj-form');
            clickedElement.appendChild(inputContainer);

            formInput.value = projectName;
            formInput.focus();

            inputCancel.addEventListener('click', () => {
                inputContainer.remove();
            });

            inputConfirm.addEventListener('click', () => {
                const newProjectName = formInput.value.trim();

                if(newProjectName) {
                    const projectMainSpace = document.getElementById(
                        projectHref.substring(1).replace(/\s+/g, '-'));
                    const modifiedId = newProjectName.replace(/\s+/g, '-');
                    const removeBtn = clickedElement.querySelector('#rm-btn');
                    const closestHeaderProjMain = projectMainSpace.querySelector('h2');
                    // update project list
                    _projectList[projectIndex].name = newProjectName;
                    saveProjectListToLocal();

                    // console.log("project name:: " + _projectList[projectIndex].name);
                    
                    // update project link in DOM
                    clickedElement.textContent = newProjectName;
                    clickedElement.href = `#${modifiedId}`;

                    // re-add edit and remove button
                    clickedElement.appendChild(e.target);
                    clickedElement.appendChild(removeBtn);
                    
                    // edit mainPage project title
                    projectMainSpace.id = modifiedId;
                    console.log("proj main space:" + projectMainSpace.id);

                    closestHeaderProjMain.textContent = newProjectName;
                    console.log("cloest header::" + closestHeaderProjMain);

                    inputContainer.remove();
                }

            });
        };            
    });
}
editProjectListItem();


export {
    checkProjectList,
    toggleSectionVisibility,
    renderProjectList,
    createProjectListItem,
    createProjectMainSpace
};