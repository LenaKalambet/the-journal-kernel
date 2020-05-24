import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {JkApiMockMixin} from '../jk-api-mock-mixin';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';

class JkUserIcon extends JkApiMockMixin(PolymerElement) {
  static get template() {
    return html`
      <style>

        :host {
          display: block;
        }

        .user-image{
          margin-left: -11px;
          margin-top: 10px;
          background-image: url(./images/user-icon.png);
          height: 84px;
          width: 84px;
          float: left;
        }

        .user-info{
          height: 84px;
          float: left;
          width: 180px;
        }

        .name{
          padding: 5px;
          padding-top: 31px;
          font-family: sans-serif;
          font-size: large;
          font-weight: bold;
        }

        .position{
          padding: 5px;
          padding-top: 0px;
          font-size: small;
          font-family: sans-serif;
        }
    
      </style>
      <div class="user-image"></div>
      <div class="user-info">
        <div class="name">[[name]]</div>
        <div class="position">[[position]]</div>
      </div>
    `;
  }
  static get properties() {
    return {

      name: {
        type: String
      },

      position: {
        type: String
      },
    };
  }
}

window.customElements.define('jk-user-icon', JkUserIcon);
