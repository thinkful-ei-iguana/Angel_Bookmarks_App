import api from "./api.js";

//when the user presses add it generates a add form
function handleAddBookmark () {
  $('.addNew').on('click', function(event) {
    event.preventDefault();
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
      <label for = "urlDescription"> Description: </label>
      <input name = "urlDescription" id="urlDescription>
      <div class = "formButtons">
        <button class = "cancel-entry" type= "button"> Cancel </button>
        <button class = "confirmAdd" type= "button"> Add Bookmark</button>
      </div>
    </form>
  `);
}

//when user fills out the form and wants to add their bookmark to the listing
const AddBookmarkSubmit = function (){
  $('.confirmAdd').on('click', function(event) {
    event.preventDefault();
    console.log('confirm was clicked');
  });
  // $('.confirmAdd').submit(function (event) {
  //   event.preventDefault();
  //   const newListing = $('.addedBookmarkForm').val();
  //   $('.addedBookmarkForm').val('');
  //   api.addBookmark(newListing)
  //   .then(res => res.json())
  //   .then((newItem) => {
  //     store.addBookmark(newListing);
  //     render()
  //   });
  // });
  //   console.log('book mark added');
};


//when the user fills a bookmark form and wants to cancel the add
function handleCancel () {
  $('.addedBookmarkForm').on('click', '.cancel-entry', event => {
    console.log('i was deleted');
  })
}

//serialize form
function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

/*when a bookmark that has been added is pressed, it expands and shows URL,Descr., Rating and the option to delete */
function handleExpand () {
  $('.expandedForm').on('click', function (event){
    event.preventDefault();
    console.log('I am growinng');
    this.store.bookmarkObj.bookmarks.expanded = ! this.store.bookmarkObj.bookmarks.expanded
  })
}

//appears after bookmark are expanded as an option
function handleDelete () {}

function sortByRating () {}

//renders content
function render () {}

//generates the event listeners
function generateEventListeners () {
  handleAddBookmark();
  createNewForm();
  AddBookmarkSubmit();
  handleAddBookmark();
  handleExpand();
  handleCancel ();

}



export default {
  createNewForm,
  handleDelete,
  generateEventListeners,
  render
}

