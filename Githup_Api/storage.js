class Storage {

    static getSearchedUsersFromStorage(){
        //tüm kullanıcılar
        let users;
        if (localStorage.getItem("searched") === null ){
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }


    static addUsersToStorage(username) {
        //Kullanıcı ekleme
        let users = this.getSearchedUsersFromStorage();
        if (users.indexOf(username)==-1 ){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }
    static deleteUsersFromStorage(){
        //Tüm kullanıcıları sil
        localStorage.removeItem("searched");
    }

    static deleteUserStorage(deleteuser){
        let users = this.getSearchedUsersFromStorage();
        users.forEach((user,index) => {
            if (user === deleteuser){
                users.splice(index,1);
            }         
        })
        localStorage.setItem("searched",JSON.stringify(users));
    }
}