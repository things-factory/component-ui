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
      field: Object
    }
  }

  render() {
    const inputField = document.createElement('input')
    inputField.type = this.field.type
    inputField.name = this.field.name
    inputField.id = this.field.id || this.field.name

    if (this.field.value !== undefined) {
      inputField.value = this.field.value
    }

    if (this.field.props && this.field.props instanceof Object && !Array.isArray(this.field.props)) {
      for (let prop in this.field.props) {
        inputField.setAttribute(prop, this.field.props[prop])
      }
    }

    if (this.field.attrs && Array.isArray(this.field.attrs)) {
      this.field.attrs.forEach(attr => inputField.setAttribute(attr, ''))
    }

    return html`
      ${inputField}
    `
  }
}

window.customElements.define('custom-input', CustomInput)
