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
      <input name = "newBookmarkTitle" id = "newBookmarkTitle">
      <label for = "newBookmarkURL"> URL: </label>
      <input name = "newBookmarkURL" id = "newBookmarkURL">
      <select id = "newBookmarkRating" name = "newBookmarkRating">
        <option value="">Rating </option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
      <label for = "Description"> Description: </label>
      <input name = "Description" id="description>
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

    if (title !== '' && url !== '' && desc !== '' ){
      //serialize and set data
      let jsonObj = serializeJson(title, url, rating, desc);
      api.addBookmark(jsonObj)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        render();
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
function render () {
  let htmlString = ''
  for(let i = 0; i < store.bookmarkObj.bookmarks.length; i++){
    htmlString += `
    <button class = "deletebutton" data-id=${store.bookmarkObj.bookmarks[i].id}> Delete Bookmark </button>
    <div class = "bookmarkContent" id="bookmark-content" >
      <li>Title:${store.bookmarkObj.bookmarks[i].title} </li>
      <li>URL:${store.bookmarkObj.bookmarks[i].url}</li>
      <li>Description:${store.bookmarkObj.bookmarks[i].desc}</li>
      <li>Rating:${store.bookmarkObj.bookmarks[i].rating}</li></br>
    </div>
    `
  }
  $('.displayBookmarks').html(htmlString)
}


//gets id of bookmark to utilize in a function
// function getBookmarkId(bookmark){
//   return $(bookmark)
//   .closest('div')
//   .attr('id')
// }

//appears after bookmark are expanded as an option
function deletePressed () {
  $('.displayBookmarks').on('click', '.deletebutton', function (event){

    let id = $(event.currentTarget).siblings("div").attr("id")
    api.deleteBookmark(id)
      .then(( ) => {
        store.deleteBookmark(id);
        render();
      });
  });
}


/*when a bookmark that has been added is pressed, it expands and shows URL,Descr., Rating and the option to delete */
function handleExpand () {
  $('.bookmarkContent').on('click', '.expandedForm', function (event){
    event.preventDefault();
    console.log('I am growinng');
    this.store.bookmarkObj.bookmarks.expanded = ! this.store.bookmarkObj.bookmarks.expanded
  })
}

function sortByRating () {}

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
  render
}