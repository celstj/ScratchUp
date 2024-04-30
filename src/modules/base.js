// import '../main.css';
/*
IMPORT ALL MODULES



- side panel
    - nav list(?)
- logo/hamburg

    side panel
        - show project title (array)? (edit, delete)
        - show task list inside title (edit, delete)
        - new project ( on main side panel )
        - new task  (next to project name (+) icon )

    workspace
        - project title
        - task list (title, desc, duedate, priority) (edit, delete btn)
        - new task  (inside project, giant (+) icon somewhere)


    ((potential
        - today tab
        - tomorrow tab
        - upcoming tab
*/

let _sidePanel, _mainPage, _addProj, _projUl;

const _projectList = [];

export default function base() {

    _sidePanel = document.createElement('div');
    _mainPage = document.createElement('div');

    function baseDefault(){
        const header = document.createElement('header');
        const footer = document.createElement('footer');
    
        header.textContent = 'To do List';
        _mainPage.classList.add('main-page');
        _mainPage.appendChild(header);

        _sidePanel.classList.add('side-panel');

        footer.textContent = 'this is a footer, Odin Project @ celjst';
    
        return [_sidePanel, _mainPage, footer];
    }

    const [sidePanel, mainPage, footer] = baseDefault();
        
    document.body.appendChild(sidePanel);
    document.body.appendChild(mainPage);
    document.body.appendChild(footer);


    function navigation() {
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');

        const mainLinks = [
            {text: 'Home', url: 'index.html'},
            {text: 'Today', url: '#'},
        ];

        mainLinks.forEach(link => {
            const mainLi = document.createElement('li');
            const anchor = document.createElement('a');
            mainLi.classList.add('main-list');
            anchor.textContent = link.text;
            anchor.href = link.url;
            mainLi.appendChild(anchor);
            ul.appendChild(mainLi);
        });

        nav.appendChild(ul);

        return nav;
    }

    const navElement = navigation();
    _sidePanel.appendChild(navElement);

    const projContainer = document.createElement('div');
    projContainer.classList.add('project-container');
    const projListTitle = document.createElement('h3');
    projListTitle.textContent = "Projects";
    const projNav = document.createElement('nav');
    _projUl = document.createElement('ul');

    projContainer.appendChild(projListTitle);
    projContainer.appendChild(projNav);
    projNav.appendChild(_projUl);
    _sidePanel.appendChild(projContainer);

    _addProj = document.createElement('button');
    _addProj.classList.add('projBtn');
    _addProj.textContent = '+';
    _sidePanel.appendChild(_addProj);

    function starterProjectList() {
        const p_listItem = document.createElement('li');
        const p_link = document.createElement('a');
        const starterTitle = 'workout';

        p_link.textContent = starterTitle;
        p_link.classList.add('project-list');
        p_link.href = '#workout';

        p_listItem.appendChild(p_link);
        _projUl.appendChild(p_listItem);
    
        _projectList.push(starterTitle);

        const starterProjCont = document.createElement('div');
        starterProjCont.setAttribute('id', 'workout');
        starterProjCont.classList.add('proj-pages');
        starterProjCont.style.display = 'none';

        const starterContTitle = document.createElement('h2');
        starterContTitle.textContent = 'Workout';

        starterProjCont.appendChild(starterContTitle);
        mainPage.appendChild(starterProjCont);
        
    }

    document.addEventListener('DOMContentLoaded', starterProjectList);
};

export {
    _sidePanel as sidePanel, 
    _mainPage as mainPage,
    _addProj as addProjBtn,
    _projUl as _projUl,
    _projectList as projectList
};