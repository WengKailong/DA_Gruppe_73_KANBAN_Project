class Log{
    userAvatar; 
    userName;
    userEmail; 
    logCategory;
    logDetails; 
    UrgencyColor;

    constructor(taskObject, userObject, UrgencyColor){
        this.userAvatar = userObject.userProfileAvatar;
        this.userName = userObject.userName;
        this.userEmail = userObject.userEmail;
        this.logCategory = categoryObjects[taskObject.taskCategory];
        this.logDetails = taskObject.taskDescription;
        this.UrgencyColor = UrgencyColor;

       


        console.log(this);
    }

    
}
