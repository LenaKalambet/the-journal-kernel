import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { JkApiMockMixin } from '../jk-api-mock-mixin';
import '@polymer/app-layout/app-layout';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-fab/paper-fab';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/iron-pages/iron-pages';
import './jk-login-form';
import './jk-my-posts';
import './jk-public-posts';
import './jk-users';
import '../dialogs/jk-add-new-post-dialog';
import '../elements/jk-user-icon';
import '../elements/jk-navigation-menu';

//TODO explude the /build folder from the repo. Add it to the gitignore.

/**
 * `the-journal-kernel`
 * TODO: fix this comment. 
 * I think it's a good idea to reread the polymer style guide and update the project according to it.
 * thi
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class JkLandingPage extends JkApiMockMixin(PolymerElement) {
  static get template() {
    return html`
      <style>

        :host {
          display: block;
          --app-drawer-width: 300px;
        }
        
        /* TODO: add a space between '-btn' and '{'. The same goes for every style tag in the project.
         */
        .new-post-btn{
          position: fixed;
          bottom: 50px;
          right: 50px;
          font-size: x-large;
          font-weight: bolder;
        }
        
        .title-container{
          background-color: midnightblue;
        }
        
        .title{
          background-color: #003366;
          font-family: sans-serif;
          font-size: large;
          color: white;
          padding-left: 25px;
        }

        /* TODO: you can make subtitle uppercase with a css rule. https://www.w3schools.com/cssref/tryit.asp?filename=trycss_text-transform */
        .sub-title{
          background-color: #003366;
          height: 30px;
          font-family: sans-serif;
          font-size: medium;
          font-weight: bold;
          color: white;
          padding-left: 25px;

        }

        app-drawer{
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
                      0 1px 5px 0 rgba(0, 0, 0, 0.12), 
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
          z-index:0;
        }

        .user-icon{
          height:84px;
        }

        jk-post{
          margin: 5px;
          margin-top: 17px;
          float: left;
        }
        
        .navigation{
          margin-bottom: -20px;
        }

        app-header{
          margin: -8px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
                      0 1px 5px 0 rgba(0, 0, 0, 0.12), 
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

      </style>
        <div>
          <!-- TODO: delete the commented code from the project. git is good for saving the history. There is no reason to keep the commented code in the project -->
          <!--<template is="dom-if" 
                    if="[[isUserLoggedIn]]">-->
            <app-drawer-layout>
              <app-drawer slot="drawer" >
                <app-toolbar class="user-icon">
                  <jk-user-icon name="[[name]]" 
                                position="[[position]]">
                  </jk-user-icon>
                </app-toolbar>
                <app-toolbar class="navigation">
                  <jk-navigation-menu navitem="My Posts" 
                                      link="#my_posts" 
                                      icon="communication:comment" 
                                      on-tap="_openMyPosts">
                  </jk-navigation-menu>
                </app-toolbar>
                <app-toolbar class="navigation">
                  <jk-navigation-menu navitem="Public Posts" 
                                      link="#public_posts" 
                                      icon="social:whatshot" 
                                      on-tap="_openPublicPosts">
                  </jk-navigation-menu>
                </app-toolbar>
                <app-toolbar class="navigation">
                  <jk-navigation-menu navitem="Users" 
                                      link="#Users" 
                                      icon="social:people" 
                                      on-tap="_openUsers">
                  </jk-navigation-menu>
                </app-toolbar>
              </app-drawer>
              <app-header-layout>
                <app-header fixed>
                  <app-toolbar class="title">
                    <div>The Journal Kernel</div>
                  </app-toolbar>
                  <app-toolbar class="sub-title">
                    <div>[[navigationItemName]]</div>
                  </app-toolbar>
                </app-header>        
                <iron-pages selected="[[navigationItemSelected]]">
                  <div>
                    <jk-my-posts id="myPosts"></jk-my-posts>
                  </div>
                  <div>
                    <jk-public-posts id="publicPosts"><jk-public-posts>
                  </div>
                  <div>
                    <jk-users id="users"></jk-users>
                  </div>
                </iron-pages>      
              </app-header-layout>
            </app-drawer-layout>
            <jk-add-new-post-dialog id="addNewPostDialog"
                                    name="[[name]]"
                                    on-new-post-added="refreshViews">
            </jk-add-new-post-dialog>
            <paper-fab class="new-post-btn" 
                       label="+" 
                       title="New Post" 
                       on-tap="_addNewPostTapped">
            </paper-fab>
          <!--</template>-->
        </div>
      </iron-pages>
    `;
  }

  // TODO: add comments to the props. We have a sample of how to comment props the styleguide for Polymer.
  static get properties() {
    return {

      //TODO: rename to `usersName`
      name: {
        type: String
      },

      // TODO: at first I thought this is a position like left or right :)
      // The naming is important or maybe a comment could clearify the meaning.
      // In any case I think you could rename it to usersRole or someting like at. 
      position: {
        type: String,
      },

      // TODO: `selectedNaviationItem` would be a better name IHMO.
      // But, according to the https://www.webcomponents.org/element/@polymer/iron-pages/demo/demo/index.html
      // you can use not only a number, but a string. For example, `page-name="my posts"`.
      // So you can make it `selectedPageName` with a string value one of ['my posts', 'public posts', 'users].
      // Still not sure about the space in `my posts`. Maybe `my-posts` would be better.
      navigationItemSelected: {
        type: Number,
        value: 0,
        notify: true,
      },

      navigationItemName: {
        type: String,
        computed: '_defineNavigationItemName(navigationItemSelected)',
      },

      isUserLoggedIn: {
        type: Boolean,
      }
    };
  }

  // TODO: it's ok for this task to call an API from component.
  // But we use a FLUX liked pattern to work with data.
  /**
   * Call function to add users to Loacl Stroage.
   * Checks if user is Valid and sends event about user log in.
   * Save user info to properties.
   */
  connectedCallback() {
    super.connectedCallback();
    //mixin fills in localstorage with valid creds
    this.pushValidUsersToLocalstorage();
    if (!this.checkUserIsLogged()) {
      this.dispatchEvent(new CustomEvent('user-logged-out'));
    }
    this.userLoggedIn();
    this.refreshViews();
  }
  /**
   * Open Add Post dialog.
   */
  _addNewPostTapped() {
    this.$.addNewPostDialog.openAddPostDialog();
  }

  /**
   * Refreshes data for My Posts, Public Posts, Users views.
   */
  //TODO: if this method is not called outside of the component - make it private by using _.
  //Techically it's not private, but by the naming it means it's private :)
  refreshViews() {
    this.$.myPosts.updatePostsArray();
    this.$.publicPosts.updatePublicPostsArray();
    this.$.users.getPostsAmount();
  }
  /**
   * Get data from Session Storage and save to properties.
   */
  userLoggedIn() {
    //mixin to get data from sessionstorage

    //TODO: it's more better to make a fast exit in the method.
    //For example:
    /*
    if (!this.checkUserIsLogged()) {
      return;
    }
    var user = this.getloggedInUser();
    this.name = user.userName;
    this.position = user.position;
    this.isUserLoggedIn = this.checkUserIsLogged();

    */
    if (this.checkUserIsLogged()) {
      var user = this.getloggedInUser();
      this.name = user.userName;
      this.position = user.position;
      this.isUserLoggedIn = this.checkUserIsLogged();
    }
  }

  /**
   * Navigates to My Posts view.
   */
  _openMyPosts() {
    this.navigationItemSelected = 0;
  }

  /**
   * Navigates to Public Posts view.
   */
  _openPublicPosts() {
    this.navigationItemSelected = 1;
  }

  /**
   * Navigates to Users view.
   */
  _openUsers() {
    this.navigationItemSelected = 2;
  }

  //TODO: you can rename it to `_computeNavigationItemName`.
  /**
   * Compute page sub-title depending on page number.
   * 
   * @param {Number} navigationItemSelected Number of Navigation view.
   * @returns {String} Page Name.
   */
  _defineNavigationItemName(navigationItemSelected) {
    var navigationItemName;
    switch (navigationItemSelected) {
      case 0:
        navigationItemName = 'MY POSTS';
        break;
      case 1:
        navigationItemName = 'PUBLIC POSTS';
        break;
      case 2:
        navigationItemName = 'USERS';
        break;
    }
    return navigationItemName;
  }
}

window.customElements.define('jk-landing-page', JkLandingPage);
