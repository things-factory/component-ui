import { LitElement, html, css } from 'lit-element'
import '@material/mwc-button/mwc-button'

class PopUp extends LitElement {
  static get styles() {
    return css`
      :host {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        padding: 10vw;
        z-index: 1;
        display: none;
      }
      #header {
        display: flex;
        margin: 10px 10px 0 10px;
      }
      #header > .title {
        margin: 0;
        flex: 1;
      }
      #container {
        max-height: calc(100% - 40px);
        display: flex;
        flex-direction: column;
        flex: 1;
        border-radius: 5px;
        background-color: #fff;
      }
      #content {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
        margin: 10px;
      }
    `
  }

  static get properties() {
    return {
      title: String,
      opened: Boolean,
      openCallback: Object,
      closeCallback: Object
    }
  }

  constructor() {
    super()
    this.opened = false
    this.addEventListener('click', this.close.bind(this))
  }

  render() {
    return html`
      <div id="container">
        <div id="header">
          <h2 class="title">${this.title}</h2>
          <mwc-button @click="${this.close}">X</mwc-button>
        </div>

        <div id="content">
          <slot></slot>
        </div>
      </div>
    `
  }

  open() {
    this.dispatchEvent(new CustomEvent('open'))

    this.style.display = 'block'
    this.opened = true

    if (this.openCallback && typeof this.openCallback === 'function') {
      this.openCallback()
    }
  }

  close() {
    this.dispatchEvent(new CustomEvent('close'))

    this.style.display = 'none'
    this.opened = false

    if (this.closeCallback && typeof this.closeCallback === 'function') {
      this.closeCallback()
    }
  }

  toggle() {
    if (this.opened) {
      this.close()
    } else {
      this.open()
    }
  }
}

window.customElements.define('pop-up', PopUp)
