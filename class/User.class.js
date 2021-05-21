class User{
    userId;
    userName;
    userPassword;   // to be decided
 //   userCategory;
    userEmail;
    userProfileAvatar;

    constructor(id, avatar){
        this.userId = id;
        this.userProfileAvatar = avatar;

    }


    dataFromInput(formData){
        this.userName = formData.get('userName');
        this.userPassword = formData.get('userPassword');
       // this.userCategory = formData.get('userCategory');
        this.userEmail = formData.get('userEmail');
        
        console.log(this);
    }

    getUserById(id){
        for (let i = 0; i < userObjects.length; i++) {
            let user = userObjects[i];

            if(user.userId == id){
                return user;
            }
            
        }

    }

    getUserByName(userName){
        for (let i = 0; i < userObjects.length; i++) {
            let user = userObjects[i];

            if(user.userName == userName){
                return user;
            }
            
        }
    }

    
}