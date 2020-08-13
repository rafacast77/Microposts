/** @format */
////////////////////////////////////////////////////////////////////////////////
// USER INTERFACE MODULE
////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------
// User Interface class constructor
//---------------------------------------------------------------------------
class UI {
  constructor() {
    this.posts_EL = document.querySelector('#posts');
    this.mainPosts_EL = document.querySelector('#main-container');
    this.postTittle_EL = document.querySelector('#post-tittle');
    this.postBody_EL = document.querySelector('#post-body');
    this.postBtn_EL = document.querySelector('#post-btn');
    this.idSpan_EL = document.querySelector('#id');
    this.formPost_EL = document.querySelector('#form-post');
  }

  //---------------------------------------------------------------------------
  // User Interface Class functions
  //---------------------------------------------------------------------------
  // Loads posts into DOM
  showPosts(postData) {
    let output = '';
    // Most recent post first
    postData.reverse();

    postData.forEach((post) => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h3 class="card-tittle">${post.tittle}</h3>
          <p class="card-text">${post.body}</p>
          <a href="#" class="update card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
    });
    this.posts_EL.innerHTML = output;
  }

  // Shows an Alert message
  showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerText = message;
    this.mainPosts_EL.insertBefore(alert, this.posts_EL);
    setTimeout(function () {
      alert.remove();
    }, 2000);
  }

  // Clear post form inputs
  clearInputs() {
    this.postBody_EL.value = '';
    this.postTittle_EL.value = '';
    this.idSpan_EL.value = '';
  }

  // Changes the add-state to update-state
  changeUpdateState(data) {
    // Transfer values from post to inputs
    this.postTittle_EL.value = data.tittle;
    this.postBody_EL.value = data.body;
    this.idSpan_EL.value = data.id;

    // Configure update state buttons
    this.postBtn_EL.textContent = 'Update Post';
    this.postBtn_EL.className = 'btn btn-warning btn-block';
    const cancel = document.createElement('button');
    cancel.className = 'cancel btn btn-secondary btn-block mt-2';
    cancel.textContent = 'Cancel';
    this.postBtn_EL.insertAdjacentElement('afterend', cancel);
  }

  // Changes the update-state to add-state
  changeAddState() {
    document.querySelector('.cancel').remove();
    this.postBtn_EL.textContent = 'Post';
    this.postBtn_EL.className = 'btn btn-primary btn-block';
  }
}
export const uI = new UI();
