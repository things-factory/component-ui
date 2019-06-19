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
      input: Array,
      maxColumnCount: Number
    }
  }

  constructor() {
    super()
    this.maxColumnCount = 4
    window.onresize = this.onResizeHandler.bind(this)
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

  onResizeHandler(event) {
    // total width of screen
    const totalWidth = event.currentTarget.innerWidth
    const inputWidth = this.shadowRoot.querySelector('input').offsetWidth

    const columnCount =
      Math.floor(totalWidth / inputWidth) > this.maxColumnCount
        ? this.maxColumnCount
        : Math.floor(totalWidth / inputWidth)

    let columnProperty = []

    for (let i = 0; i < columnCount; i++) {
      columnProperty.push('auto')
    }
    columnProperty = columnProperty.join(' ')
    this.style.setProperty('--grid-template-columns', columnProperty)
    console.log(columnProperty)

    //max count for mobile 1, desktop 4

    // if (changes.has('inputyt')) {
    //   let inputLength = this.input
    //     .map((input, i, arr) => `${input.gridWidth}px`)
    //     .concat(['auto'])
    //     .join(' ')

    //   this.style.setProperty('--grid-template-columns', inputLength)
    // }
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
