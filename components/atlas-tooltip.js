import {computePosition} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.2.1/+esm';

export default class AtlasTooltip extends HTMLElement {
  static get observedAttributes() { return [''] }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = ``;
  }
}


if(!customElements.get('atlas-button')){
  customElements.define('atlas-button', AtlasButton);
}
