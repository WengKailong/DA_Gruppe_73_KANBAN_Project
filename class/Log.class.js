class Log{
    userAvatar; 
    userName;
    userEmail; 
    logCategory;
    logDetails; 

    constructor(taskObject, userObject){
        this.userAvatar = userObject.userProfileAvatar;
        this.userName = userObject.userName;
        this.userEmail = userObject.userEmail;
        this.logCategory = categoryObjects[taskObject.taskCategory];
        this.logDetails = taskObject.taskDescription;

        console.log(this);
    }

    
}
