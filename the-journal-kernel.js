import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {JkApiMockMixin} from './jk-api-mock-mixin';
import '@polymer/iron-pages/iron-pages';
import './page/jk-login-form';
import './page/jk-landing-page';


/**
 * `the-journal-kernel`
 * thi
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TheJournalKernel extends JkApiMockMixin(PolymerElement) {
  static get template() {
    return html`
      <style>

        :host {
          display: block;
          --app-drawer-width: 300px;
        }

      </style>
      <iron-pages selected="[[pageNumber]]">
        <div>
          <jk-login-form on-user-logged-in="_userLoggedIn"></jk-login-form>
        </div>
        <div>
          <jk-landing-page id="landingPage" on-user-logged-out="_userLoggedOut"></jk-landing-page>
        </div>
      </iron-pages>
    `;
  }

  static get properties() {
    return {
     
      pageNumber: {
        type: Number,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    //mixin fills in localstorage with valid creds
    this.pushValidUsersToLocalstorage();
    //mixin goes to sessionStorage to check is userName is there
    if(this.checkUserIsLogged()){
      this.pageNumber = 1;
    } else {
      this.pageNumber = 0;
    };
  }

  /**
   * Handles user-logged-in event.
   */
  _userLoggedIn(){
    this.pageNumber = 1;
    this.$.landingPage.refreshViews();
    this.$.landingPage.userLoggedIn();
  }

  /**
   * Handles user-logged-out event.
   */
  _userLoggedOut(){
    this.pageNumber = 0;
  }
}

window.customElements.define('the-journal-kernel', TheJournalKernel);