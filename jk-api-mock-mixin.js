import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';

// define the mixin
let jkApiMockMixin = (base) => class extends base {

  /**
   * Get data from Local Storage by key or return default value if no data.
   * 
   * @param {String} key key to Localstorage.
   * @param {*} defaultValue some value to return when Localstorage is blank.
   * @returns {*} Data from Local Storagefound by key.
   */
  getFromLocalStorageOrReturnDefaultValue(key, defaultValue) {
    const item = localStorage.getItem(key);
    if (item === null) {
        return defaultValue;
    }
    return JSON.parse(item);
  }

  /**
   * Send data to localstorage.
   * 
   * @param {String} key key for sending to Locl Storage.
   * @param {} item Data for sending to Local Storage.
   */
  setIntoLocalStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * Add new post to Local Strage.
   * 
   * @param {Object} post Post details.
   */
  addNewPost(post) {
    post.postId = this._generateUUID();
    var postsArr = this.getFromLocalStorageOrReturnDefaultValue('allPostsKey', [])    
    postsArr.push(post);
    this.setIntoLocalStorage('allPostsKey', postsArr);
  }

  /**
   * Get data from Local Storage.
   * 
   * @returns {Array} All posts.
   */
  getAllPosts() {
    return this.getFromLocalStorageOrReturnDefaultValue('allPostsKey', []);
  }

  /**
   * Get data from Local Storage.
   * 
   * @returns {Array} Public posts.
   */
  getPublicPosts() {
    return this.getAllPosts().filter(p => p.isPublic);
  }

  /**
   * Get posts for specified user.
   * 
   * @param {String} userName Name of the user.
   * @returns {Array} User's posts.
   */
  getPostsByName(userName) {
    return this.getAllPosts().filter(p => p.userName === userName);
  }

  /**
   * Edit one entry from Local Storage.
   * 
   * @param {Object} post Object with post details.
   */
  editUserPost(post) {
    var postsArr = this.getAllPosts();
    //look for object with the same postId
    var wantedPost = postsArr.find(x => x.postId === post.postId)
    // update it
    wantedPost.text = post.text;
    wantedPost.addedDateTime = post.addedDateTime;
    wantedPost.isPublic = post.isPublic;
    this.setIntoLocalStorage("allPostsKey", postsArr);
  };

  /**
   * Delete one entry from Local Storage.
   * 
   * @param {Object} post Object with post details.
   */
  deleteUserPost(post) {
    var postsArr = JSON.parse(localStorage.getItem("allPostsKey"));
    var index = postsArr.indexOf(postsArr.find(x => x.postId === post.postId));
    if (index > -1) {
      postsArr.splice(index, 1);
    }
    var serializedPostsArray = JSON.stringify(postsArr);
    localStorage.setItem("allPostsKey", serializedPostsArray);
  }

  /**
   * Get all user data from Local Storage.
   * 
   * @returns {{userName: String, password: String, position: String}} User details.
   */
  getUsers() {
    return this.getFromLocalStorageOrReturnDefaultValue('allUsersKey', [])
  }

  /**
   * Get users data from Session Storage and compares it to Local Storage.
   * 
   * @param {Object} user User details.
   * @returns {Boolean} Is user valid.
   */
  userIsValid(user) {
    /*
      TODO the logic is ok, but I would simplify it.
      const { userName, password } = user;
      return !!this.getUsers.find(u => u.userName === userName && u.password === password);

      Instead of !! you can also write `this.getUsers.find(u => u.userName === userName && u.password === password) !== undefined`;
    */
    var usersArray = this.getUsers();
    var isUserValid;
    var user = usersArray.find(x => x.userName === user.userName && x.password === user.password);
    return !!user;
  }

  /**
   * Push mock users data to Local Storage.
   * 
   */
  pushValidUsersToLocalstorage() {
    var serializedUsersArray = localStorage.getItem("allUsersKey");
    if (serializedUsersArray == null)
      localStorage.setItem("allUsersKey", '[{"userName":"OlenaB","password":"test","position":"QA"},{"userName":"IgorV","password":"test","position":"DEV"}]');
  }

  /**
   * Set user data to Session Storage.
   * 
   */
  userLogIn(user) {
    sessionStorage.setItem('myUser', user.userName);
  }

  /**
   *Check if sessionstorage is not null.
   * 
   * @return {Boolean} Is user logged.
   */
  checkUserIsLogged() {
    return sessionStorage.getItem('myUser') != null;
  }

  /**
   * Get info about user from sessionstorage.
   * 
   * @return {{ userName: String, position: String }} User info.
   */
  getloggedInUser() {
    var usersArray = this.getUsers();
    var myUserUserName = sessionStorage.getItem('myUser');
    if (myUserUserName !== null) {
      var user = {
        userName: myUserUserName,
        position: usersArray.find(x => x.userName === myUserUserName).position,
      }
      return user;
    }
  }

  /**
   * Generates random uuid.
   * 
   * @return {String} Generated UUID.
   */
  _generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// deduplicate and export it
export const JkApiMockMixin = dedupingMixin(jkApiMockMixin);