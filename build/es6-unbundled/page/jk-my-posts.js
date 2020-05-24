define(["../node_modules/@polymer/polymer/polymer-element.js","../node_modules/@polymer/app-layout/app-layout.js"],function(_polymerElement){"use strict";class JkMyPosts extends _polymerElement.PolymerElement{static get template(){return _polymerElement.html`
      <style>
        :host {
          display: block;
        }
      </style>
      
      <!--put your html code here!-->
      <app-drawer-layout>
      <app-drawer slot="drawer">
        <app-toolbar>Getting Started</app-toolbar>
      </app-drawer>
      <app-header-layout>
        <app-header slot="header" reveals effects="waterfall">
          <app-toolbar>
            <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
            <div main-title>Title</div>
          </app-toolbar>
        </app-header>
        <sample-content size="100"></sample-content>
      </app-header-layout>
    </app-drawer-layout>
    `}static get properties(){return{prop1:{type:String}}}}window.customElements.define("jk-my-posts",JkMyPosts)});