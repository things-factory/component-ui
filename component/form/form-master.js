import { LitElement, html, css } from 'lit-element'
import * as FormSerialize from 'form-serialize'

class FormMaster extends LitElement {
  static get styles() {
    return css`
      form {
        padding: 30px;
        display: grid;
        grid-template-columns: var(--grid-template-columns);
      }
      input {
        border: solid 1px #32526a;
        max-width: 200px;
        padding-bottom: 10px;
      }
      input:focus {
        background-color: tomato;
      }

      ::placeholder {
        font-size: 0.8rem;
      }
    `
  }
  static get properties() {
    return {
      input: Array
    }
  }

  render() {
    const inputElements = (this.input || []).map(i => {
      const inputElement = document.createElement('input')
      inputElement.name = i.name
      inputElement.id = i.name
      inputElement.type = i.type
      if (i.readonly) inputElement.setAttribute('readonly', '')
      if (i.disabled) inputElement.setAttribute('disabled', '')
      if (i.placeholder) inputElement.placeholder = i.placeholder
      if (i.type !== 'number' && typeof i.length === 'number') inputElement.length = i.length
      if (i.type === 'number' && typeof i.min === 'number') inputElement.min = i.min
      if (i.type === 'number' && typeof i.max === 'number') inputElement.max = i.max

      return inputElement
    })

    return html`
      <form>
        ${inputElements.map(i => {
          return html`
            ${i}
          `
        })}
      </form>
    `
  }

  getForm() {
    return this.shadowRoot.querySelector('form')
  }

  clear() {
    this.getForm().reset()
  }

  focusById(id) {
    const input = this.shadowRoot.querySelector(`form > #${id}`)
    input.focus()
  }

  checkValidity() {
    return this.getForm().checkValidity()
  }

  serialize() {
    //transform data into json
    return FormSerialize(this.getForm())
  }
}

window.customElements.define('form-master', FormMaster)
