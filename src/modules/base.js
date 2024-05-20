import {
    createProjectList,
} from './create-proj.js';

let _sidePanel, _mainPage, addProjBtn, _projUl;
let _projectList = [];

function baseDefault() {
    const header = document.createElement('header');
    const footer = document.createElement('footer');

    header.textContent = 'To do List';
    _mainPage.classList.add('main-page');
    _mainPage.appendChild(header);

    _sidePanel.classList.add('side-panel');

    footer.textContent = 'This is a footer, Odin Project @ celjst';

    return [_sidePanel, _mainPage, footer];
}

function createNavigation() {
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    const mainLinks = [
        { text: 'Home', url: 'index.html' },
        { text: 'Today', url: '#' },
    ];

    mainLinks.forEach(link => {
        const mainLi = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.textContent = link.text;
        anchor.href = link.url;
        mainLi.classList.add('main-list');
        mainLi.appendChild(anchor);
        ul.appendChild(mainLi);
    });

    nav.appendChild(ul);

    return nav;
}

function createProjectContainer() {
    const projContainer = document.createElement('div');
    projContainer.classList.add('project-container');
    const projListTitle = document.createElement('h3');
    projListTitle.textContent = "Projects";
    const projNav = document.createElement('nav');
    _projUl = document.createElement('ul');

    projContainer.appendChild(projListTitle);
    projContainer.appendChild(projNav);
    projNav.appendChild(_projUl);

    return projContainer;
}

function createAddProjectButton() {
    addProjBtn = document.createElement('button');
    addProjBtn.classList.add('projBtn');
    addProjBtn.textContent = '+';
    _sidePanel.appendChild(addProjBtn);
}

function saveProjectListToLocal() {
    localStorage.setItem('projectList', JSON.stringify(_projectList));
}

function restoreProjectList() {
    const storedProjects = localStorage.getItem('projectList');
    if (storedProjects) {
        _projectList = JSON.parse(storedProjects);
        console.log("DATA restored");
        renderProjectList();
    }else {
        console.log("unable to restore DATA");
    }
}

function renderProjectList() {
    _projUl.innerHTML = '';
    _projectList.forEach(project => {
        createProjectListItem(project);
        createProjectMainSpace(project);
    });
}

function createProjectListItem(project) {
    const projectTitle = project.name;
    const modifiedId = projectTitle.replace(/\s+/g, '-');

    console.log("project name:createListItem: ",project.name);

    const p_listItem = document.createElement('li');
    const p_link = document.createElement('a');
    p_link.textContent = projectTitle;
    p_link.classList.add('project-list');
    p_link.href = `#${modifiedId}`;
    p_listItem.appendChild(p_link);
    _projUl.appendChild(p_listItem);
}

function createProjectMainSpace(project) {
    const projectName = project.name || "untitled";
    const modifiedId = projectName.replace(/\s+/g, '-');

    const mainProjCont = document.createElement('div');
    mainProjCont.setAttribute('id', modifiedId);
    mainProjCont.classList.add('proj-pages');

    const mainProjContTitle = document.createElement('h2');
    mainProjContTitle.textContent = projectName;

    mainProjCont.appendChild(mainProjContTitle);
    _mainPage.appendChild(mainProjCont);
    mainProjCont.style.display = 'none';
}

function initBaseElements() {
    _sidePanel = document.createElement('div');
    _mainPage = document.createElement('div');

    const [sidePanel, mainPage, footer] = baseDefault();
    document.body.appendChild(sidePanel);
    document.body.appendChild(mainPage);
    document.body.appendChild(footer);

    const navElement = createNavigation();
    _sidePanel.appendChild(navElement);

    const projContainer = createProjectContainer();
    _sidePanel.appendChild(projContainer);

    createAddProjectButton();
}

export {
    _sidePanel,
    addProjBtn,
    _projUl,
    _projectList,
    restoreProjectList,
    saveProjectListToLocal,
    renderProjectList,
    createProjectListItem,
    createProjectMainSpace,
    initBaseElements
};