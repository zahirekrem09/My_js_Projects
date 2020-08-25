class Storage {

    static addFilmToStorage(newFilm){
        // console.log(newFilm);
        let films = this.getFilmFromStorage();
    
        films.push(newFilm);
        localStorage.setItem("films",JSON.stringify(films));
        /*
        [
            {title:"aaa",director:"mmm",url:"nnmnmn"},
        ]
        */
    
    }
    
    static getFilmFromStorage(){
        let films;
    
        if (localStorage.getItem("films") === null){
            films = [];
        }
        else {
            films = JSON.parse(localStorage.getItem("films"));
        }
        return films;
    }
    
    
    static deleteFilmFromStorage(filmTitle) {
        let films = this.getFilmFromStorage();
        films.forEach(function (film,index){
            if(film.title === filmTitle){
                films.splice(index,1);
            }
        });
        localStorage.setItem("films",JSON.stringify(films));
    }
    
    static clearAllFilmsStorage() {
        localStorage.removeItem("films");
    }
}



