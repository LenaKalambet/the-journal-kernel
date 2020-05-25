import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { JkApiMockMixin } from '../jk-api-mock-mixin';
import '@polymer/paper-card/paper-card';
import '../elements/jk-post';

class JkUsers extends JkApiMockMixin(PolymerElement) {
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
        
        .card{
          height: 80px;
          width: 100%;
          margin-top: 17px;
          background-color: aliceblue;
        }

        .name{
          height: 30px;
          width: 100%;
          font-family: sans-serif;
          font-size: large;
          margin: 10px;
        }
        
        .card-footer{
          height: 30px
        }

        .position{
          float: left;
          margin-left: 10px;
        }

        .postsPerUser{
          float: right;
          margin-right: 10px;
        }

      </style>
      
      <div class="my-posts-container">
        <template is="dom-repeat" 
                  items="[[users]]">
                  <!-- TODO: you can move it to a separate compoent jk-user -->
          <paper-card class="card" 
                      user="[[item]]">
            <div class="card-container">
            <div class="name">[[item.userName]]</div>
            <div class="card-footer">
              <div class="position">[[item.position]]</div>
              <div class="postsPerUser">([[item.postsAmount]]) Posts</div>
            </div>
          </paper-card>
        </template>
      </div>                
    `;
  }

  static get properties() {
    return {

      //array of objects (userName, position, postsAmount)
      users: {
        type: Array,
      }
    };
  }

  //once connectionCallback fires app fill in the users Array of Objects and call getPostsAmmount
  connectedCallback() {
    super.connectedCallback();
    this.users = this.getUsers(); //user is now Array of Objects (userName, position)
    this.getPostsAmount(); //This call adds postAmount to users
  }

  //This functiona add to users Array of Objects attribute postAmount making users Array of Objects (userName, position, postsAmount)
  //TODO: this functionality can be in the handler of our FLUX alike architecture.
  getPostsAmount() {
    // TODO: you can also write this way
    /*
      for (let user of this.getUsers()) {
        user.postsAmount = this.getPostsByName(user).length;        
      }
    */
    this.users = this.getUsers();
    for (var i = 0; i < this.users.length; i++) {
      this.users[i].postsAmount = this.getPostsByName(this.users[i].userName).length;
    }
  }
}

window.customElements.define('jk-users', JkUsers);
