import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/paper-item/paper-item';
import '@polymer/iron-icons/communication-icons';
import '@polymer/iron-icons/social-icons';

class JkNavigationMenu extends PolymerElement {
  static get template() {
    return html`
      <style>

        :host {
          display: block;
        }
        
        .menu-links{
          color: inherit;
          text-decoration: none;
          font-family: sans-serif;
        }
    
      </style>

      <a class="menu-links" 
         href="[[link]]">
        <paper-icon-item>
          <iron-icon icon="[[icon]]" 
                     slot="item-icon">
          </iron-icon>
          [[navitem]]
        </paper-icon-item >
      </a>
    `;
  }
  static get properties() {
    return {

      link: {
        type: String
      },

      icon: {
        type: String
      },

      navitem: {
        type: String
      },
      
    };
  }
}

window.customElements.define('jk-navigation-menu', JkNavigationMenu);
