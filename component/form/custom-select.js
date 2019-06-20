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
        outline: var(--form-input-outline, none);
        background-color: var(--form-input-background-color, #fff);
        min-width: calc(
          var(--form-input-width, 300px) + 2 * var(--form-input-padding, 5px) + 2 * var(--form-input-border-width, 1px)
        );
        max-width: calc(
          var(--form-input-width) + 2 * var(--form-input-padding, 5px) + 2 * var(--form-input-border-width, 1px)
        );
        -webkit-appearance: none;
        -webkit-border-radius: 0px;
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

    this.field = {
      options: [
        {
          name: 'opt1',
          value: 'value_of_opt1'
        },
        {
          name: 'opt2',
          value: 'value_of_opt2',
          selected: true
        },
        {
          name: 'opt3',
          value: 'value_of_opt3'
        }
      ]
    }

    this.field.options.forEach(opt => {
      const option = document.createElement('option')
      option.value = opt.value
      option.innerText = opt.name
      if (opt.selected) option.setAttribute('selected', '')
      selectField.appendChild(option)
    })

    if (this.field.attrs && Array.isArray(this.field.attrs)) {
      this.field.attrs.forEach(attr => selectField.setAttribute(attr, ''))
    }

    return html`
      ${selectField}
    `
  }
}

window.customElements.define('custom-select', CustomSelect)
