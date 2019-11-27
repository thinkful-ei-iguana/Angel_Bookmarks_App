# Angel_Bookmarks_App
User Stories

user can add bookmarks to my bookmark list. Bookmarks contain:

title
url link
description
rating (1-5)

user can see a list of my bookmarks when user first opens the app

All bookmarks in the list default to a "condensed" view showing only title and rating
user can click on a bookmark to display the "detailed" view

Detailed view expands to additionally display description and a "Visit Site" link,
user can remove bookmarks from users bookmark list

user receive appropriate feedback when user cannot submit a bookmark

Check all validations in the API documentation (e.g. title and url field required)
user can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection

Technical Requirements
Use fetch for AJAX calls and jQuery for DOM manipulation

Use namespacing to adhere to good architecture practices

Minimal global variables
Create modules in separate files to organize your code
Logically group your functions (e.g. API methods, store methods...)
Keep your Data out of the DOM

No direct DOM manipulation in your event handlers!
Follow the React-ful design pattern - change your state, re-render your component
Use semantic HTML

Use a responsive and mobile-first design

Visually and functionally solid in viewports for mobile and desktop
Follow a11y best practices

Refer back to the lessons on accessibility, forms
