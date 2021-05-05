class User{
    userId;
    userName;
    userPassword;   // to be decided
    userCategory;
    userEmail;
    userProfileAvatar;

    constructor(id, name, password, category, email, avatar){
        this.userId = id;
        this.userName = name;
        this.userPassword = password;
        this.userCategory = category;
        this.userEmail = email;
        this.userProfileAvatar = 'img/profile.png';

    }


    dataFromInput(formData){
        this.userName = formData.get('userName');
        this.userPassword = formData.get('userPassword');
        this.userCategory = formData.get('userCategory');
        this.userEmail = formData.get('userEmail');

        if(formData.get('userAvatar').name != ''){
            this.userProfileAvatar = 'img/' + formData.get('userAvatar').name;
        }
        
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

    
}