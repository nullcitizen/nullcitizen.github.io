
export default class AtlasMenu extends HTMLElement {
static get observedAttributes() { return ['open'] };

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
      :host {
      }
      .AtlasMenu {
        display: none;
        margin: 0;
        gap: 4px;
        background-color: #fff;
        border: 1px solid #D1D5D9;
        box-shadow: 0px 2px 12px rgba(40, 41, 41, 0.2);
        border-radius: 4px;
        padding: 8px 0;
        width: 172px;
      }
      .AtlasMenu.is-open {
        display: flex;
        flex-direction: column;
      }
      </style>
      <menu class="AtlasMenu${this.open?' is-open':''}">
        <slot></slot>
      </menu>
    `;
  }
  connectedCallback() {
    this.menu = this.shadowRoot.querySelector('AtlasMenu');
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this.open = false;
      }
    })
  }
  disconnectedCallback() {
    // TODO: clean up event
  }
	attributeChangedCallback(name, oldValue, newValue) {}

  get open() {
    return this.getAttribute('open')!==null;
  }

  set open(value) {
		if(value===null||value===false){
			this.removeAttribute('open');
		}else{
			this.setAttribute('open', '');
		}
  }
}
if(!customElements.get('atlas-menu')){
  customElements.define('atlas-menu', AtlasMenu);
}


export class AtlasMenuItem extends HTMLElement {
static get observedAttributes() { return [''] };

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
      :host li {
        list-style: none;
        margin: 0 8px;
        padding: 8px;
      }
      </style>
      <li class="AtlasMenuItem">
        <slot></slot>
      </li>
    `;
  }
  connectedCallback() {
    this.menuitem = this.shadowRoot.querySelector('AtlasMenu');
  }
  disconnectedCallback() {}
	attributeChangedCallback(name, oldValue, newValue) {}
}
if(!customElements.get('atlas-menuitem')){
  customElements.define('atlas-menuitem', AtlasMenuItem);
}

export class AtlasMenuSeperator extends HTMLElement {
static get observedAttributes() { return [''] };

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
      :host {
        height: 1px;
        background: #D1D5D9;
        align-self: stretch;
      }
      </style>
      <div></div>
    `;
  }
  connectedCallback() {
    this.menuitem = this.shadowRoot.querySelector('AtlasMenu');
  }
  disconnectedCallback() {}
	attributeChangedCallback(name, oldValue, newValue) {}
}
if(!customElements.get('atlas-menusep')){
  customElements.define('atlas-menusep', AtlasMenuSeperator);
}
