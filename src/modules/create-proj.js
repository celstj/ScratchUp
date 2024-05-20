import {
    _sidePanel,
    _projUl,
    _projectList,
    saveProjectListToLocal,
    createProjectListItem,
    createProjectMainSpace,
} from './base.js';


function createProjectList(projectName, addToStorage = true) {
    const untitled = "untitled" + (_projectList.length + 1);
    const projectTitle = projectName || untitled;

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

export {
    createProjectList,
    toggleSectionVisibility
};