/**
 * @param {Array} allTasks this Array is used to store all saved tasks
 */
let allTasks = [];

let task;

function addTask(name, category) {
  let taskName = document.getElementById("task-name").value;
  let category = document.getElementById("category").value;

  console.log(taskName);
  console.log(category);

  let task = {
    name: taskName,
    category: category,
    createdAt: new Date().toISOString(),
  };

  allTasks.push(task);

  let allTasksAsString = JSON.stringify(allTasks);

  localStorage.setItem('savedTasks', allTasksAsString);
  console.log(allTasks);


}

function loadAllTasks(){
    let allTasksAsString = localStorage.getItem('savedTasks');
    allTasks = JSON.parse(allTasksAsString);

    console.log(allTasks);
}
