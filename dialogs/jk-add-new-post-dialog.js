import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {JkApiMockMixin} from '../jk-api-mock-mixin';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-checkbox/paper-checkbox';

class JkAddNewPostDialog extends JkApiMockMixin(PolymerElement) {
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
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
                      0 1px 5px 0 rgba(0, 0, 0, 0.12), 
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
    
      </style>

      <paper-dialog id="actions">
        <h2 class="title">Add Post</h2>
        <paper-input char-counter
                     id="post-text" 
                     label="Enter text here" 
                     value="{{postText}}"  
                     maxlength="150">
        </paper-input>
        <div class="check-box">
          <paper-checkbox checked="{{isPublic}}">
            Public
          </paper-checkbox>
        </div>
        <div class="buttons">
          <paper-button dialog-dismiss>
            Cancel
          </paper-button>
          <paper-button dialog-confirm 
                        autofocus 
                        on-tap="_submitNewPostTapped">
            Submit
          </paper-button>
        </div>
     </paper-dialog>
     
    `;
  }
  static get properties() {
    return {

      postText: {
        type: String,
        notify: true,
        value: 'My new post text goes here',
      },

      isPublic: {
        type: Boolean,
        notify: true,
        value: true,
      },

      name: {
        type: String,
      }

    };
  }

  openAddPostDialog(){
    this.$.actions.open();
  }


  _submitNewPostTapped(){
    var post = {
        userName: this.name,
        text: this.postText,
        addedDateTime: new Date().toLocaleString(),
        isPublic: this.isPublic
    };
    this.addNewPost(post);
    this.dispatchEvent(new CustomEvent('new-post-added'));
  }

  _cancelButtonTapped(){

  }
}

window.customElements.define('jk-add-new-post-dialog', JkAddNewPostDialog);
