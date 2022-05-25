function get_bestrated(){
  fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        append_bestrated(data);
    })
    .catch(function (err) {
        console.log(err);
    });
}

function append_bestrated(data) {
  var mainContainer = document.getElementById("bestrated_list");
  for (var i = 1; i < 8 ; i++) {
    var div = document.createElement("div");
    div.class = "movie"
    div.innerHTML = 'Movie ' + i + ' : '+ data.results[i].id + ' ' 
    + '<img src=' + data.results[i].image_url + 'alt='+data.results[i].title + '>';
    mainContainer.appendChild(div);
  }
}


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
  for (var i = 0; i < 7 ; i++) {
    var div = document.createElement("div");
    div.class = "movie"
    div.innerHTML = 'Movie ' + i + ' : '+ data.results[i].id + ' ' 
    + '<img src=' + data.results[i].image_url + 'alt='+data.results[i].title + '>';
    mainContainer.appendChild(div);
  }
}

