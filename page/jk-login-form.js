import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { JkApiMockMixin } from '../jk-api-mock-mixin';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog';
import '@polymer/paper-toast/paper-toast';

class JkLoginForm extends JkApiMockMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        /* TODO: delete this empty style */
        :host {
        }
    
        .login-title{
          margin: auto;
          text-align: center;
          padding-top: 30px;
          padding-bottom: 30px;
          background-color: midnightblue;
          color: aliceblue;
        }

        .button{
            position: relative;
            height: 40px;
        }

        paper-button{
            float: right;
        }

      </style>
      <paper-dialog id="loginDialog">
        <h1 class="login-title">The Journal Kernel</h1>
        <div>
          <paper-input always-float-label
                       label="login name"           
                       value="{{userName}}">
          </paper-input>
          <paper-input always-float-label
                       label="password"  
                       type="password" 
                       value="{{password}}">
          </paper-input>
        </div>
        <div class="button">
          <paper-button autofocus
                        raised 
                        on-click="_submitLoginTapped">
            SUBMIT
          </paper-button>
        </div>
      </paper-dialog>
      <paper-toast id="toastMessage" 
                   text="Invalid user name of password!">
      </paper-toast>

    `;
  }
  //TODO: add comments.
  static get properties() {
    return {
      userName: {
        type: String,
        notify: true,
      },

      password: {
        type: String,
        notify: true,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.loginDialog.open();
  }

  /**
   * Verifies User credentials or throught toast message
   */
  _submitLoginTapped() {
    var user = {
      userName: this.userName,
      password: this.password
    }
    if (this.userIsValid(user)) {
      //save user name to localstorage and send event
      this.userLogIn(user);
      this.dispatchEvent(new CustomEvent('user-logged-in'));
    }
    else {
      //toast
      this.$.toastMessage.toggle();
    }
  }
}

window.customElements.define('jk-login-form', JkLoginForm);
