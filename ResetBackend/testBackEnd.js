/**
 * This js file is used to create a test environment for data exchange between server and different sites.
 * 
 *
 */


setURL(
  "http://kailong-weng.developerakademie.com/Gruppenarbeit%20KANBAN/testBackEnd/smallest_backend_ever-master"
);

let userObjects = []; // Global variables to load all saved users from server
let taskObjects = []; // Global variables to load all saved tasks from server
let GLOBAL_VARIABLES; // Global variable to load all other relevant variables for different sites


async function init() {
  await downloadFromServer();
  userObjects = JSON.parse(backend.getItem("userObjects")) || [];         // used for login.html, addtask.html
  categoryObjects = JSON.parse(backend.getItem("categoryObjects")) || []; // used for addtask.html
  taskObjects = JSON.parse(backend.getItem("taskObjects")) || [];         // used for addtask.html
  listObjects = JSON.parse(backend.getItem("listObjects")) || [];         // used for board.html
  GLOBAL_VARIABLES = JSON.parse(backend.getItem("globalVariables")) || {};// used for every sites
  loadBoard();          // interface to board.html
  loadAddTaskSite();    // interface to addTask.html
  loadLogs();           // interface to BackLogs.html
}

function deleteUser(name) {
  backend.deleteItem("users");
}

async function saveToServer(objectName, object) {
  await backend.setItem(objectName, JSON.stringify(object));
}









