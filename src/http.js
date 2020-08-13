/** @format */
////////////////////////////////////////////////////////////////////////////////
// POST HTTP ROUTING TO API
////////////////////////////////////////////////////////////////////////////////
class PostsHTTP {
  //---------------------------------------------------------------------------
  // HTTP routing functions
  //---------------------------------------------------------------------------
  // Get posts from API
  async getPosts(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  // Adds a post to API
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }

  // Updates a post in API
  async updatePost(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }

  // DELETE post from API
  async deletePost(url, id) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const resData = await 'Resource Deleted...';
    return resData;
  }
}
export const http = new PostsHTTP();
