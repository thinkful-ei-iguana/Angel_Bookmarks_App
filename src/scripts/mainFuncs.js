import api from "./api.js";
import store from './store.js';

//when the user presses add it generates a add form
function handleAddBookmark () {
  $('.addNew').on('click', function(event) {
    event.preventDefault();
      $('.addFormArea').toggle();
    console.log('add was clicked');
    createNewForm();
  });
}

//after add is clicked this form is rendered to input a new bookmark
function createNewForm () {
  $('.addFormArea').html (`
    <form class = "addedBookmarkForm">
      <label for = "newBookmarkTitle"> New Bookmark: </label>
      <input type="text" name = "newBookmarkTitle" id = "newBookmarkTitle" required >
      <label  for = "newBookmarkURL"> URL: </label>
      <input type="url" name = "newBookmarkURL" id = "newBookmarkURL" required>
      <select id = "newBookmarkRating" name = "newBookmarkRating" required>
        <option value="">Rating </option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
      <label for = "Description"> Description: </label>
      <input type="text" name = "Description" id="description required >
      <div class = "formButtons">
        <button class = "cancel-entry" type= "button"> Cancel </button>
        <button class = "confirmAdd" type= "submit"> Add Bookmark</button>
      </div>
    </form>
  `);
}


//when user fills out the form and wants to add their bookmark to the listing
const addBookmarkSubmit = function (){
  $('body').on('submit', '.addedBookmarkForm', function(event) {
    event.preventDefault();
    console.log('confirm was clicked');
    let title = $('#newBookmarkTitle').val();
    let url = $('#newBookmarkURL').val();
    let rating = $('#newBookmarkRating').val();
    let desc = $('#description').val();
      if (title !== '' && url !== '' ){
        //serialize and set data
        let jsonObj = serializeJson(title, url, rating, desc);
        api.addBookmark(jsonObj)
        .then((newBookmark) => {
          store.addBookmark(newBookmark);
         renderForm();
        });
        console.log(jsonObj);
      } else {
        //send error message that title and url are required
        alert ('must fill form in order to add this bookmark')
      }
  });
  
};

//serialize form
function serializeJson(title, url, rating, desc) {
  return JSON.stringify({ 
    title, url, rating, desc
  });
}

//renders content
function renderForm () {
  let htmlString = ''
  for(let i = 0; i < store.bookmarkObj.bookmarks.length; i++){
    htmlString += `
    <div class = "bookmarkContent" id="bookmark-content" >
      <li>Title:${store.bookmarkObj.bookmarks[i].title} </li>
      <li class="hidden"  hidden>URL:${store.bookmarkObj.bookmarks[i].url}</li>
      <li class="hidden" hidden>Description:${store.bookmarkObj.bookmarks[i].desc}</li>
      <li>Rating:${store.bookmarkObj.bookmarks[i].rating}</li></br>
      <button class = "deletebutton" data-id=${store.bookmarkObj.bookmarks[i].id}> Delete Bookmark </button>
      <button class = "expand" data-id=${store.bookmarkObj.bookmarks[i].id}> + </button>
    </div>
    `
  }
  $('.displayBookmarks').html(htmlString)
}

function handleExpand () {
  $('.displayBookmarks').on('click', '.expand', function (event) {
    $('.bookmarkContent', '.hidden').remove(attr)
  })
}

//appears after bookmark are expanded as an option
function deletePressed () {
  $('.displayBookmarks').on('click', '.deletebutton', function (event){

    let id = $(event.currentTarget).data("id");
    api.deleteBookmark(id)
      .then(( ) => {
        store.deleteBookmark(id);
        renderForm();
      });
  });
}


/*when a bookmark that has been added is pressed, it expands and shows URL,Descr., Rating and the option to delete */


function setRating () {

}

//when the user fills a bookmark form and wants to cancel the add
function handleCancel () {
  $('.addedBookmarkForm').on('click', '.cancel-entry', event => {
    console.log('i was deleted');
  })
}

//generates the event listeners
function generateEventListeners () {
  createNewForm();
  addBookmarkSubmit();
  handleAddBookmark();
  handleExpand();
  handleCancel ();
  deletePressed();
}

export default {
  createNewForm,
  generateEventListeners,
  renderForm
}