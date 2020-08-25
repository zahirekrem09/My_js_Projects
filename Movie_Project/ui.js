
class UI {

  // Adding movies to the interface
  static addFilmToUI(newFilm) {
    const filmList = document.getElementById("films");
    // Dynamically create the table.
    filmList.innerHTML += ` 
          
          <tr class ="film">
              <td><img src="${newFilm.url}" class="img-fluid img-thumbnail"></td>
              <td>${newFilm.title}</td>
              <td>${newFilm.director}</td>
              
              <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
          </tr>
    `;
  }

    // Clearing input Fields
    static clearInputs(el1,el2,el3){ 
      el1.value = "";
      el2.value = "";
      el3.value = "";
    }

    // Disclosure messages
    static displayMessages(message,type){ 
      const cardBody = document.querySelectorAll(".card-body")[0];

      // Alert Div;
      const div = document.createElement("div");
      div.className = `alert alert-${type}`;
      div.textContent = message;
      cardBody.appendChild(div);

    // messages in to be deleted after 3 seconds.
      setTimeout(function (){  
        div.remove();
      },3000);
    }

    // Adding movies from the storage to the interface
    static loadAllFilms(films) { 
      const filmList = document.getElementById("films");

      films.forEach(function (film){
        filmList.innerHTML += ` 
          
        <tr class ="film">
            <td><img src="${film.url}" class="img-fluid img-thumbnail"></td>
            <td>${film.title}</td>
            <td>${film.director}</td>
            
            <td><a href="#" id = "delete-film" class = "btn btn-danger">Delete Movie</a></td>
        </tr>
    `;
      })
    }

    static deleteFilmFromUI(element){

      element.parentElement.parentElement.remove();
    }

    static clearAllFilmsUI() {
      const filmList = document.getElementById("films");
    
      if(confirm("Are You Sure You Want To Delete All?")){
      //Arayüzden Temizleme;
      // filmList.innerHTML ="";
        while(filmList.firstElementChild !== null){
            filmList.firstElementChild.remove();
        }  //ikinci yol;hızlı bir yöntem.
      }
    }
}



