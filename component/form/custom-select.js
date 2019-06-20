import { LitElement, html, css } from 'lit-element'

class CustomSelect extends LitElement {
  static get styles() {
    return css`
      select {
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
    const selectField = document.createElement('select')
    selectField.name = this.field.name
    selectField.id = this.field.id || this.field.name

    if (this.field.value !== undefined) {
      selectField.value = this.field.value
    }

    if (this.field.props && this.field.props instanceof Object && !Array.isArray(this.field.props)) {
      for (let prop in this.field.props) {
        this.field.props[prop].forEach(opt => {
          const option = document.createElement('option')
          option.value = opt.value
          option.innerText = opt.name
          if (opt.selected) option.setAttribute('selected', '')
          selectField.appendChild(option)
        })
      }
    }

    if (this.field.attrs && Array.isArray(this.field.attrs)) {
      this.field.attrs.forEach(attr => selectField.setAttribute(attr, ''))
    }

    return html`
      ${selectField}
    `
  }
}

window.customElements.define('custom-select', CustomSelect)
