import {
    _sidePanel,
    _mainPage,
    _projUl,
    _projectList,
    saveProjectListToLocal,
} from './base.js';

import {
    createTaskInputElements,
    createTaskList
} from './ui.js';

let currentParentDiv = null;

//grab project Div of where new Task button is clicked
function handleNewTaskButton() {
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('new-task-btn')) {
            const existingTaskForm = document.querySelector('.task-creation-container');
            if (!existingTaskForm){
                currentParentDiv = e.target.parentNode;          
                const newTaskElement = createTaskInputElements();      
                const projNameId = currentParentDiv.id.replace(/-/g, ' ');

                document.body.insertBefore(newTaskElement, _sidePanel);
                handleTaskFormInput(projNameId);
            }
        }
    });
}
handleNewTaskButton();


function handleTaskFormInput(projectName) {
    const formConfirm = document.querySelector('.task-confirm-btn');

    formConfirm.addEventListener('click', (e) => {
        e.preventDefault();
        const taskTitle = document.querySelector('#task-title').value;
        const taskDescription = document.querySelector('#task-description').value;
        const taskDueDate = document.querySelector('#task-due').value;
        const taskPriority = document.querySelector('#task-priority').value;

        document.querySelector('.task-creation-container').remove();

        createTaskItem(projectName, taskTitle, taskDescription, taskDueDate, taskPriority);

        /*  ---  CREATED TASK LOG   --- 

        console.log(`projectName : ${projectName}, 
            taskTitle : ${taskTitle}, 
            taskDescription : ${taskDescription}, 
            taskDueDate : ${taskDueDate}, 
            taskPriority : ${taskPriority}`);
        */
    });
}

function createTaskItem(projectName, taskTitle, taskDescription, taskDueDate, taskPriority) {
    const project = _projectList.find(proj => proj.name === projectName);

    if (project) {
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
            priority: taskPriority,
            completed: false
        };

        project.tasks.push(newTask);
        renderTaskList();
        saveProjectListToLocal();
    } else {
        console.error(`Project ${projectName} not found.`);
    }
};

function renderTaskList() {
    _projectList.forEach(project => {
        const todoList = document.querySelector(`#${project.name.replace(/\s+/g, '-')} .todo-list`);

        if (todoList) {
            todoList.innerHTML = '';
            project.tasks.forEach((task, index) => {
                createTaskList(project.name, task, index);
            });
        } else {
            console.error(`Project ${projectName} or task list not found.`);
        }
    })
}

function handleEditTaskBtn() {
    document.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('task-edit-btn')) {
            currentParentDiv = e.target.closest('.tasklist-item'); 
            const projectId = currentParentDiv.closest('.proj-pages').id;
            const projectName = projectId.replace(/-/g, ' ');
            const listTaskID = e.target.closest('[id^="task-"]');
            const taskIndex = listTaskID.id.split('-')[1];
            const divTaskId = e.target.closest('[id]');

            console.log('Clicked Task ID:', listTaskID);
            console.log('divTaskId:', divTaskId);
            console.log('taskIndex:', taskIndex);

            const project = _projectList.find(proj => proj.name === projectName);
            const getTask = project ? project.tasks[taskIndex] : null;

            const existingTaskElement = document.querySelector('.task-creation-container');

            if (!existingTaskElement){         
                const newTaskElement = createTaskInputElements();
                document.body.insertBefore(newTaskElement, _sidePanel);

                if (getTask) {
                    document.querySelector('#task-title').value = getTask.title;
                    document.querySelector('#task-description').value = getTask.description;
                    document.querySelector('#task-due').value = getTask.dueDate;
                    document.querySelector('#task-priority').value = getTask.priority;
            
                    console.log('getTask: ' + JSON.stringify(getTask));
                }

                const formConfirm = document.querySelector('.task-confirm-btn');

                formConfirm.addEventListener('click', (e) => {
                    e.preventDefault();
    
                    const taskTitle = document.querySelector('#task-title').value;
                    const taskDescription = document.querySelector('#task-description').value;
                    const taskDueDate = document.querySelector('#task-due').value;
                    const taskPriority = document.querySelector('#task-priority').value;
                    const newPriorityId = taskPriority.replace(/\s+/g, '-');
                    
                    if (project && getTask) {
                        getTask.title = taskTitle;
                        getTask.description = taskDescription;
                        getTask.dueDate = taskDueDate;
                        getTask.priority = taskPriority;
    
                        saveProjectListToLocal();
    
                        console.log(`projectName : ${projectName}, 
                            tasIndex: ${getTask},
                            taskTitle : ${getTask.title}, 
                            taskDescription : ${getTask.description}, 
                            taskDueDate : ${getTask.dueDate}, 
                            taskPriority : ${getTask.priority}`);
    
                        document.querySelector('.task-creation-container').remove();  
                        
                        const currentTaskTitle = currentParentDiv.querySelector('h3.task-title-label');
                        const currentTaskDescription = currentParentDiv.querySelector('p.task-label-description');
                        const currentDueDate = currentParentDiv.querySelector('p.task-label-duedate');
                        const currentPriority = currentParentDiv.querySelector('.priority-circle');
                        let currentTaskId = currentParentDiv.querySelector('[id]');

                        /*  ---  UPDATED TASK LOG   ----
                        console.log('currentParentDIv', currentParentDiv);
                        console.log('currentTaskId', currentTaskId);
                        console.log('currentTaskTitle:', currentTaskTitle);
                        console.log('currentTaskDescription:', currentTaskDescription);
                        console.log('currentDueDate:', currentDueDate);
                        console.log('currentPriority:', currentPriority);
                        */
                        currentTaskTitle.textContent = getTask.title;
                        currentTaskDescription.textContent = getTask.description;
                        currentDueDate.textContent = getTask.dueDate;

                        if (currentPriority.classList.contains('low-priority')) {
                            currentPriority.classList.remove('low-priority');
                            currentPriority.classList.add(newPriorityId);
                        } else if (currentPriority.classList.contains('medium-priority')) {
                            currentPriority.classList.remove('medium-priority');
                            currentPriority.classList.add(newPriorityId);
                        } else {
                            currentPriority.classList.remove('high-priority');
                            currentPriority.classList.add(newPriorityId);
                        }

                        const newTaskId = currentTaskTitle.textContent.replace(/\s+/g, '-');

                        if (currentTaskId) {
                            currentTaskId.id = newTaskId;
                            console.log("updated currentTaskId:", currentTaskId.id);
                        } else {
                            console.log("currentTaskId was not updated");
                        }
                    }
                })
            }
        }
    });
}
handleEditTaskBtn();

// handle delete button
function handleDeleteTask() {
    document.addEventListener('click', (e) => {
        e.preventDefault();

        if(e.target.classList.contains('task-delete-btn')) {            
            currentParentDiv = e.target.closest('.tasklist-item'); 
            const projectId = currentParentDiv.closest('.proj-pages').id;
            const projectName = projectId.replace(/-/g, ' ');
            const listTaskID = e.target.closest('[id^="task-"]');
            const taskIndex = listTaskID.id.split('-')[1];
            const project = _projectList.find(proj => proj.name === projectName);
            const getTask = project ? project.tasks[taskIndex] : null;

            if (project && getTask) {
                project.tasks.splice(taskIndex, 1);
                saveProjectListToLocal();

                if(currentParentDiv) {
                    currentParentDiv.remove();
                }

                console.log('Task item was removed successfully from the list:', getTask);
            } else {
                console.log('Task Item was not removed');
            }
        }
    })
}
handleDeleteTask();

function handleTaskStrikeOut() {
    document.addEventListener('click',(e) => {
        e.preventDefault();
        
        currentParentDiv = e.target.closest('.tasklist-item'); 

        if (currentParentDiv) {
            const projectId = e.target.closest('.proj-pages').id;
            const projectName = projectId.replace(/-/g, ' ');
            const listTaskID = e.target.closest('[id^="task-"]');
            const taskIndex = listTaskID.id.split('-')[1];
            const taskDiv = currentParentDiv.querySelector('[id]');
        
            const project = _projectList.find(proj => proj.name === projectName);
            const getTaskIndex = project.tasks[taskIndex];

            if (getTaskIndex.completed === false){
                getTaskIndex.completed = true;
                taskDiv.classList.add('task-complete');
                console.log('taskcomplete class added', taskDiv);
            } else {
                getTaskIndex.completed = false;
                taskDiv.classList.remove('task-complete');
            } 
            saveProjectListToLocal();   
        }   
    });
}
handleTaskStrikeOut();

function todayUpComingTasks() {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0]; 

    const allTasks = _projectList.flatMap(proj => proj.tasks);
    const taskDueToday = allTasks.filter(task => task.dueDate === todayFormatted);
    const upcomingTasks = allTasks.filter(task => task.dueDate > todayFormatted);
    
    taskDueToday.forEach((task, index, priority) => {
        createTaskList('today', task, index, priority);
    });

    upcomingTasks.forEach((task, index, priority) => {
        createTaskList('upcoming', task, index, priority);
    });
    
}

export {
    handleTaskFormInput,
    createTaskItem,
    renderTaskList,
    todayUpComingTasks
};