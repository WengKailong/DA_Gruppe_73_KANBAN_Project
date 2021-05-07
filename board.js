let dropId;
/**
 * Tasks for Testing

allTasks = [
    {
        id: 0,
        title: "test",
        category: "Management",
        description: `lorem Ipsum dolor sit amet, consectetur`,
        status: "todo",
        creator: "Timm Eichholz",
        avatar: "./img/profile.png",
        creationdate: ""
    },
    {
        id: 1,
        title: "test2",
        category: "Management",
        description: "lorem Ipsum dolor sit amet, consectetur",
        status: "done",
        creator: "Timm Eichholz",
        avatar: "./img/profile.png",
        creationdate: ""
    }
];
 */


function boardInit() {

    for (let i = 0; i < taskObjects.length; i++) {

        writeTasks(i);
    }
}


/**
 * class Task{
    taskId;
    taskTitle;
    taskCategory;
    taskDescription;
    taskDueDate;
    taskUrgency;
    taskAsignedTo = [];
    listId = 0;
    createdBy = 'admin';
    lastUpDate;
 * 
 * loads the tasks into the different columns
 * @param {} id allTasks object
 */
    function writeTasks(id) {
    

        document.getElementById(taskObjects[id]['taskStatus']).innerHTML += `<div id="id${taskObjects[id]['taskId']}" class="board-entry" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fillModal(${id}) " draggable="true" ondragstart="drag(event, ${id} )">
        <div class="${taskObjects[id]['taskCategory']}">
            <span class="board-date">${taskObjects[id]['taskDueDate']}</span>
            <h4>${taskObjects[id]['taskTitle']}</h4>
            <p class="board-text-short">${taskObjects[id]['taskDescription']}</p>
            <div class="d-flex justify-content-around">
                <div class="category">Management</div><img class="avatar" src=""
                    alt=${taskObjects[id]['taskAsignedTo'][0]}>
            </div>
        </div>
    </div>`
    }
/**
 * taskId;
    taskTitle;
    taskCategory;
    taskDescription;
    taskDueDate;
    taskUrgency;
    taskAsignedTo = [];
    listId = 0;
    createdBy = 'admin';
    lastUpDate;
 */


/**
 * 

function boardInit() {

    for (let i = 0; i < allTasks.length; i++) {

        writeTasks(i);
    }
}
 */



/**
 * fills the Modal after it is opened
 * @param {Object} id allTasks object
 */
function fillModal(id) {
    document.getElementById('modal-title').innerHTML = allTasks[id]['title'];
    document.getElementById('modal-description').innerHTML = allTasks[id]['description'];
    let modalAvatar = document.getElementById('modal-avatar');
    modalAvatar.src = allTasks[id]['avatar'];
    document.getElementById('modal-creator').innerHTML = allTasks[id]['creator'];
    document.getElementById('modal-category').innerHTML = allTasks[id]['category'];
    document.getElementById('modal-category').classList.add(allTasks[id]['category'])
}

/**
 * Drag and Drop
 */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, idNr) {
    ev.dataTransfer.setData("text", ev.target.id);
    dropId = idNr;
}

/**
 * 
 * @param {Object} ev dragged object
 * @param {Number} dropCategory 
 * changes allTasks[].status into new category
 */
function drop(ev, dropCategory) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log('dropid: ', dropId);
    console.log('dropStatus: ', dropCategory);
    console.log(allTasks[dropId]['status']);
    allTasks[dropId]['status'] = dropCategory;
}

function newBoardList(){
   let newBoardListInput = document.getElementById('listInput');
   listObjects.push(
       new List(listObjects.length+1, newBoardListInput)
   );
   loadBoard();
}