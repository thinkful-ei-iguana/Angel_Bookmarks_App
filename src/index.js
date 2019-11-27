import store from './store.js';
import api from './api.js';
import mainFuncs from './src/mainFuncs.js/index.js';

function main () {
  api.getBookmarks()
  .then(bookmarks => {
    store.bookmarkObj.bookmarks = bookmarks
    mainFuncs.renderForm();
  });
  mainFuncs.generateEventListeners();
};

$(main);