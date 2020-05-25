import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { JkApiMockMixin } from '../jk-api-mock-mixin';
import '../elements/jk-post';

class JkMyPosts extends JkApiMockMixin(PolymerElement) {
  static get template() {
    return html`
      <style>

        :host {
          display: block;
        }

        jk-post{
          margin: 5px;
          margin-top: 17px;
          float: left;
        }

      </style>
      
      <!--put your html code here!-->
      <div class="my-posts-container">
        <template is="dom-repeat" 
                  items="[[posts]]">
          <jk-post post="[[item]]" 
                   on-post-updated="updatePostsArray">
          </jk-post>
        </template>
      </div>                

    `;
  }
  static get properties() {
    return {

      posts: {
        type: Array,
        notify: true,
      },
    };
  }

  //mixin
  connectedCallback() {
    super.connectedCallback();
    this.updatePostsArray();
  }

  //TODO: this method should be private with _ at the beginning if it's not called outside of the component.
  updatePostsArray() {
    //TODO: you can also make fast exsit in if statement.
    /* 
    if (!this.checkUserIsLogged()) return;

    ...other code

    */

    if (this.checkUserIsLogged()) {
      var userName = this.getloggedInUser().userName
      this.posts = this.getPostsByName(userName);
    }
  }
}

//TODO: we also defined a property is in our component.
// Something like
// static get is() {
//  return 'landing-page'
// }
// customElements.define(LandingPage.is, LandingPage);
window.customElements.define('jk-my-posts', JkMyPosts);
