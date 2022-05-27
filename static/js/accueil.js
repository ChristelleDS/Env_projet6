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
        var div = document.createElement("div");
        div.setAttribute("class", "movie");
        div.id = data.results[i].id;
        div.innerHTML ='<img src=' + data.results[i].image_url + ' alt='+data.results[i].title + '>';
        mainContainer.appendChild(div);
      }
    default:
        for (var i = 0; i < 6 ; i++) {
            var div = document.createElement("div");
            div.setAttribute("class", "movie");
            div.id = data.results[i].id;
            div.innerHTML ='<img src=' + data.results[i].image_url + ' alt='+data.results[i].title + '>';
            mainContainer.appendChild(div);
          }
    }
}



function get_bestmovie(){
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var mainContainer = document.getElementById("bestmovie");
            var div = document.createElement("div");
            div.setAttribute("class", "movie");
            div.setAttribute("id", data.results[0].id);
            div.innerHTML ='<p class="best_name">' + data.results[0].title + '</p>' +
            '<img src=' + data.results[0].image_url+ ' alt='+data.results[0].title + '>';
            mainContainer.appendChild(div);
        })
        .catch(function (err) {
            console.log(err);
        });
}


const modalContainer = document.querySelector(".modal_container");
const modalTriggers = document.querySelectorAll(".modal_trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

function toggleModal(){
    modalContainer.classList.toggle("active")
}

function get_moviedetails(){
    url = 'http://localhost:8000/api/v1/titles/9'
        fetch(url)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                var mainContainer = document.getElementById("movie_details");
                var div = document.createElement("div");
                div.setAttribute("class", "movie_details");
                div.innerHTML ='<h2>' + data.title+'</h2>'
                    + '<br /><img id ="moviecover" src=' + data.image_url + ' alt="image">'
                    + '<br /><p><b>Genre: </b>' + data.genres 
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