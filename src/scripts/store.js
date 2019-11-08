const bookmarkObj = {
  bookmarks : [],
  adding: false,
  error: null,
  filter: 0
};

function addBookmark (bookmark){
  bookmark.expanded = false;
  return this.bookmarkObj.bookmarks.push(bookmark);
}

function deleteBookmark (id) {
  this.bookmarks = this.bookmarkObj.bookmarks.filter(bookmark => bookmark.id !== id);
}


export default {
  addBookmark,
  deleteBookmark,
  bookmarkObj
}