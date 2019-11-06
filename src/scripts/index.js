import $ from 'jquery';
import store from './store.js';
import api from './api.js';
import mainFuncs from './mainFuncs.js';

function main () {
  api.getBookmarks()
  .then(bookmarks => {
    console.log(bookmarks);
    bookmarks.forEach((bookmarks) => store.addItem(bookmark));
    buttonFeatures.render();
  });
  buttonFeatures.generateEventListeners();
  buttonFeatures.render();
}



$(main);