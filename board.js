let dropId;


async function boardInit() {
    await init();
    loadBoardsanew()
}


function loadBoardsanew(){
    loadListsToBoard();
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
    document.getElementById(taskObjects[id]['taskStatus']).innerHTML += taskPart1(id) + taskPart2(id) + taskPart3(id)
}

function taskPart1(id) {
    return `<div id="id${taskObjects[id]['taskId']}" class="board-entry" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fillModal(${id}) " draggable="true" ondragstart="drag(event, ${id} )">
        <div class="${taskObjects[id]['taskCategory']}">
            <span class="board-date">${taskObjects[id]['taskDueDate']}</span>
            <h4>${taskObjects[id]['taskTitle']}</h4>
            <p class="board-text-short">${taskObjects[id]['taskDescription']}</p>
            <div class="d-flex justify-content-around">
                <div class="category">${categoryObjects[taskObjects[id]['taskCategory']]}</div> <div>         `
}
/**
 * 
 * @param {Number} id goes through taskAsignedTo and loads all of them   
 * @returns 
 */
function taskPart2(id) {
    let assignedTo = '';
    for (let i = 0; i < taskObjects[id]['taskAsignedTo'].length; i++) {
        assignedTo += `<img class="avatar" src=${[userObjects[taskObjects[id]['taskAsignedTo'][i]]['userProfileAvatar']]}                   alt=${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userName']}></img>`
    }
    console.log(assignedTo);
    return assignedTo;
}

function taskPart3(id) {
    return `</div>
    </div>
    </div>
</div>`

}


/**
 * fills the Modal after it is opened
 * @param {Object} id allTasks object
 */
function fillModal(id) {
    let modalFooter = document.getElementById('board-modal-footer');
    modalFooter.innerHTML = "";

    document.getElementById('modal-id').value = taskObjects[id]['taskId'];
    document.getElementById('modal-title').value = taskObjects[id]['taskTitle'];
    document.getElementById('modal-description').innerHTML = taskObjects[id]['taskDescription'];
    document.getElementById('modal-category').innerHTML = categoryObjects[taskObjects[id]['taskCategory']];

    for (let i = 0; i < taskObjects[id]['taskAsignedTo'].length; i++) {
       // let modalAvatar = document.getElementById('modal-avatar');
        // modalAvatar.src = userObjects[taskObjects[id]['taskAsignedTo'][i]]['userProfileAvatar'];
        modalFooter.innerHTML += `
    <img  class="avatar" src=${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userProfileAvatar']} alt=${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userName']} />
    <span >${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userName']}</span>`

        // document.getElementById('modal-category').classList.add(allTasks[id]['category'])
    }
}


/**
 * 
 * @param {Event} ev 
 */
function saveChanges(ev) {
    ev.preventDefault();
    changeTask();
    saveToServer("taskObjects", taskObjects);
    loadBoardsanew();
}

function changeTask(){
    let newTask = { 
        title: "",
        description: "",
    }

    let id = document.getElementById('modal-id').value
    let modalData = document.getElementById('boardModal');
    formData = new FormData(modalData);
    //new Task() didn't work, this is a workaround
    newTask.title = formData.get('taskTitle');
    newTask.description = formData.get('taskDescription');

    taskObjects[id]['taskTitle'] = newTask.title;
    taskObjects[id]['taskDescription'] = newTask.description;
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
        console.log(taskObjects[dropId]['staskStatus']);
        taskObjects[dropId]['taskStatus'] = dropCategory;
        saveToServer("taskObjects", taskObjects);
    }

    function newBoardList(ev) {
        ev.preventDefault();
        newListObject();
        saveToServer("listObjects", listObjects);
        loadBoardsanew()
    }

function newListObject(){
    let newList = { 
        listId : "",
        listName: ""
    }
    let newBoardListInput = document.getElementById('listInput').value;
     newList.listId = newBoardListInput;
     newList.listName = newBoardListInput

    listObjects.push(newList);
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

    function writeListColumn(list) {
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
    function buttonNewList() {
        return `<div>
    <p style="flex-direction: column">

      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
        aria-expanded="false" aria-controls="collapseExample">
        new List
    
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <form>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"></label>
          <input class="form-control" id="listInput" rows="3"></input>
        </div>
        <button  class="btn btn-primary" onclick="newBoardList(event)">Create</button>
      </form>
    </div>
  </div>`
    }

    