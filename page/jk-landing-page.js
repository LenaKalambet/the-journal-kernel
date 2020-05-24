import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {JkApiMockMixin} from '../jk-api-mock-mixin';
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

/**
 * `the-journal-kernel`
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

  static get properties() {
    return {
     
      name: {
        type: String
      },

      position: {
        type: String,
      },

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
  _addNewPostTapped(){
    this.$.addNewPostDialog.openAddPostDialog();
  }
  /**
   * Refreshes data for My Posts, Public Posts, Users views.
   */
  refreshViews(){
    this.$.myPosts.updatePostsArray();
    this.$.publicPosts.updatePublicPostsArray();
    this.$.users.getPostsAmount();
  }
  /**
   * Get data from Session Storage and save to properties.
   */
  userLoggedIn() {
    //mixin to get data from sessionstorage
    if (this.checkUserIsLogged()){
    var user = this.getloggedInUser();
    this.name = user.userName;
    this.position = user.position;
    this.isUserLoggedIn = this.checkUserIsLogged();
    }
  }

  /**
   * Navigates to My Posts view.
   */
  _openMyPosts(){
    this.navigationItemSelected=0;
  }

  /**
   * Navigates to Public Posts view.
   */
  _openPublicPosts(){
    this.navigationItemSelected=1;
  }

  /**
   * Navigates to Users view.
   */
  _openUsers(){
    this.navigationItemSelected=2;
  }

  /**
   * Compute page sub-title depending on page number.
   * 
   * @param {Number} navigationItemSelected Number of Navigation view.
   * @returns {String} Page Name.
   */
  _defineNavigationItemName(navigationItemSelected){ 
    var navigationItemName;
    switch(navigationItemSelected) {
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
