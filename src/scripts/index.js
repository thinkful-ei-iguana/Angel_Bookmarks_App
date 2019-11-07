import store from './store.js';
import api from './api.js';
import mainFuncs from './mainFuncs.js';




function main () {
  api.getBookmarks()
  .then(bookmarks => {
    mainFuncs.render();
  });
  mainFuncs.generateEventListeners();
  mainFuncs.render();
};



$(main);