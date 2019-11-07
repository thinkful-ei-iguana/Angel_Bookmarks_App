import cuid from 'cuid';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Angel/bookmarks';

//error handling 
function apiFetch(...args) {
  let error;
  return fetch (...args)
    .then(res =>{
      if(!res.ok){
        error = {code: res.status};
      }
      return res.json();
    })
    .then(data => {
      if (error){
        error.message = data.message;
        return Promise.rejects(error);
      }
      return data;
    });
}


const getBookmarks = function () {
  return apiFetch (`${BASE_URL}/bookmarks`)
};


const addBookmark = function () {
  let newBookmark = JSON.stringify(newData);
  return apiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {'content-Type': 'application/json'},
    body: newBookmark
  });
};
const updateBookmarks = function () {};

const deleteBookmark = function () {};


export default {
  addBookmark,
  updateBookmarks,
  getBookmarks,
  deleteBookmark
}
