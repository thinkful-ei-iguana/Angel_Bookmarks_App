// import $ from 'jquery';


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
        <option value="">Sort By Minimum Rating</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
      <label for = "urlDescription"> Description: </label>
      <input name = "urlDescription" id="urlDescription>
      <div class = "formButtons">
        <button type = "submit"> Cancel </button>
        <button id = "confirmAdd" type= "submit"> Add Bookmark</button>
      </div>
    </form>
  `);
}

//serialize form
function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

/*when a bookmark that has been added is pressed, it expands and shows URL,Descr., Rating and the option to delete */
function handleExpand () {}

//appears after added bookmark is expanded as an option
function handleDelete () {}


//generates the event listeners
function generateEventListeners () {
  handleAddBookmark();
  createNewForm();
}

//renders content
function render () {}

export default {
  createNewForm,
  generateEventListeners,
  handleAddBookmark,
  render
}

