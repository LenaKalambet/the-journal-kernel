import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {JkApiMockMixin} from '../jk-api-mock-mixin';
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

  updatePostsArray(){
    if(this.checkUserIsLogged()){
      var userName=this.getloggedInUser().userName
      this.posts = this.getPostsByName(userName);
    }
  }
}
  

window.customElements.define('jk-my-posts', JkMyPosts);
