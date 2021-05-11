userData = {
  name: '',
  password: ''
}

/**
 * 
 */
setURL(
  "http://gruppe-73.developerakademie.com/testBackEnd/smallest_backend_ever-master"
);

let userObjects = []; // Global variables to load all saved users from server
let taskObjects = []; // Global variables to load all saved tasks from server
//let GLOBAL_VARIABLES; // Global variable to load all other relevant variables for different sites
let GLOBAL_VARIABLES = {
  currUserId: 1,
  currListId: 4, // Start with 4, because 0, 1, 2,3 are used for default list objects
  currTaskId: 0,
};

async function init() {
  await downloadFromServer();
  userObjects = JSON.parse(backend.getItem("userObjects")) || [];         // used for login.html, addtask.html
  categoryObjects = JSON.parse(backend.getItem("categoryObjects")) || []; // used for addtask.html
  taskObjects = JSON.parse(backend.getItem("taskObjects")) || [];         // used for addtask.html
  listObjects = JSON.parse(backend.getItem("listObjects")) || [];         // used for board.html
  GLOBAL_VARIABLES = JSON.parse(backend.getItem("globalVariables")) || {};// used for every sites
  //loadBoard();          // interface to board.html
  //loadAddTaskSite();    // interface to addTask.html
  //loadLogs();           // interface to BackLogs.html


}

function deleteUser(name) {
  backend.deleteItem("users");
}

async function saveToServer(objectName, object) {
  await backend.setItem(objectName, JSON.stringify(object));
}


/**
 * 
 */
function getCookie() {
  var name = "user=";
  var decodedCookie = decodeURIComponent(document.cookie);
  console.log(decodedCookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {

      let namePw = c.substring(name.length, c.length);
      userData = {
        name: namePw.split(',')[0],
        
      }
      return userData
    }
  }
  return "";

}


function checkUserAndPassword() {
  getCookie();
  for (let i = 0; i < userObjects.length; i++) {
    if (userObjects[i]['userName'] == userData.name ) {

      return true;
    }

  }
  return false;


}

async function loginActive() {
  await init();
  if (checkUserAndPassword() === false) {
    window.open('/index.html', '_self');

    // }
    //
  }
}