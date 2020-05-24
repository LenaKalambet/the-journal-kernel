import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {JkApiMockMixin} from '../jk-api-mock-mixin';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-dialog';

class JkDeletePostDialog extends JkApiMockMixin(PolymerElement) {
  static get template() {
    return html`
      <style>

        :host {
          display: block;
        }

        paper-dialog{
          width: 400px;
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

        .text{
          text-align: center;
        }
    
      </style>

      <paper-dialog id="deletePostDialog">
        <h2 class="title">Confirmation</h2>
        <div class="text">
          <p>Please confirm that you want to delete this post.</p>
        </div>
        <div class="buttons">
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button dialog-confirm 
                        autofocus 
                        on-tap="_submitDeletePostTapped">
            Confirm
          </paper-button>
        </div>
      </paper-dialog>

    `;
  }

  static get properties() {
    return {

      post: {
          type: Object,
          notify: true,
      },
    };
  }

  openDeletePostDialog(){
    this.$.deletePostDialog.open();
    console.log(this.post);
  }

  _submitDeletePostTapped(post){
    //mixin to localstorage
    this.deleteUserPost(this.post);
    //event to parent
    this.dispatchEvent(new CustomEvent('post-deleted'));
  }

  _cancelButtonTapped(){

  }
}

window.customElements.define('jk-delete-post-dialog', JkDeletePostDialog);
