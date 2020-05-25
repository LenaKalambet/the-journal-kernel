import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';

// define the mixin
let jkApiMockMixin = (base) => class extends base {

  /**
   * Add new post to Local Strage.
   * 
   * @param {Object} post Post details.
   */
  addNewPost(post) {
    post.postId = this._generateUUID();
    // TODO create a method 
    /* getFromLocalStorageOrReturnDefault(key, default) {
        const item = localStorage.getItem(key);
        if (item === null) {
            return default;
        }
        
        return JSON.stringify(item);
    }

    You can use it in getAllPosts too.
    */
    var postsArr = [];
    var serializedPostsArray = localStorage.getItem("allPostsKey");
    if (serializedPostsArray != null) {
      postsArr = JSON.parse(serializedPostsArray);
    }
    postsArr.push(post);

    /*
      TODO: create a method
      setIntoLocalStorage(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
      }

      You can use it in other places in this file too :)
    */
    serializedPostsArray = JSON.stringify(postsArr);
    localStorage.setItem("allPostsKey", serializedPostsArray);
  }

  /**
   * Get data from Local Storage.
   * 
   * @returns {Array} All posts.
   */
  getAllPosts() {
    // TODO: use getFromLocalStorageOrReturnDefault("allPostsKey", []);
    var postsArr = [];
    var serializedPostsArray = localStorage.getItem("allPostsKey");
    if (serializedPostsArray != null) {
      postsArr = JSON.parse(serializedPostsArray);
    }
    return postsArr;
  }

  /**
   * Get data from Local Storage.
   * 
   * @returns {Array} Public posts.
   */
  getPublicPosts() {
    /*
      TODO: also can be written.
      return this.getAllPosts().filter(p => p.isPublic);
    */
    var allPosts = this.getAllPosts();
    var posts = [];
    for (var i = 0; i < allPosts.length; i++) {
      // TODO: no need to check a boolean value with true or false.
      if (allPosts[i].isPublic == true) {
        posts.push(allPosts[i])
      }
    }
    return posts;
  }

  /**
   * Get posts for specified user.
   * 
   * @param {String} userName Name of the user.
   * @returns {Array} User's posts.
   */
  getPostsByName(userName) {
    /*
    TODO:
      return this.getAllPosts().filter(p => p.userName === userName);
    */
    var allPosts = this.getAllPosts();
    var posts = [];
    for (var i = 0; i < allPosts.length; i++) {
      if (allPosts[i].userName == userName) {
        posts.push(allPosts[i])
      }
    }
    return posts;
  }

  /**
   * Edit one entry from Local Storage.
   * 
   * @param {Object} post Object with post details.
   */
  editUserPost(post) {
    // TODO: use getFromLocalStorageOrReturnDefault("allPostsKey", []);
    var postsArr = JSON.parse(localStorage.getItem("allPostsKey"));
    //look for object with the same postId
    var wantedPost = postsArr.find(x => x.postId === post.postId)
    // update it
    wantedPost.text = post.text;
    wantedPost.addedDateTime = post.addedDateTime;
    wantedPost.isPublic = post.isPublic;

    // TODO: call setIntoLocalStorage("allPostsKey", postsArr);
    var serializedPostsArray = JSON.stringify(postsArr);
    localStorage.setItem("allPostsKey", serializedPostsArray);
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
    var usersArr = [];
    var serializedUsersArray = localStorage.getItem("allUsersKey");
    if (serializedUsersArray != null) {
      usersArr = JSON.parse(serializedUsersArray);
    }
    return usersArr;
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
    var user = usersArray.find(x => x.userName === user.userName);
    if (user != null) {
      if (usersArray.find(x => x.userName === user.userName).password == user.password) {
        isUserValid = true;
      } else
        isUserValid = false;
    }
    else {
      isUserValid = false;
    };
    return isUserValid;
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
    if (sessionStorage.getItem('myUser') != null)
      return true;
    /* TODO: simplify
    return sessionStorage.getItem('myUser') !== null;
    */
  }

  /**
   * Get info about user from sessionstorage.
   * 
   * @return {{ userName: String, position: String }} User info.
   */
  getloggedInUser() {
    var usersArray = this.getUsers();
    var myUserUserName = sessionStorage.getItem('myUser');
    // TODO: if (myUserUserName !== null)
    // Because looks like you query the same value twice from the sessionStorage.
    if (this.checkUserIsLogged()) {
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