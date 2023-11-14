import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { searchGIFs, trendingGIFs, randomGIFs, uploadGIF } from './giphy-api.js'

function handleForm() {
  event.preventDefault();
  const input = document.getElementById("gifSearchBox").value;
  searchGIFs(input);
}

export function displaySearchedGIF(url) {
  let gifHolder = document.getElementById("displayDiv");
  let iframe = document.createElement("iframe");
  iframe.setAttribute("src", url);
  gifHolder.append(iframe);
}

function handleTrending() {
  event.preventDefault();
  trendingGIFs();
}

function handleRandom() {
  event.preventDefault();
  randomGIFs();
}

function handleUpload() {
  event.preventDefault();
  const inputUrl = document.getElementById("gifUploadUrl").value;
  const inputTags = document.getElementById("gifTags").value;
  uploadGIF(inputUrl, inputTags);
}

window.addEventListener("load", function () {
  this.document.getElementById("gifSearchForm").addEventListener("submit", handleForm);
  this.document.getElementById("trendingButton").addEventListener("click", handleTrending);
  this.document.getElementById("randomButton").addEventListener("click", handleRandom);
  this.document.getElementById("gifUploadForm").addEventListener("submit", handleUpload);
})