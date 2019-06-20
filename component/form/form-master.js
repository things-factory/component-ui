import { LitElement, html, css } from 'lit-element'
import * as FormSerialize from 'form-serialize'

class FormMaster extends LitElement {
  static get styles() {
    return css`
      form {
        padding: 10px;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: var(--form-grid-template-columns);
        background-color: var(--form-background-color, #e5e5e5);
      }
      input,
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
        justify-self: center;
      }
      select {
        min-width: calc(
          var(--form-input-width, 300px) + 2 * var(--form-input-padding, 5px) + 2 * var(--form-input-border-width, 1px)
        );
        max-width: calc(
          var(--iform-nput-width) + 2 * var(--form-input-padding, 5px) + 2 * var(--form-input-border-width, 1px)
        );
        -webkit-appearance: none;
        -webkit-border-radius: 0px;
      }
    `
  }
  static get properties() {
    return {
      fields: Array,
      maxColumnCount: Number,
      initFocus: String
    }
  }

  constructor() {
    super()
    this.maxColumnCount = 4
    window.onresize = this._adjustColumnProperty.bind(this)
  }

  render() {
    const inputElements = (this.fields || []).map(i => {
      let childElement

      if (i.type === 'select') {
        childElement = document.createElement('select')
      } else {
        childElement = document.createElement('input')
        childElement.type = i.type
      }

      childElement.name = i.name
      childElement.id = i.id ? i.id : i.name

      if (i.value !== undefined) {
        childElement.value = i.value
      }

      if (i.props && i.props instanceof Object && !Array.isArray(i.props)) {
        for (let prop in i.props) {
          if (prop === 'options') {
            i.props[prop].forEach(opt => {
              const option = document.createElement('option')
              option.value = opt.value
              option.innerText = opt.name
              if (opt.selected) option.setAttribute('selected', '')
              childElement.appendChild(option)
            })
          } else {
            childElement.setAttribute(prop, i.props[prop])
          }
        }
      }

      if (i.attrs && Array.isArray(i.attrs)) {
        i.attrs.forEach(attr => childElement.setAttribute(attr, ''))
      }

      return childElement
    })

    return html`
      <form
        @keypress="${e => {
          if (e.keyCode === 13) {
            this.submit()
          }
        }}"
      >
        ${inputElements.map(i => {
          return html`
            ${i}
          `
        })}
      </form>
    `
  }

  updated(changedProps) {
    if (changedProps.has('fields')) {
      this._checkInputValidity()
      this._adjustColumnProperty()
      this._initFocus()
    }
  }

  _initFocus() {
    let targetInput = this.initFocus
      ? this.form.querySelector(`#${this.initFocus}`)
        ? this.form.querySelector(`#${this.initFocus}`)
        : this.form.firstElementChild
      : this.form.firstElementChild
    targetInput.focus()
  }

  _checkInputValidity() {
    const names = this.fields.map(i => i.name)
    const result = names.every(name => {
      return names.indexOf(name) === names.lastIndexOf(name)
    })
    if (!result) {
      throw new Error('Field name is duplicated.')
    }
  }

  _adjustColumnProperty() {
    const inputElements = Array.from(this.form.children)
    if (inputElements.length === 0) return
    const inputWidth = inputElements[0].offsetWidth
    const totalWidth = window.innerWidth
    const inputCount = inputElements.length
    let columnCount =
      Math.floor(totalWidth / inputWidth) < this.maxColumnCount
        ? Math.floor(totalWidth / inputWidth)
        : this.maxColumnCount > inputCount
        ? inputCount
        : this.maxColumnCount

    this.style.setProperty('--form-grid-template-columns', `repeat(${columnCount}, 1fr)`)
  }

  get form() {
    return this.shadowRoot.querySelector('form')
  }

  getFields() {
    return Array.from(this.shadowRoot.querySelector('form').children)
  }

  reset() {
    this.form && this.form.reset()
  }

  submit() {
    this.dispatchEvent(new CustomEvent('submit'))
  }

  focusById(id) {
    const input = this.shadowRoot.querySelector(`form > #${id}`)
    input.focus()
  }

  checkValidity() {
    return this.form.checkValidity()
  }

  serialize() {
    let data = {}
    Array.from(this.form.children).forEach(children => {
      if (children.type === 'number') {
        data[children.name] = parseFloat(children.value)
      } else {
        data[children.name] = children.value
      }
    })

    return data
  }

  getSearchParams() {
    return FormSerialize(this.form)
  }
}

window.customElements.define('form-master', FormMaster)
