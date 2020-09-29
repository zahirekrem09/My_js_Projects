// Element Seçme İşlemleri;

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const lastSearch = document.getElementById("lastSearch");

const github = new GitHub();
const ui = new UI();

eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
   
    document.addEventListener("DOMContentLoaded",getAllSearched);
    lastSearch.addEventListener("click",clearUser);

}

function getData(e) {

    let username = nameInput.value.trim();

    if (username===""){
        ui.showAlert("danger","Kullanıcı Adını Boş Bırakma")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if (response.user.message === "Not Found"){
                ui.showAlert("danger","Kullanıcı Bulunamadı")
            }
            else {
                ui.addUsersToUI(username);
                Storage.addUsersToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo)
            }
        })
        .catch(error => ui.showAlert("danger","error"));
                
    }
    ui.clearInput();
    e.preventDefault();

}

function clearAllSearched(){
    //arama temizle
    if (confirm("Emin misiniz?")){
        Storage.deleteUsersFromStorage();
        ui.deleteUsersFromUI();
        ui.showAlert("success","Başarıyla Silindi.")
    }
}

function getAllSearched() {
    //Arama storoge al uı yükle
    let users = Storage.getSearchedUsersFromStorage();
    users.sort();
    let result = "";
    users.forEach(user => {
        //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item d-flex justify-content-between">
                    ${user}
        <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
        </a>
        </li>
        `;
    });
    lastUsers.innerHTML = result;
}

function clearUser(e) {
    if (e.target.className === "fa fa-remove"){
        console.log("bastı")
        e.target.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement.textContent)
        Storage.deleteUserStorage(e.target.parentElement.parentElement.textContent);
    }
    e.preventDefault();
}