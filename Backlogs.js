setURL(
    "http://kailong-weng.developerakademie.com/Gruppenarbeit%20KANBAN/testBackEnd/smallest_backend_ever-master"
  );
  
  let userObjects = []; // Global variables to load all saved users from server
  let taskObjects = []; // Global variables to load all saved tasks from server
  let categoryObjects = [];
  let GLOBAL_VARIABLES; // Global variable to load all other relevant variables for different sites
  

async function init() {
  console.log("salih macht diese Site");
  await downloadFromServer(); // backend code for downloading data from server
  userObjects = JSON.parse(backend.getItem("userObjects")) || []; // used for login.html, addtask.html
  categoryObjects = JSON.parse(backend.getItem("categoryObjects")) || []; // used for backlogs.html, addtask.html
  taskObjects = JSON.parse(backend.getItem("taskObjects")) || []; // used for addtask.html
  //listObjects = JSON.parse(backend.getItem("listObjects")) || [];         // used for board.html
  GLOBAL_VARIABLES = JSON.parse(backend.getItem("globalVariables")) || {}; // used for every sites
  //loadBoard();          // interface to board.html
  //loadAddTaskSite();    // interface to addTask.html
  loadLogs(); // interface to BackLogs.html
}

/**
 * Data interface between server and backLogs.html
 * required global parameter is taskObjects[]
 */

function loadLogs() {
  /**
   * this function is to load BackLogs Array from task objects from server
   */
  for (let i = 0; i < taskObjects.length; i++) {
    let task = taskObjects[i];
    for (let j = 0; j < task.taskAsignedTo.length; j++) {
      let id = task.taskAsignedTo[j];
      let user = new User();
      user = user.getUserById(id, userObjects);

      let newLog = new Log(task, user);
      loadLogElement(newLog);
    }
  }
}

function loadLogElement(newLog) {
  /**
   * this function is to load html code for single backlog record.
   * it needs to be adapted to the backlog.html design
   */
  let loadElement = document.getElementById("load-logs");

  

  


      loadElement.innerHTML += `<div class="container-fluid row mb-2 p-zero  bg-form-input" style="height: 70px">
      
        <div class="vl col-1 align-content-center height-100">
          <img
            class=" h-50  d-inline-block rounded-circle"
            src="${newLog.userAvatar}"
            alt=""
          />
        </div>
        
        <div class="col-3 h-100 align-txt">
        <div class="raw h-100 align-txt h-25">${newLog.userName}</div>

        <div class="raw h-100 align-txt h-25" ><a href="${newLog.userEmail}">${newLog.userEmail}</a></div></div>

        <div class="col-3 h-100 align-txt">${newLog.logCategory}</div>
    
        <div class="col-4 h-100 align-txt">${newLog.logDetails}</div>
      </div>`;
}
