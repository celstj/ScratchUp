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

let _sidePanel;
let _mainPage;
let _addProj;

export default function base() {

    _sidePanel = document.createElement('div');
    _mainPage = document.createElement('div');

    function baseDefault(){
        const header = document.createElement('header');
        const footer = document.createElement('footer');
    
        header.textContent = 'To do List';
        footer.textContent = 'this is a footer, Odin Project @ celjst';
        _sidePanel.classList.add('side-panel');
        _mainPage.classList.add('main-page');
    
        return [header, _sidePanel, _mainPage, footer];
    }

    const [header, sidePanel, mainPage, footer] = baseDefault();
        
    document.body.appendChild(header);
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

    const projs = document.createElement('h3');
    projs.textContent = "Projects";

    _sidePanel.appendChild(projs);

    _addProj = document.createElement('button');
    _addProj.classList.add('projBtn');
    _addProj.textContent = '+';
    _sidePanel.appendChild(_addProj);
};

export {
    _sidePanel as sidePanel, 
    _mainPage as mainPage,
    _addProj as addProjBtn};