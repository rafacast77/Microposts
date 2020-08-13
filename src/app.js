/** @format */
////////////////////////////////////////////////////////////////////////////////
// Main APPLICATION MODULE
////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------
// Module Imports
//---------------------------------------------------------------------------
import { http } from './http';
import { uI } from './ui';

//---------------------------------------------------------------------------
// Event-Listeners
//---------------------------------------------------------------------------
// On page load, loads posts on DOM
document.addEventListener('DOMContentLoaded', getPosts);

// Add a post EventListener
uI.postBtn_EL.addEventListener('click', submitPost);

// Delete a post EventListener
uI.posts_EL.addEventListener('click', deletePost);

// Change Update-State EventListener
uI.posts_EL.addEventListener('click', updateState);

// Cancel Update-State EventListener
uI.formPost_EL.addEventListener('click', cancelUpdateState);

//---------------------------------------------------------------------------
// Functions
//---------------------------------------------------------------------------
// Loads posts from REST-API to DOM
function getPosts() {
  http
    .getPosts('http://localhost:3000/posts')
    .then((data) => uI.showPosts(data))
    .catch((err) => console.log(err));
}

// Add or Updates post to REST-API and DOM
function submitPost(e) {
  const tittle = uI.postTittle_EL.value,
    body = uI.postBody_EL.value,
    id = uI.idSpan_EL.value;

  const data = {
    tittle,
    body,
  };
  // Validate input
  if (tittle === '' || body === '') {
    uI.showAlert('All inputs must be filled', 'alert-danger');
  } else {
    
    // Adds a Post
    if (e.target.textContent === 'Post') {
      http
        .post('http://localhost:3000/posts', data)
        .then((data) => {
          uI.showAlert('New Post Added', 'alert-success');
          uI.clearInputs();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {

      // Updates existing post
      http
        .updatePost(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          uI.showAlert('Post Updated', 'alert-success');
          uI.clearInputs();
          uI.changeAddState();
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

// Delete Post from REST-API and DOM
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    http.deletePost(`http://localhost:3000/posts/${id}`);
    uI.showAlert('Post deleted', 'alert-success');
    getPosts();
  }
  e.preventDefault();
}

// Changes Post-State to Update-State
function updateState(e) {
  if (e.target.parentElement.classList.contains('update')) {
    const body = e.target.parentElement.previousElementSibling.innerText,
      tittle =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .innerText,
      id = e.target.parentElement.dataset.id,
      data = {
        tittle,
        body,
        id,
      };

    uI.changeUpdateState(data);
  }
  e.preventDefault();
}

// Cancel Update-State
function cancelUpdateState(e) {
  if (e.target.classList.contains('cancel')) {
    uI.changeAddState();
    uI.clearInputs();
  }
}
