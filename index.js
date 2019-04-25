'use strict';

/*

moviedb API Key: 32adfb6ef54334ea29ac4a1052dac947
searchURL = 'https://api.themoviedb.org/3/search/movie'
youtube apiKey = 'AIzaSyA1gne6MCNJ56El1-t81328ee4IskQKW6o'; 
youtube searchURL = 'https://www.googleapis.com/youtube/v3/search';


*/







// put your own value below!
let apiKey = '32adfb6ef54334ea29ac4a1052dac947'; 
let searchURL = 'https://api.themoviedb.org/3/search/movie';
let apiKeyYt = 'AIzaSyA1gne6MCNJ56El1-t81328ee4IskQKW6o'; 
let searchURLyt = 'https://www.googleapis.com/youtube/v3/search';


function formatQueryParams(params) {
  let queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&')
}


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  
  $('#results-list').empty();
  // iterate through the items array

  
  for (let i=0; i<responseJson.results.length; i++) {
   
        $('#results-list').append(`
          <li><h3>${responseJson.results[i].title}</h3>
          <a href=https://image.tmdb.org/t/p/original/${responseJson.results[i].poster_path}>
          <img src=https://image.tmdb.org/t/p/original/${responseJson.results[i].poster_path} ></a>
        <a href=https://image.tmdb.org/t/p/original/${responseJson.results[i].backdrop_path}>
        <img class='backdrop' src=https://image.tmdb.org/t/p/original/${responseJson.results[i].backdrop_path}></a>
          <p>${responseJson.results[i].overview}</p>
          <p>Release date: ${responseJson.results[i].release_date}</p>
          </li>
          `)
      };
  //display the results section  
  $('#results').removeClass('hidden');
};

function getResults (query) {
  let params = {
    api_key: apiKey,
    //maxResults,
    query: query,
  };

  let queryString = formatQueryParams(params)

  
  let url = searchURL + '?' + queryString;

  
  console.log(url);


  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });  

}


function formatQueryParamsYt(paramsYt) {
  let queryItemsYt = Object.keys(paramsYt)
    .map(apiKeyYt => `${encodeURIComponent(apiKeyYt)}=${encodeURIComponent(paramsYt[apiKeyYt])}`);
  return queryItemsYt.join('&');
}

function displayResultsYt(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
 
  $('#resultsYt-list').empty();
  // iterate through the items array

  for (let j=0; j<responseJson.items.length; j++) {
 
    $('#resultsYt-list').append(
      `<li><h3>${responseJson.items[j].snippet.title}</h3>
      <p>${responseJson.items[j].snippet.description}</p>
      <a href='https://www.youtube.com/watch?v=${responseJson.items[j].id.videoId}'><img src='${responseJson.items[j].snippet.thumbnails.default.url}'></a>
      <iframe width="420" height="345" src='https://www.youtube.com/embed/${responseJson.items[j].id.videoId}'><img src='${responseJson.items[j].snippet.thumbnails.default.url}'></iframe>
      </li>`)
  };



//display the results section  
$('#resultsYt').removeClass('hidden');
};




function getYoutubeVideos (query /*maxResults=10*/) {
  let paramsYt = {
    key: apiKeyYt,
    q: query  + 'review',
    part: 'snippet',
    //maxResults,
    type: 'video',
    //type: 'player',
  };

  let queryStringYt = formatQueryParamsYt(paramsYt)

  let urlYt=  searchURLyt + '?' + queryStringYt;

  console.log(urlYt);

  fetch(urlYt)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResultsYt(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });


}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    //const limit = $('#js-max-results').val();
    getResults(searchTerm);
    getYoutubeVideos (searchTerm);
  });
}

$(watchForm);