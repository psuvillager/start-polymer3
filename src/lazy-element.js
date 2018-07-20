
// Imports (can use package names; polymer-element.js exports PolymerElement, not Element) 
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

// Custom Class that will generate instances of our custom element
class LazyElement extends PolymerElement {
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement (easy with the html helper function)
    return html`
      <p>You like pie.</p>
    `;
  }
}

// Registration to tell the browser to recognize <lazy-element> elements and to use the LazyElement class definition for them
customElements.define('lazy-element', LazyElement);
