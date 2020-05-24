import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-checkbox/paper-checkbox';
import {JkApiMockMixin} from '../jk-api-mock-mixin';
import '@polymer/paper-toast/paper-toast';

class JkEditPostDialog extends JkApiMockMixin(PolymerElement) {
  static get template() {
    return html`
      <style>

        :host {
          display: block;
        }

        paper-dialog{
          width: 330px;
        }

        paper-checkbox{
          float:right;
        }

        paper-button{
          float:right;
        }
        
        .check-box{
          height: 28px;
        }

        .title{
          background-color: #003366;
          padding: 21px;
          margin: 24px;
          color: white;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
    
      </style>

      <paper-dialog id="editDialog">
        <h2 class="title">Edit Post</h2>
        <paper-input char-counter
                     id="post-text" 
                     label="Enter text here" 
                     value="{{post.text}}"
                     maxlength="150">
        </paper-input>
        <div class="check-box">
          <paper-checkbox checked="{{post.isPublic}}">Public</paper-checkbox>
        </div>
        <div class="buttons">
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button dialog-confirm
                        autofocus 
                        on-tap="_submitEditPostTapped">
            Submit
          </paper-button>
        </div>
      </paper-dialog>
      <paper-toast id="toastMessage" text="You are not allowed to edit this post!"></paper-toast>
    `;
  }

  static get properties() {
    return {

      post: {
        type: Object,
        notify: true,
      },

      newPost: {
        type: Object,
        notify: true,
      },

      name: {
        type: String
      }
    };
  }

  openEditPostDialog(){
    var user = this.getloggedInUser();
    this.name = user.userName;
    if (this.post.userName == this.name) {
      this.$.editDialog.open();
    } else {
      this.$.toastMessage.toggle();
    }
  }

  _submitEditPostTapped(){
    var newPost = {
      postId: this.post.postId,
      userName: this.name,
      text: this.post.text,
      addedDateTime: new Date().toLocaleString(),
      isPublic: this.post.isPublic
    };
    //mixin to localstorage
    this.editUserPost(newPost);
    //event to parent
    this.dispatchEvent(new CustomEvent('post-updated'));
  }

  _cancelButtonTapped(){

  }
}

window.customElements.define('jk-edit-post-dialog', JkEditPostDialog);
