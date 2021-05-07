let loginUser = {
  userName: '',
  userPassword: ''
}
var formData

function userLogin(e) {
  e.preventDefault();

  let loginData = document.getElementById('input-login');
  formData = new FormData(loginData);

  dataFromLogin(formData);
  setUserCookie();
  checkLogin();

}

function dataFromLogin(formData) {
  loginUser.userName = formData.get('userName');
  loginUser.userPassword = formData.get('userPassword');


}
function setUserCookie() {
  document.cookie = "user=" + loginUser.userName + "," + loginUser.userPassword + "; path=/";

}



function checkLogin() {
  if (checkUserAndPassword() === true) {
     window.open('./board.html', '_self');
  }
  else{
    alert('wrong Username or Password')
  }
}

/**
 * Data interface between server and Login.html
 * @param {*} e 
 */

function createNewUser(e) {
  e.preventDefault();

  // get input data from the form
  let inputForm = document.getElementById("input-user");
  var formData = new FormData(inputForm);

  // create new task
  let newUser = new User(GLOBAL_VARIABLES.currUserId);
  newUser.dataFromInput(formData);

  // add new task to existing tasks
  userObjects.push(newUser);
  GLOBAL_VARIABLES.currUserId++;

  // update data on server
  saveToServer("userObjects", userObjects);
  saveToServer("globalVariables", GLOBAL_VARIABLES);
}