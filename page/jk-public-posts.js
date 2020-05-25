import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { JkApiMockMixin } from '../jk-api-mock-mixin';
import '../elements/jk-post';

//TODO: think how this component looks the same as jk-my-posts.js
//You can get data in jk-langidng-page and pass it as post to the same component.
class JkPublicPosts extends JkApiMockMixin(PolymerElement) {
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
                   on-post-updated="updatePublicPostsArray">
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

  connectedCallback() {
    super.connectedCallback();
    this.updatePublicPostsArray();
  }

  updatePublicPostsArray() {
    this.posts = this.getPublicPosts();
  }
}
window.customElements.define('jk-public-posts', JkPublicPosts);
