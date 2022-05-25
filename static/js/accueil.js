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
            div.id = data.results[0].id;
            div.innerHTML ='<img src=' + data.results[0].image_url + ' alt='+data.results[0].title + '>';
            mainContainer.appendChild(div);
        })
        .catch(function (err) {
            console.log(err);
        });
}



var movies = document.getElementsByClassName("movie");
var modal = document.getElementById("modal")
var close_modal = document.getElementById("close_modal");
movies.style.cursor = 'pointer';
// When the user clicks on a movie, open the modal
movies.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
close_modal.onclick = function() {
  modal.style.display = "none";
}
