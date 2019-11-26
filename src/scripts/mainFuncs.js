import api from "./api.js";
import store from './store.js';

//when the user presses add it generates an add form
function handleAddBookmark () {
  $('.addNew').on('click', function(event) {
    event.preventDefault();
    showForm(true);
    console.log('add was clicked');
    createNewForm();
  });
}

function showForm(boolean){
  if(boolean){
    $('.addFormArea').show();
  }else{
    $('.addFormArea').hide();
  }

}
//after add is clicked this form is rendered to add a new bookmark
function createNewForm () {
  $('.addFormArea').html (`
    <form class="addedBookmarkForm" id="addedForm>
      <label for="newBookmarkTitle"> New Bookmark: </label>
      <input type="text" name= "newBookmarkTitle" id="newBookmarkTitle" required >
      <label  for="newBookmarkURL"> URL: </label>
      <input type="url" name="newBookmarkURL" id="newBookmarkURL" required>
      <select id="newBookmarkRating" name="newBookmarkRating" required>
        <option value=""> Rating... </option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
      <label for = "description"> Description: </label>
      <input type="text" name="Description" id="bookmarkDescription" required >
      <div class = "formButtons">
        <button class = "cancelEntry" type= "button"> Cancel </button>
        <button class = "confirmAdd" type= "submit"> Add Bookmark</button>
      </div>
    </form>
  `);
}

function clearForm(){
  $('#newBookmarkTitle').val('');
  $('#newBookmarkURL').val('');
  $('#bookmarkDescription').val('');
  $('#newBookmarkRating').val('');
}
//when user fills out the form and wants to add their bookmark to the listing
function addBookmarkSubmit (){
  $('body').on('submit', '.addedBookmarkForm', function(event) {
    event.preventDefault();
    console.log('confirm was clicked');
    let title = $('#newBookmarkTitle').val();
    let url = $('#newBookmarkURL').val();
    let desc = $('#bookmarkDescription').val();
    let rating = $('#newBookmarkRating').val();
    clearForm();
      if (title !== '' && url !== '' ){
        //serialize and set data
        let jsonObj = serializeJson(title,url,rating,desc);
        console.log(jsonObj)
        api.addBookmark(jsonObj)
        .then((newBookmark) => {
          console.log(newBookmark)
          store.addBookmark(newBookmark);
         renderForm();
         showForm(false);
        });
        console.log(jsonObj);
      } else {
        //send error message that title and url are required
        alert ('must fill form in order to add this bookmark')
      }
  });
  
};

//when the user fills a bookmark form and wants to cancel the add
function handleCancel () {
  $('body').on('click', '.cancelEntry', function(event) {
    event.preventDefault();
    showForm(false);
    clearForm();
    console.log('i was canceled');
  })
}

//serialize form
function serializeJson(title, url, rating, desc,) {
  return JSON.stringify({ 
    title, url, rating, desc
  });
}

//renders Addedcontent
function renderForm (arr) {
  arr= arr || store.bookmarkObj.bookmarks;
  let htmlString = ''
  for(let i = 0; i < arr.length; i++){
    htmlString += `
    <ul class = "bookmarkContent" id="bookmark-content" >
      <li>Title:${arr[i].title} </li>
      <li class ="toggleHidden hidden">URL:${arr[i].url}</li>
      <li class ="toggleHidden hidden">Description:${arr[i].desc}</li>
      <li>Rating:${arr[i].rating}</li></br>
      <button class = "deletebutton" data-id=${arr[i].id}> Delete Bookmark </button>
      <button class = "expand" > + </button>
    </ul>
    `
  }
  $('.displayBookmarks').html(htmlString)
}

/*when a bookmark that has been added is pressed, it expands and shows URL,Descr., Rating and the option to delete */

function handleExpand () {
  $('.displayBookmarks').on('click','.expand', function (event) {
    console.log('i was clicked')
    event.preventDefault();
    $(event.currentTarget).siblings(".toggleHidden").toggleClass("hidden")
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


function filterRating () {
  $('body').on('change','.filter', function(event) {
    let newRating=$(event.target).find(':selected').val();
    let newArr = store.bookmarkObj.bookmarks.filter(bookmark => bookmark.rating >= newRating) 
    renderForm(newArr);
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
  filterRating();
  clearForm();
}

export default {
  createNewForm,
  generateEventListeners,
  renderForm
}