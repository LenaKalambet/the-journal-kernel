define(["../node_modules/@polymer/polymer/polymer-element.js","../node_modules/@polymer/paper-input/paper-input.js","../node_modules/@polymer/paper-button/paper-button.js"],function(_polymerElement){"use strict";class JkLoginForm extends _polymerElement.PolymerElement{static get template(){return _polymerElement.html`
      <style>
        :host {
          display: block;
        }
    
        .login-title{
          display: yes;
          margin: auto;
          text-align: center;
          padding-top: 30px;
          padding-bottom: 30px;
          background-color: midnightblue;
          color: aliceblue;
        }

        .button{
            position: relative;
            height: 40px;
        }

        paper-button{
            position: absolute;
            right: 0;
        }
      </style>
      <h1 class="login-title">[[prop1]]</h1>
      <div>
        <paper-input label="login name" always-float-label></paper-input>
        <paper-input label="password" always-float-label type="password"></paper-input>
      </div>
      <div class="button">
        <paper-button raised>SUBMIT</paper-button>
      </div>
    `}static get properties(){return{prop1:{type:String,value:""}}}}window.customElements.define("jk-login-form",JkLoginForm)});