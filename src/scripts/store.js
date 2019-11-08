const bookmarkObj = {
  bookmarks : [],
  adding: false,
  error: null,
  filter: 0,
  expanded : false
};

function addBookmark (bookmark){
  bookmark.expanded = false;
  return this.bookmarkObj.bookmarks.push(bookmark);
}

function deleteBookmark (id) {
  this.bookmarkObj.bookmarks = this.bookmarkObj.bookmarks.filter(bookmark => bookmark.id !== id);
}

function filterSelected () {
  this.bookmarkObj.filter = number;
}

export default {
  addBookmark,
  deleteBookmark,
  filterSelected,
  bookmarkObj
}