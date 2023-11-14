import { displaySearchedGIF } from  './index.js'

export function searchGIFs(query) {
  let request = new XMLHttpRequest();
  const requestString = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${process.env.API_KEY}&limit=1`;
  request.open("GET",requestString,true);
  request.send();
  request.addEventListener("loadend",function() {
    const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        displaySearchedGIF(response.data[0].embed_url);
        return;
      } else if (this.status === 404) {
        document.getElementById("errorDiv").innerText = `Returned error ${this.status}, indicating that no results were found for the specified search query. Please try a different search query.`;
      } else if (this.status === 414) {
        document.getElementById("errorDiv").innerText = `Returned error ${this.status}, indicating that the search query exceeded 50 characters. Please try again with a shorter search query.`;
      } else if (this.status === 429) {
        document.getElementById("errorDiv").innerText = `Returned error ${this.status}, indicating that the API Key limit has been reached. Please try again later.`;
      } else {
        document.getElementById("errorDiv").innerText = `Returned error ${this.status}`;
      }
  });
}

export function trendingGIFs() {
  let request = new XMLHttpRequest();
  const requestString = `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=1`;
  request.open("GET",requestString,true);
  request.send();
  request.addEventListener("loadend",function() {
    const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        displaySearchedGIF(response.data[0].embed_url);
        return;
      } else if (this.status === 429) {
        document.getElementById("errorDiv").innerText = `Returned error ${this.status}, indicating that the API Key limit has been reached. Please try again later.`;
      } else {
        document.getElementById("errorDiv").innerText = `Returned error ${this.status}`;
      }
  });
}

export function randomGIFs() {
  let request = new XMLHttpRequest();
  const requestString = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&limit=1`;
  request.open("GET",requestString,true);
  request.send();
  request.addEventListener("loadend",function() {
    const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        displaySearchedGIF(response.data.embed_url);
        return;
      } else if (this.status === 429) {
        document.getElementById("errorDiv").innerText = `Returned error ${this.status}, indicating that the API Key limit has been reached. Please try again later.`;
      } else {
        document.getElementById("errorDiv").innerText = `Returned error ${this.status}`;
      }
  });
}

export function uploadGIF(url, tags) {
  let request = new XMLHttpRequest();
  const requestString = `https://upload.giphy.com/v1/gifs`;
  request.open("POST",requestString,true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
  
  const body = JSON.stringify({
    api_key: process.env.API_KEY,
    source_image_url: url,
    tags: tags,
    completed: false
  }); 
  
  request.send(body);
  
  request.addEventListener("loadend",function() {
    const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        console.log(response);
        return;
      } else {
        document.getElementById("errorDiv").innerText = `Returned error ${this.status}`;
      }
  });
}


  // `http://upload.giphy.com/v1/gifs?api_key=${process.env.API_KEY}&source_image_url=${url}&tags=${tags}`;