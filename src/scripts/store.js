const bookmarkObj = {
  bookmarks : [],
  adding: false,
  error: null,
  filter: 0
};

function addBookmark (bookmark){
  bookmark.expanded = false;
  this.bookmarkObj.bookmarks.push(bookmark);
}

export default {
  addBookmark,
  bookmarkObj
}