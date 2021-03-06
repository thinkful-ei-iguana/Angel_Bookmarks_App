import api from "./api.js";
import store from './store.js';

//when the user presses add it generates a new bookmark form
function handleAddBookmark () {
  $('.addNew').on('click', function(event) {
    event.preventDefault();
    showForm(true);
    // showMarks(false);
    console.log('add was clicked');
    createNewForm();
  });
}

//after add is clicked this form is rendered to add a new bookmark
function createNewForm () {
  $('.addFormArea').html (`
    <form class="addedBookmarkForm" id="addedForm>
      <div class="input-fields">
        <label for="newBookmarkTitle"> New Bookmark: </label>
        <input type="text" name="newBookmarkTitle" class="input" placeholder="Bookmark Title . . ." id="newBookmarkTitle" required ></br>
        <label  for="newBookmarkURL"> URL: </label>
        <input type="url" name="newBookmarkURL" placeholder="URL . . ." class="input" id="newBookmarkURL" required></br>
      </div>
      <select id="newBookmarkRating" name="newBookmarkRating" required>
        <option value=""> Rating . . . </option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select></br>
      <label for = "description"> Description: </label>
      <input type="text" name="Description" placeholder="Description . . ." class="input" id="bookmarkDescription" required ></br>
      <div class = "formButtons">
        <button class="cancelEntry" type= "button"> Cancel </button>

        <button class="confirmAdd" type= "submit"> Add </button>
      </div>
    </form>
  `);
} 
//hides and shows form
function showForm(boolean){
  if(boolean){
    $('.addFormArea').show() && $('.displaymarks').hide();
  }else{
    $('.addFormArea').hide() && $('.displaymarks').show();
  }
}
//hides form on page load
function pageLoad() {
  $('.addFormArea').hide();
}


//clears form
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
function serializeJson(title, url, rating, desc) {
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
    <div class="bookmarkList">
      <ul class = "bookmarkContent" id="bookmark-content" >
      <button class = "expand" > + </button>
        <li>Title: ${arr[i].title} </li>
        <li class ="toggleHidden hidden"> <a href="${arr[i].url}">${arr[i].url}  </a></li>
        <li class ="toggleHidden hidden">Description: ${arr[i].desc}</li>
        <li>Rating: ${arr[i].rating}</li></br>
        
        <button class ="toggleHidden hidden" id="deletebutton" data-id=${arr[i].id}> Delete </button>
      </ul>
    </div>
    `
  }
  $('.displayBookmarks').html(htmlString)
}
/*when a + is pressed it expands and shows URL,Descr,Rating and the option to delete */
function handleExpand () {
  $('.displayBookmarks').on('click','.expand', function (event) {
    console.log('i was clicked')
    event.preventDefault();
    $(event.currentTarget).siblings(".toggleHidden").toggleClass("hidden")
  });
}
//delete added bookmark
function deletePressed () { 
  $('.displayBookmarks').on('click', '#deletebutton', function (event){
    let id = $(event.currentTarget).data("id");
    api.deleteBookmark(id)
      .then(( ) => {
        store.deleteBookmark(id);
        renderForm();
      });
  });
}
//filter the ratings
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
  // showForm();
  // showMarks();
  pageLoad();
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