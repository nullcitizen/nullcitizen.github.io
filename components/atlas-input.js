export default class AtlasInput extends HTMLElement {
  static get observedAttributes() { return ['label', 'disabled', 'required','readonly','placeholder', 'defaultvalue', 'value']};

  constructor() {
    super();
    
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
      .atl-input {display: inline-block;position: relative;}
      .atl-input__label {display: block;color: #6A6E72;font-size: 14px;line-height: 20px;margin-bottom: 4px;}
      .atl-input__input {display: block;border: 1px solid #D1D5D9;background-color: #fff;padding: 8px;border-radius: 4px;color: #282929;font-size: 14px;line-height: 20px;}
      .atl-input__input:disabled {cursor: not-allowed !important;background-color: #E8ECEE;opacity: .5;}
      .atl-input__clear {position: absolute;bottom: 8px;right: 8px;display: block;opacity: 0;transition: opacity ease 300ms;pointer-events: none;color: #D1D5D9;}
      .atl-input__input:not(:placeholder-shown) + .atl-input__clear {z-index: 1;opacity: 1;transition: opacity ease 300ms;pointer-events: auto;cursor: pointer;}
      .atl-input__input:disabled + .atl-input__clear {opacity: 0;pointer-events:none;}
      </style>
      <label class="atl-input">
        <span class="atl-input__label">${this.label}</span>
        <slot name="icon"></slot>
        <input class="atl-input__input" type="text" ${this.disabled?'disabled ':''}${'placeholder="'+this.placeholder+'" '}${this.defaultvalue?'value="'+this.defaultvalue+'" ':''}/>
        <slot name="clear-icon" class="atl-input__clear"></slot>
      </label>
    `;
    this.input = this.shadowRoot.querySelector(".atl-input__input");
    this.clearButton = this.shadowRoot.querySelector('.atl-input__clear');
  }

  focus() {
    this.input.focus();
  }

  connectedCallback() {
    const self = this;
    this.input.addEventListener('change', (e) => {
      self.value = self.input.value;
      let changeEv = new Event('change', { bubbles: true });
      self.dispatchEvent(changeEv);
    });
    this.input.addEventListener('input', (e) => {
      self.value = self.input.value;
      let inputEv = new Event('input', { bubbles: true });
      self.dispatchEvent(inputEv);
    });

    if (this.clearButton) {
      this.clearButton.addEventListener('click', function() {
        self.value = '';
      });
    }
  }

  // attributeChangedCallback (name, oldValue, newValue) {
  //   if(name === "value") {
  //     console.log("value changed");
  //   }
  // }


  get label() {
    return this.getAttribute('label');
  }

  get disabled() {
    return this.getAttribute('disabled')!==null;
  }

  get placeholder() {
    return this.getAttribute('placeholder')||'';
  }
  get value() {
    return this.input.value;
  }
  get defaultvalue() {
    return this.getAttribute('defaultvalue')||'';
  }

  set label(value) {
    return this.setAttribute('label', value);
  }

	set disabled(value) {
		if(value===null||value===false){
			this.removeAttribute('disabled');
		}else{
			this.setAttribute('disabled', '');
		}
	}

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }
  set value(value) {
    this.input.value = value;
  }



}

if(!customElements.get('atlas-input')){
  customElements.define('atlas-input', AtlasInput);
}
