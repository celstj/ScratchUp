import {
    checkProjectList,
    toggleSectionVisibility,
    renderProjectList,
    createProjectListItem,
    createProjectMainSpace
} from './proj.js';

let _sidePanel, _mainPage, addProjBtn, _projUl;
let _projectList = [];

function baseDefault() {
    const header = document.createElement('header');
    const footer = document.createElement('footer');

    header.textContent = 'Scratch Up';
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
    _mainPage,
    addProjBtn,
    _projUl,
    _projectList,
    restoreProjectList,
    saveProjectListToLocal,
    initBaseElements
};