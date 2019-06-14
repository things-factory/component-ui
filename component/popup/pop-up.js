import { LitElement, html, css } from 'lit-element'

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
      }
    `
  }

  static get properties() {
    return {
      open: Boolean,
      openCallback: Object,
      closeCallback: Object
    }
  }

  render() {
    return html`
      <div id="container">
        <div id="header">
          <h2>${this.title}</h2>
        </div>

        <div id="content">
          <slot></slot>
        </div>
      </div>
    `
  }

  open() {
    this.open = true
    this.dispatchEvent('open')

    if (this.openCallback && typeof this.openCallback === 'function') {
      this.openCallback()
    }
  }

  close() {
    this.open = false
    this.dispatchEvent('close')

    if (this.closeCallback && typeof this.closeCallback === 'function') {
      this.closeCallback()
    }
  }

  toggle() {
    if (this.open) {
      this.close()
    } else {
      this.open()
    }
  }
}

window.customElements.define('pop-up', PopUp)
