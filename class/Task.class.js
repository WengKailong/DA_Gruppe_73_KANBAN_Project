
/**
 * This object class is designed to create and store all new task information needed for this KANBAN application.
 * @param {Number} taskId this parameter is used to save the primary key as unique id of one task 
 * @param {String} taskTitle this parameter is used to save title of a task 
 * @param {String} taskId this parameter is used to save the information, to which category, this task belongs to 
 * @param {String} taskDiscription this parameter is used to save the detailed discription of a task 
 * @param {String} taskDueDate this parameter is used to save due date of one task 
 * @param {Number} taskUrgency this parameter is used to save urgency of one task, 1 for Urgency 'high', 2 for urgency 'middle', 3 for urgency 'low' 
 * @param {Array} taskAsignedTo this Array is used to save all user IDs, of which this task is asigned to.
 * @param {String} lastUpDate this parameter is used to store the time, when the task is last updated
 * @param {Number} lastUpDateBy this parameter is used to store the User ID, by who, the last update to task information was made. 
 */

class Task{
    taskId;
    taskTitle;
    taskCategory;
    taskDiscription;
    taskDueDate;
    taskUrgency;
    taskAsignedTo = [];
    lastUpDate;

    constructor(){

    }

    addTask(){

    }

    deleteTask(){
        
    }

}
