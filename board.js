/**
 * 
 */
let dropId;

/**
 * 
 */
async function boardInit() {
    await init();
    loadBoardsanew()
}

/**
 * 
 */
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
    document.getElementById(taskObjects[id]['taskStatus']).innerHTML += taskPart1(id) + taskPartAssignedTo(id) 
}

function taskPart1(id) {
    return `<div id="id${taskObjects[id]['taskId']}" class="board-entry " data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fillModal(${id}) " draggable="true" ondragstart="drag(event, ${id} )" ondragover="">
        <div class="${taskObjects[id]['taskCategory']}">
           <div class="d-flex justify-content-between w-100"> 
                <span class="board-date">${taskObjects[id]['taskDueDate']}</span> 
                <div class="board-urgency-point ${urgencyColor[taskObjects[id]['taskUrgency']]}"></div></div>
            <h4 class="board-text-short">${taskObjects[id]['taskTitle']}</h4>
            <p class="board-text-short">${taskObjects[id]['taskDescription']}</p>
            <div class="d-flex  board-task-footer">
                <div class="category">${categoryObjects[taskObjects[id]['taskCategory']]}</div> <div class="board-avatar-container">         `
}
/**
 * 
 * @param {Number} id goes through taskAsignedTo and loads all of them   
 * @returns 
 */
function taskPartAssignedTo(id) {
    let assignedTo = '';
    for (let i = 0; i < taskObjects[id]['taskAsignedTo'].length; i++) {
        assignedTo += `<img class="avatar" src=${[userObjects[taskObjects[id]['taskAsignedTo'][i]]['userProfileAvatar']]}                   alt=${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userName']}></img>
        
    `
    }
    assignedTo +=`</div></div>
    </div>
</div>`
    return assignedTo;
}





/**
 * fills the Modal after it is opened
 * @param {Object} id allTasks object
 */
function fillModal(id) {
    removeOldModalData()
    let urgency = urgencyPicker(taskObjects[id])
    let modalFooter = document.getElementById('board-modal-footer');
    modalFooter.innerHTML = "";

    document.getElementById('modal-dueto').innerHTML = "Due to Date: "+ taskObjects[id]['taskDueDate']
    document.getElementById('modal-lastUpdate').innerHTML = "last Update: "+ taskObjects[id]['lastUpDate']
    document.getElementById('modal-urgency').classList.add(urgency)
    document.getElementById('modal-urgency').innerHTML= "Urgency: "+ urgency

    document.getElementById('modal-id').value = taskObjects[id]['taskId'];
    document.getElementById('modal-title').value = taskObjects[id]['taskTitle'];
    document.getElementById('modal-description').innerHTML = taskObjects[id]['taskDescription'];
    document.getElementById('modal-category').innerHTML = categoryObjects[taskObjects[id]['taskCategory']];

    for (let i = 0; i < taskObjects[id]['taskAsignedTo'].length; i++) {
       // let modalAvatar = document.getElementById('modal-avatar');
        // modalAvatar.src = userObjects[taskObjects[id]['taskAsignedTo'][i]]['userProfileAvatar'];
        modalFooter.innerHTML += `<div class="d-flex flex-column align-items-center p-1">
    <img  class="avatar" src=${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userProfileAvatar']} alt=${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userName']} />
    <span >${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userName']}</span><div>`

        // document.getElementById('modal-category').classList.add(allTasks[id]['category'])
    }
}

function removeOldModalData(){
    document.getElementById('modal-urgency').classList.remove('high', 'normal', 'low');
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
/**
 * 
 */
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
    newLastUpdate(id)
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
        taskObjects[dropId]['taskStatus'] = dropCategory;
        newLastUpdate(dropId)
        saveToServer("taskObjects", taskObjects);
    }
/**
 * 
 * @param {*} ev 
 */
    function newBoardList(ev) {
        ev.preventDefault();
        newListObject();
        saveToServer("listObjects", listObjects);
        loadBoardsanew()
    }


    /**
     * 
     */
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

/**
 * 
 */
    function loadListsToBoard() {
        let loadElement = document.getElementById("board-body");
        loadElement.innerHTML = '';

        for (let i = 0; i < listObjects.length; i++) {
            let list = listObjects[i];

            loadElement.innerHTML += writeListColumn(list)
        }
        loadElement.innerHTML += buttonNewList()
    }

    /**
     * 
     * @param {*} list 
     * @returns 
     */
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

    /**
     * 
     * @returns 
     */
    function buttonNewList() {
        return `<div class=""><div>
    <p style="flex-direction: column">

      <button class="btn btn-primary btn-lg font-bold bg-purple h-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
        aria-expanded="false" aria-controls="collapseExample">
        new List
    
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <form onsubmit="newBoardList(event)">
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"></label>
          <input class="form-control" id="listInput" rows="1" required></input>
        </div>
        <button  class="btn btn-primary btn-lg font-bold bg-purple " type="submit">Create</button>
      </form>
    </div>
  </div>
  <img ondragover="allowDrop(event)" class="m-3" ondrop="drop(event, 'backlog') " src="img/trash.png" alt="">
  </div></div>`
    }

    

    function newLastUpdate(id){
        let currentTask = taskObjects[id];
        let changedTask = new Task(id);
        currentTask.lastUpDate = changedTask.lastUpDate;
        taskObjects[id] = currentTask;
        
    }
    
    function newSize(){
        document.getElementById('trash').style = "height: 128px; width:128px";
    }