/* reste a gerer les pages multiples */
function get_listmovies(genre, bloc_id){
    url = 'http://localhost:8000/api/v1/titles/?genre='+genre+'&sort_by=-imdb_score'
    fetch(url)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
            append_item(data, bloc_id);
        })
        .catch(function (err) {
            console.log(err);
        });
}


function append_item(data, bloc_id) {
  var mainContainer = document.getElementById(bloc_id);
  switch (bloc_id){
    case 'bestrated_list':
    // exclure le meilleur film
      for (var i = 1; i < 7 ; i++) {
        var div = document.createElement("button");
        div.setAttribute("class", "modal_trigger movie");
        div.setAttribute("role", "dialog")
        div.setAttribute("id", data.results[i].id);
        div.innerHTML ='<img src=' + data.results[i].image_url + ' alt="'+ data.results[i].title + '">';
        mainContainer.appendChild(div);
      }
    default:
        for (var i = 0; i < 6 ; i++) {
            var div = document.createElement("button");
            div.setAttribute("class", "modal_trigger movie");
            div.setAttribute("role", "dialog")
            div.setAttribute("id", data.results[i].id);
            div.innerHTML ='<img src=' + data.results[i].image_url + ' alt="'+ data.results[i].title + '">';
            mainContainer.appendChild(div);
          }
    }
}


get_listmovies("", "bestrated_list");
get_listmovies("action", "action_list");
get_listmovies("comedy", "comedy_list");
get_listmovies("drama", "drama_list");


/* récupérer la description du meilleur film */
function get_description(movie_id){
    url =  'http://localhost:8000/api/v1/titles/'+movie_id
    fetch(url)   
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var mainContainer = document.getElementById("desc");
            var p = document.createElement("p");
            p.innerHTML= data.description;
            mainContainer.appendChild(p);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function get_bestmovie(){
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var mainContainer = document.getElementById("bestmovie_img");
            var div = document.createElement("div");
            div.setAttribute("class", "bestmovie_img");
            div.setAttribute("id", data.results[0].id);
            div.innerHTML = '<img src=' + data.results[0].image_url + ' alt='+data.results[0].title + '>';
            mainContainer.appendChild(div);
            var mainContainer = document.getElementById("bestmovie_title")
            var h2 = document.createElement("h2");
            h2.setAttribute("class", "bestmovie_title");
            h2.innerHTML = data.results[0].title;
            mainContainer.appendChild(h2);
            get_description(data.results[0].id);
        })
        .catch(function (err) {
            console.log(err);
        });
}

get_bestmovie();



/* Gestion de la fenetre modale */

/* récupérer les informations sur un film, pour affichage dans la modale*/
function get_moviedetails(movie_id){
    url = 'http://localhost:8000/api/v1/titles/'+movie_id;
        fetch(url)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                var mainContainer = document.getElementById("movie_details");
                var div = document.createElement("div");
                div.setAttribute("class", "movie_details");
                div.setAttribute("id", "movie_det");
                div.innerHTML = '<h2 id="movietitle">' + data.title + '</h2>'
                    + '<img src=' + data.image_url + ' alt="image">'
                    + '<p><b>Genre: </b>' + data.genres 
                    + '<br /><b>Date de sortie: </b>' + data.date_published 
                    + '<br /><b>Rated: </b>' + data.rated
                    + '<br /><b>Score Imdb: </b>' + data.imdb_score
                    + '<br /><b>Réalisateur(s): </b>' + data.directors
                    + '<br /><b>Acteurs: </b>' + data.actors
                    + '<br /><b>Durée: </b>' + data.duration
                    + '<br /><b>Pays: </b>' + data.countries
                    + '<br /><b>Box office: </b>' + data.worldwide_gross_income
                    + '<br /><b>Résumé: </b>' + data.long_description + '</p>';
                mainContainer.appendChild(div);
            })
            .catch(function (err) {
                console.log(err);
            });
}

/*ouverture/fermeture de la modale*/
const modalContainer = document.querySelector(".modal_container");
const modalTriggers = document.querySelectorAll(".modal_trigger");  

modalTriggers.forEach(trigger => trigger.addEventListener("click", openModal));   

function openModal(){
    modalContainer.classList.toggle("active");
    get_moviedetails(this.id);
}



/* caroussel */
const sliders = document.querySelector(".carousel")
var scrollPerClick;
var ImagePadding = 20;

var scrollAmount = 0;
function sliderScrollLeft(){
    sliders.scrollTo({
        top:0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"
    });

    if(scrollAmount < 0) {
        scrollAmount=0
    }
}

function sliderScrollRight() {
    if(scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
        sliders.scrollTo({
            top:0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth"
        });
    }
}
