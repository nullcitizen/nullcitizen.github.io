import parents from "../utils/parents.js";

export default class AtlasButton extends HTMLElement {
  static get observedAttributes() { return ['align', 'disabled', 'htmlid', 'label', 'size', 'theme', 'htmltype', 'href', 'align', 'size', 'theme'] }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
         .AtlasButton {border: none;padding: 8px 16px;border-radius: 4px;font-size: 14px;line-height: 20px;background-color: #0A6CB9;color: #fff;cursor: pointer;text-decoration: none;}
         .AtlasButton.AtlasButton--small {padding: 4px 12px;}
         .AtlasButton.AtlasButton--xsmall {padding: 4px 8px;font-size: 12px;line-height: 18px;}
         .AtlasButton:hover:hover:not(:disabled) {background-color: #0757AA;}
         .AtlasButton:focus {background-color: #064474;outline: none;box-shadow: 0px 0px 0px 2px #C0E2FC;}
         .AtlasButton:disabled {opacity: 0.5;cursor: not-allowed !important;}
         .AtlasButton.AtlasButton--secondary {background-color: #ECF6FE;color: #0757AA;}
         .AtlasButton.AtlasButton--secondary:hover:not(:disabled) {background-color: #C0E2FC;color: #0757AA;}
         .AtlasButton.AtlasButton--secondary:focus {background-color: #0A6CB9;color: #fff;}
         .AtlasButton.AtlasButton--teritary {background-color: #F0F3F5;color: #282929;}
         .AtlasButton.AtlasButton--teritary:hover:not(:disabled), .AtlasButton--teritary:active, .AtlasButton--teritary:focus {background-color: #D1D5D9;}
         .AtlasButton.AtlasButton--ghost {background-color: transparent;color: #282929;}
         .AtlasButton.AtlasButton--ghost:hover:not(:disabled), .AtlasButton--ghost:active {background-color: #F0F3F5;}
         .AtlasButton.AtlasButton--ghost:focus {background-color: #D1D5D9;}
         .AtlasButton.AtlasButton--destructive {background-color: #CD2D1F;color: #fff;}
         .AtlasButton.AtlasButton--destructive:hover:not(:disabled), .AtlasButton--destructive:active {background-color: #AC261A;}
         .AtlasButton.AtlasButton--destructive:focus {background-color: #6A1810;}
         .AtlasButton__leadingIcon {margin-right: 4px;display: inline-block;}
         .AtlasButton__trailingIcon {margin-left: 4px;display: inline-block;}
      </style>
      <${this.href?'a':'button'} ${this.href?'href="'+this.href+'" ':''}${this.href&&this.target?'target="'+this.target+'" ':''}class="AtlasButton${this.theme?' AtlasButton--'+this.theme:''}${this.size? ' AtlasButton--'+this.size:''}">
        <slot name="leading-icon" class="AtlasButton__leadingIcon"></slot>
        <slot></slot>
        <slot name="trailing-icon" class="AtlasButton__trailingIcon"></slot>
      </${this.href?'a':'button'}>
    `;
  }

  focus() {
    this.button.focus();
  }

  get disabled() {
    return this.getAttribute('disabled')!==null;
  }

  get htmltype() {
    return this.getAttribute('htmltype');
  }

  get theme() {
    return this.getAttribute('theme');
  }
  get size() {
    return this.getAttribute('size');
  }
  
  get href() {
    return this.getAttribute('href');
  }

  get target() {
    return this.getAttribute('target');
  }

	set disabled(value) {
		if(value===null||value===false){
			this.removeAttribute('disabled');
		}else{
			this.setAttribute('disabled', '');
		}
	}

  set htmltype(value) {
    this.setAttribute('htmltype', value);
  }

  set theme(value) {
    this.setAttribute('theme', value);
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  set href(value) {
    this.setAttribute('href', value);
  }

  set target(value) {
    this.setAttribute('target', value);
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector(".AtlasButton");

    if (this.href) {
      this.setAttribute('tabindex', 0);
    }

    this.button.addEventListener('click', (e) => {
      if (this.htmltype === 'submit') {
        const form = parents(this, "form");
        if (form.length) {
          form[0].requestSubmit();
        }
      }
    });
    this.disabled = this.disabled;
  }

	attributeChangedCallback(name, oldValue, newValue) {
		if(name == 'disabled' && this.button){
			if(newValue!==null){
				this.button.toggleAttribute('disabled', true);
			}else{
				this.button.toggleAttribute('disabled', false);
			}
		}
	}
}

if(!customElements.get('atlas-button')){
  customElements.define('atlas-button', AtlasButton);
}
