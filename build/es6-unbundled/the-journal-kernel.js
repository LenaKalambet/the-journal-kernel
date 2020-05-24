define(["./node_modules/@polymer/polymer/polymer-element.js","./page/jk-login-form.js","./page/jk-my-posts.js"],function(_polymerElement){"use strict";class TheJournalKernel extends _polymerElement.PolymerElement{static get template(){return _polymerElement.html`
      <style>
        :host {
          display: block;
        }
    
      </style>
      <!--<jk-login-form prop1="The Journal Kernel"></jk-login-form>-->
      <jk-my-posts></jk-my-posts>
    `}static get properties(){return{prop1:{type:String}}}}window.customElements.define("the-journal-kernel",TheJournalKernel)});