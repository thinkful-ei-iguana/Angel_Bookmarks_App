import store from './src/scripts/store.js';
import api from './src/scripts/api.js';
import mainFuncs from './src/scripts/mainFuncs.js';

function main () {
  api.getBookmarks()
  .then(bookmarks => {
    store.bookmarkObj.bookmarks = bookmarks
    mainFuncs.renderForm();
  });
  mainFuncs.generateEventListeners();
};

$(main);