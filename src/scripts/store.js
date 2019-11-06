const store = {
  bookmarks : [
    {
    id: '77dr',
    title: 'title 11',
    rating: 3,
    url: 'http://wwww.booktitle.com',
    description: 'i am a book',
    expanded: false      
  },
  {
    id: 'xy76',
    title: 'title 22',
    rating: 4,
    url: 'http://wwww.booktitle2.com',
    description: 'i am book two',
    expanded: false
  }
  ],
  adding: false,
  error: null,
  filter: 0
};


function addBookmark(){
  console.log(bookmark);
  console.log(store);
}

export default {
  store,
  addBookmark
}