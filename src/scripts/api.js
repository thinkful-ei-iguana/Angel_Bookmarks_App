// import cuid from 'cuid';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Angel/bookmarks';

//error handling 
function apiFetch(...args) {
  let error;
  return fetch (...args)
    .then (res =>  {
      if (!res.ok) {
        error = {code: res.status}
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    })
}  

const placeBookmarks = function () {
  api.getBookmarks()
    .then(bookmarks => {
       mainFuncs.render(bookmarks);
    })
};

const getBookmarks = function () {
  return apiFetch (`${BASE_URL}`)
};


const addBookmark = function (newBookmark) {
  return apiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {'content-Type': 'application/json'},
    body: newBookmark
  });
};
const updateBookmarks = function (id, updateData) {
  let updateBookmark = JSON.stringify(updateData);
  return apiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type' : 'application/json'},
    body: updatedBookmark
  });
};

 const deleteBookmark = function (id) {
  return apiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
 }


export default {
  addBookmark,
  updateBookmarks,
  getBookmarks,
  placeBookmarks,
  deleteBookmark
}
