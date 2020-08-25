// Eleman Secme İşlemleri

const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clear = document.querySelector("#clear-films");

// Tüm Eventleri Tükleme:
eventListener();

function eventListener(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded", function () {
            let films = Storage.getFilmFromStorage();
            UI.loadAllFilms(films);
        });
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
    filter.addEventListener("keyup",filterFilms);

}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
    UI.displayMessages("Please Fill In All Fields...","danger");
    }
    else {
        // Yeni Filim olusturma:
        const newFilm = new Film(title,director, url);
        const filmList = document.querySelectorAll(".film");
        console.log(filmList);
        if (filmList.length === 0 ){
            UI.addFilmToUI(newFilm); // Arayüze film ekleme
            Storage.addFilmToStorage(newFilm); // Storage a film ekleme
            UI.displayMessages("Movie Added Successfully...","success");
        }
        else {
            let count;
            filmList.forEach(function(Item){
                const text = Item.children[1].textContent.toLowerCase();
                console.log(text);
                console.log(newFilm.title.toLowerCase());
                if (text.indexOf(newFilm.title.toLowerCase()) !== -1){
                    count=1;
                }
            });
            if (count === 1){
                UI.displayMessages("There's This Movie...","danger");
            }
            else {
                UI.addFilmToUI(newFilm); // Arayüze film ekleme
                Storage.addFilmToStorage(newFilm); // Storage a film ekleme
                UI.displayMessages("Movie Added Successfully...","success");
            }
        }
    }
    
    UI.clearInputs(titleElement,urlElement,directorElement);
    
    e.preventDefault();
}

function deleteFilm(e){
    // console.log(e.target);
    if (e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        //console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Movie Successfully Deleted...","success");
    }
}

function clearAllFilms(){
    if (confirm("Are you sure?")) {
        UI.clearAllFilmsUI();
        Storage.clearAllFilmsStorage();
    }
}

function filterFilms(e){
    // console.log(e.target.value.toLowerCase());
    const filterValue =  e.target.value.toLowerCase();
    const filmList = document.querySelectorAll(".film");
    // console.log(filmList);
    filmList.forEach(function(Item){
        const text = Item.children[1].textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1){
            //Bulunamadı
            Item.setAttribute("style","display : none !important");

        }
        else {
            Item.setAttribute("style","display : block");
        }
    });

}
