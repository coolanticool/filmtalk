'use strict';

/*

moviedb API Key: 32adfb6ef54334ea29ac4a1052dac947




*/







// put your own value below!
let apiKey = '32adfb6ef54334ea29ac4a1052dac947'; 
let searchURL = 'https://api.themoviedb.org/3/search/movie';


function formatQueryParams(params) {
  let queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  
  $('#results-list').empty();
  // iterate through the items array

  
  for (let i=0; i<responseJson.results.length; i++) {
   
        $('#results-list').append(`
          <li><h3>${responseJson.results[i].title}</h3>
        
          <p>${responseJson.results[i].id}</p>
          <p>${responseJson.results[i].overview}</p>
          <p>${responseJson.results[i].release_date}</p>
          </li>
          `)
      };
  //display the results section  
  $('#results').removeClass('hidden');
};

  function getResults(query, maxResults=10) {
    let params = {
      api_key: apiKey,
      maxResults,
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

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getResults(searchTerm, limit);
  });
}

$(watchForm);