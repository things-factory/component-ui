import { LitElement, html, css } from 'lit-element'

class CustomInput extends LitElement {
  static get styles() {
    return css`
      input {
        margin: auto 0;
        border-style: var(--form-input-border-style, solid);
        border-width: var(--form-input-border-width, 1px);
        border-color: var(--form-input-border-color, #c4c5c6);
        padding: var(--form-input-padding, 5px);
        min-width: var(--form-input-width, 300px);
        max-width: var(--form-input-width, 300px);
        outline: var(--form-input-outline, none);
        background-color: var(--form-input-background-color, #fff);
      }
    `
  }
  static get properties() {
    return {
      id: String,
      name: String,
      type: String,
      props: Object,
      attrs: Array,
      valueField: String,
      displayField: String,
      value: String
    }
  }

  render() {
    return html`
      <input id="${this.id}" name="${this.name}" type="${this.type}" value="${this._displayValue || ''}" />
    `
  }

  get input() {
    return this.shadowRoot.querySelector('input')
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = this._isObject(value)
      ? (this.valueField && value[this.valueField]) || value[Object.keys(value)[0]]
      : value
    this._displayValue = this._isObject(value)
      ? (this.displayField && value[this.displayField]) || value[Object.keys(value)[0]]
      : value
  }

  updated(changeProps) {
    if (changeProps.has('props')) {
      if (this._isObject(this.props)) {
        for (let prop in this.props) {
          this.input.setAttribute(prop, this.props[prop])
        }
      }
    }

    if (changeProps.has('attrs')) {
      if (this.attrs && Array.isArray(this.attrs)) {
        this.attrs.forEach(attr => this.input.setAttribute(attr, ''))
      }
    }
  }

  _isObject(value) {
    return value instanceof Object && !Array.isArray(value)
  }

  focus() {
    this.input.focus()
  }

  select() {
    this.input.select()
  }

  blur() {
    this.input.blur()
  }

  checkValidity() {
    return this.input.checkValidity()
  }
}

window.customElements.define('custom-input', CustomInput)
