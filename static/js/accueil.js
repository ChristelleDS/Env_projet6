/* BEST MOVIE */

function get_description(movie_id){
    /* récupérer la description du meilleur film par API */
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
    /* Récupérer le meilleur film par API et créer le bloc dans le DOM */
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var mainContainer = document.getElementById("bestmovie_img");
            var div = document.createElement("div");
            div.setAttribute("class", "bestmovie");
            div.innerHTML = '<img src=' + data.results[0].image_url + '>';
            mainContainer.appendChild(div);
            var mainContainer = document.getElementById("bestmovie_title");
            var h2 = document.createElement("h2");
            h2.setAttribute("class", "bestmovie_title");
            h2.innerHTML = data.results[0].title;
            mainContainer.appendChild(h2);
            var but = document.createElement("button");
            but.setAttribute("onclick", "document.getElementById('modal1').style.display='block', get_moviedetails(id)");
            but.setAttribute("class", "button-play modal_btn"); 
            but.setAttribute("id", data.results[0].id);
            but.innerText="Play";
            mainContainer.appendChild(but);
            get_description(data.results[0].id);
        })
        .catch(function (err) {
            console.log(err);
        });
}

get_bestmovie();


/* MOVIES LIST */

function get_listmovies(genre, bloc_id){          
    /* récupérer par API la liste des films */
    url1 = 'http://localhost:8000/api/v1/titles/?genre='+genre+'&sort_by=-imdb_score';
    url2 = 'http://localhost:8000/api/v1/titles/?genre='+genre+'&page=2&sort_by=-imdb_score';
    Promise.all([
            fetch(url1).then(value => value.json()),
            fetch(url2).then(value => value.json())
            ])
            .then((value) => {
                var json1 = value[0].results;
                var json2 = value[1].results;
                var liste = json1.concat(json2);
                append_item(liste, bloc_id);
            })
            .catch((err) => {
                console.log(err);
            });
}


function createButton(bloc_id, id, src){
    /* créer un bouton déclenchant l'ouverture de la modale présentant les infos sur le film */
        var div = document.getElementById(bloc_id);
        var img = document.createElement("img");
        img.setAttribute("src",src);
        img.setAttribute("onclick", "document.getElementById('modal1').style.display='block', get_moviedetails(id)");
        img.setAttribute("class", "product modal_btn");
        img.setAttribute("data-slide",bloc_id.substr(-1));   
        img.setAttribute("id", id);
        div.replaceChild(img, div.firstChild);
}


function append_item(data, bloc_id) {
    /* Créer un bouton pour chaque film */
    var div = document.getElementById(bloc_id);
    var blocs = div.getElementsByTagName("li");
    if (bloc_id=="bestrated_list"){
      // exclure le meilleur film
      for (var i = 1; i < 8 ; i++) 
        createButton(blocs[i-1].id, data[i].id, data[i].image_url);
    } else {
      for (var i = 0; i < 7 ; i++) 
        createButton(blocs[i].id, data[i].id, data[i].image_url);
    }
}


get_listmovies("", "bestrated_list");
get_listmovies("action", "action_list");  
get_listmovies("comedy", "comedy_list");
get_listmovies("drama", "drama_list");




/* CAROUSEL CODE */

(function() {
  var carousels = document.querySelectorAll('.js-product-carousel');
  
  [].forEach.call(carousels, function(carousel) {
    carouselize(carousel);
  });
  
})();

function carouselize(carousel) {
  var productList = carousel.querySelector('.js-product-list');
  var productListWidth = 0;
  var productListSteps = 0;
  var products = carousel.querySelectorAll('.product');
  var productAmount = 0;
  var productAmountVisible = 4;
  var carouselPrev = carousel.querySelector('.js-carousel-prev');
  var carouselNext = carousel.querySelector('.js-carousel-next');

  //Count all the products
  [].forEach.call(products, function(product) {
    productAmount++;
    productListWidth += 250;
    productList.style.width = productListWidth+"px";
  });

  carouselNext.onclick = function() {
    if(productListSteps < productAmount-productAmountVisible) {
      productListSteps++;
      moveProductList();
    }
  }
  carouselPrev.onclick = function() {
    if(productListSteps > 0) {
      productListSteps--;
      moveProductList();
    }
  }
  
  // Move the carousels product-list
  function moveProductList() {
    productList.style.transform = "translateX(-"+205*productListSteps+"px)";
  }
}




/* MODAL */

function get_moviedetails(movie_id){
    /* récupérer les informations sur un film, pour affichage dans la modale*/
    url = 'http://localhost:8000/api/v1/titles/'+movie_id;
        fetch(url)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                var mainContainer = document.getElementById("movie_details");
                /* vider les infos movie antérieures de la modale */
                mainContainer.removeChild(mainContainer.firstChild);
                /* créer le bloc avec les infos sur le film */
                var div = document.createElement("div");
                div.setAttribute("class", "movieDetails");
                div.innerHTML = '<h2 id="movietitle">' + data.title + '</h2>'
                    + '<img src=' + data.image_url + '>'
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

// Get the modal
var modal = document.getElementById("modal1");

// Get the button that opens the modal
var btn = document.querySelectorAll('.modal_btn');
/*btn.forEach(trigger => trigger.addEventListener("click", openModal)); */

// Get the <span> element that closes the modal
var span = document.getElementById("close_modal");

// When the user clicks the button, open the modal 
btn.onclick = function() {  
/* function openModal() { */
  modal.style.display = "block";
  get_moviedetails(this.id);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}