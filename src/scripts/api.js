
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Angel/bookmarks';

function apiFetch (){}

const getBookmarks = function () {
  return apiFetch (`${BASE_URL}`)
};

const addBookmark = function () {};
const updateBookmarks = function () {};
const deleteBookmark = function () {};


export default {
  getBookmarks,
  addBookmark,
  updateBookmarks,
  deleteBookmark
}
