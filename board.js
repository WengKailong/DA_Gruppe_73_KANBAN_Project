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
function loadBoard() {
    loadListsToBoard();
 //   loadAllTasks();
 //   loadTasksToBoard();
}

async function boardInit() {
    await init()
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
                <div class="category">${taskObjects[id]['taskCategory']}</div>
                <img class="avatar" src=""                   alt=${taskObjects[id]['taskAsignedTo'][0]}>
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
    document.getElementById('modal-title').innerHTML = taskObjects[id]['taskTitle'];
    document.getElementById('modal-description').innerHTML = taskObjects[id]['taskDescription'];
    let modalAvatar = document.getElementById('modal-avatar');
    modalAvatar.src = taskObjects[id]['userProfileAvatar'];
    document.getElementById('modal-creator').innerHTML = taskObjects[id]['taskAsignedTo'][0];
    document.getElementById('modal-category').innerHTML = taskObjects[id]['taskCategory'];
   // document.getElementById('modal-category').classList.add(allTasks[id]['category'])
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

function newBoardList() {
    let newBoardListInput = document.getElementById('listInput');
    listObjects.push(
        new List(listObjects.length + 1, newBoardListInput)
    );
    loadBoard();
}



function loadListsToBoard() {
    let loadElement = document.getElementById("board-body");
    loadElement.innerHTML = '';

    for (let i = 0; i < listObjects.length; i++) {
        let list = listObjects[i];

        loadElement.innerHTML += writeListColumn(list)
    }
    loadElement.innerHTML += buttonNewList()
}

function writeListColumn(list){
    return `<div class="board-column">
    <h2>${list.listName}</h2>
    <div
      id="${list.listId}"
      class="board-column-text-board"
      ondrop="drop(event, '${list.listId}')"
      ondragover="allowDrop(event)"
    ></div>
  </div>`;
}
function buttonNewList(){
    return `<div>
    <p style="flex-direction: column">

      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
        aria-expanded="false" aria-controls="collapseExample">
        Button with data-bs-target
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <form>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
          <input class="form-control" id="listInput" rows="3"></input>
        </div>
        <button type="submit" class="btn btn-primary" onsubmit="newBoardList()">new List</button>
      </form>
    </div>
  </div>`
}