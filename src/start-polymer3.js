
/* 
Imports 
  - Import statements in Polymer 3.0 can now use package names polymer-element.js now 
    exports PolymerElement instead of Element, so no need to change the symbol. 
*/
  import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
  import '@polymer/polymer/lib/elements/dom-if.js';
  import '@polymer/paper-checkbox/paper-checkbox.js';
  import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';



/*
Define a custom Class that will generate instances of our custom element
*/
  class StartPolymer3 extends PolymerElement {

  // Getter function defines properties of the custom element (and can name any observer functions)
    static get properties () {
      return {
        // Properties of this custom element include message (str), pie (bool), and loadComplete (bool)
        message: {
          type: String,
          value: ''
        },
        pie: {
          type: Boolean,
          value: false,
          observer: 'togglePie' // Properties can have observers
        },
        loadComplete: {
          type: Boolean,
          value: false
        }
      };
    }

  // Constructor function
    constructor() {
      super(); // (If you override the constructor, always call the superconstructor first)
      // Resolve scroll-performance warning (developers.google.com/web/updates/2016/06/passive-event-listeners)  
      setPassiveTouchGestures(true);
      // Initialize properties
      this.message = "The custom element's constructor set the message property to this awesome text string";
    }



  // Other functions

    // Set focus when ready
    ready(){
      super.ready(); // (If you override ready, always call super.ready() first)
      // Output the custom element's HTML tag to the console (visible in browser's dev tools)
      console.log(this.tagName);
      // Once the element is ready, set the browser's focus to the checkbox (#omgpie)
      this.$.omgpie.focus();
        // The .$ collection includes any (statically created) nodes with an id in the element's template 
    }
     
    togglePie(){ //This function is the observer for the pie property
    /*
      If the user has checked the box (ie pie == true) but LazyElement (ie "You like pie") has not been loaded, 
      then try loading it (and asynchronously log the results), and set loadComplete = true
      (Note that <lazy-element> appears inside the template's <template> element, below)
    */
      if(this.pie && !this.loadComplete) {
        // See https://developers.google.com/web/updates/2017/11/dynamic-import
        import('./lazy-element.js').then((LazyElement) => { // Dynamic import syntax returns a promise
          console.log("LazyElement loaded");
        }).catch((reason) => {
          console.log("LazyElement failed to load", reason);
        });
        this.loadComplete = true;
      }
    }

    static get template () {
      /* 
      - Template getter must return an instance of HTMLTemplateElement (easy with the html helper function)
      - Comments about the html elements in the returned string:
      // <style> Sets local styles
      // <h1> Is just literal html
      // <p> Injects the message property (which was defined in the getter and set in the constructor)
      // <paper-checkbox#omgpie> Has the 'toggles' attribute, and 2-way binds to the pie (boolean) property
      // <template> Uses "dom-if" to conditionally display "You like pie", based on the pie (boolean) property 
      */
      return html`
        <style>
          paper-checkbox {
            --paper-checkbox-checked-ink-color: #FFFFFF;
            --paper-checkbox-unchecked-ink-color: #FFFFFF;
          }
        </style>

        <h1>Start Polymer 3.0</h1>

        <p>[[message]]</p>

        <paper-checkbox id="omgpie"
          toggles
          noink
          checked={{pie}}>I like pie.</paper-checkbox>

        <template is="dom-if" if=[[pie]]>
          <lazy-element><p>lazy loading...</p></lazy-element>
        </template>
      `;
    }
  }



/*
Register the class
*/
  // Tell the browser to recognize <start-polymer3> elements and to use the StartPolymer3 class definition for them
  customElements.define('start-polymer3', StartPolymer3);
