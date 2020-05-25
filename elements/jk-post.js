import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { JkApiMockMixin } from '../jk-api-mock-mixin';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';
import '../dialogs/jk-edit-post-dialog';
import '../dialogs/jk-delete-post-dialog';

class JkPost extends JkApiMockMixin(PolymerElement) {
  static get template() {
    return html`
      <style>

        :host {
          display: block;
        }

        .box-container{
          border-radius: 5px;
          background-color: red;
          margin: 10px;
        }

        .card{
          width: 200px;
          height: 224px;
        }

        .card-header{
          height: 50px;
        }

        .name{
          float: left;
          font-size: x-large;
        }

        .private-icn{
          float: right;
          color: grey;
        }

        .card-description{
          width: 168px;
          height: 80px;
          overflow: auto;
        }

        .card-footer{
          height: 40px;
          margin-top: 10px;
          border-top: ridge;
          padding-top: 10px;
        }

        .date-time{
          float: left;
          width: 88px;
          height: 40px;
        }

        .edit-btn{
          float: right;
        }

        .remove-btn{
          float: right;
        }
    
      </style>

      <paper-card class="card">
        <div class="card-content">
          <div class="card-header">
            <div class="name">[[post.userName]]</div>
            <div class="private-icn">
              <paper-icon-button hidden="[[post.isPublic]]"
                                 icon="visibility-off" 
                                 title="private">
              </paper-icon-button>
            </div>
          </div>
          <div class="card-description">[[post.text]]</div>
          <div class="card-footer">
            <div class="date-time">[[post.addedDateTime]]</div>
            <div class="remove-btn">
              <jk-delete-post-dialog id="deletePostDialog" 
                                     post="[[post]]" 
                                     on-post-deleted="_postsUpdated">
              </jk-delete-post-dialog>
              <paper-icon-button icon="delete" 
                                 title="remove" 
                                 on-tap="_deletePostTapped">
              </paper-icon-button>
            </div>
            <div class="edit-btn">
              <jk-edit-post-dialog id="editPostDialog" 
                                   post="[[post]]" 
                                   on-post-updated="_postsUpdated">
              </jk-edit-post-dialog>
              <paper-icon-button icon="create" 
                                 title="edit" 
                                 on-tap="_editPostTapped">
              </paper-icon-button>
            </div> 
          </div>
        </div>
      </paper-card>
    `;
  }
  static get properties() {
    //TODO: comments :)
    return {

      post: {
        type: Object,
      }
    };
  }

  _editPostTapped() {
    this.$.editPostDialog.openEditPostDialog();
  }

  _deletePostTapped() {
    this.$.deletePostDialog.openDeletePostDialog();
  }

  _postsUpdated() {
    this.dispatchEvent(new CustomEvent('post-updated'));
  }
}

window.customElements.define('jk-post', JkPost);
