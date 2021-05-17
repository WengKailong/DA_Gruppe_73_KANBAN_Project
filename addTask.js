let asignedUsers = [];

function loadAddTaskSite() {
  setTimeout(() => {
    navItemActive("nav-btn-addTask");
    loadCategorySelect(); // load categories from GLOBAL_VARIABLES
    loadAsignToUserSelect(); // load select users for task asign to
  }, 200);
}

function loadCategorySelect() {
  let selectElement = document.getElementById("input-task-category");

  selectElement.innerHTML =
    '<option value = "" selected>Please select category of this task</option>';

  for (let i = 0; i < categoryObjects.length; i++) {
    let category = categoryObjects[i];
    selectElement.innerHTML += `<option value="${i}">${category}</option>`;
  }
}

function loadAsignToUserSelect() {
  let selectElement = document.getElementById("input-task-asignto");
  selectElement.innerHTML = "";

  for (let i = 1; i < userObjects.length; i++) {
    let user = userObjects[i];
    selectElement.innerHTML += `<a class="dropdown-item" href="#" onclick="asignTaskTo(${user.userId})"
        ><div class="row" style="height: 30px;">
          <div class="col-4 h-100"><img class="h-100 rounded-circle" src="${user.userProfileAvatar}" alt=""></div>
          <div class="col-8 h-100">${user.userName}</div></div></a>`;
  }
}

/**
 * This function is designed to create new task object by getting all input data from html form and save this object onto server after creating it
 * @param {Object} e event parameter to prevent default behavior
 * @param {Object} inputForm object to get form element in html
 * @param {Object} formData data object to store all data from form element
 * @param {Object} newTask data object to create new task object
 */

function createNewTask(e) {
  e.preventDefault();

  if (asignedUsers == "") {
    alert("New Task must be asigned to at least user!");
  } else {
    // get input data from the form
    let inputForm = document.getElementById("input-task");
    var formData = new FormData(inputForm);

    // create new task
    let newTask = new Task(GLOBAL_VARIABLES, asignedUsers);
    newTask.dataFromInput(formData);

    // add new task to existing tasks
    taskObjects.push(newTask);

    // update data on server
    saveToServer("taskObjects", taskObjects);
    GLOBAL_VARIABLES.currTaskId++;
    saveToServer("globalVariables", GLOBAL_VARIABLES);
  }
}

function loadAsignedUsers() {
  let loadElement = document.getElementById("asigned-users");

  loadElement.innerHTML = "";

  for (let i = 0; i < asignedUsers.length; i++) {
    let userId = asignedUsers[i];
    let user = new User();
    user = user.getUserById(userId, userObjects);
    loadElement.innerHTML += `<div class=" d-flex flex-column align-items-center" style="width: 70px;">
    <div class="form-profile-container">
      <img src="${user.userProfileAvatar}" alt="" class="h-100" />
    </div>
    <span>${user.userName}</span>
  </div>`;
  }
}

function asignTaskTo(userId) {
  if (asignedUsers == "") {
    asignedUsers = [userId];
  } else {
    if (!asignedUsers.includes(userId)) {
      asignedUsers.push(userId);
    }
  }

  console.log(asignedUsers);
  loadAsignedUsers();
}
