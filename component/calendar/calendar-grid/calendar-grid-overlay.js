import '@material/mwc-button'
import { css, html, LitElement } from 'lit-element'

class CalendarGridOverlay extends LitElement {
  static get styles() {
    return css`
      :host {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        flex-direction: column;
      }
      #modal {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: grid;
        background-color: rgba(0, 0, 0, 0.5);
      }
      #container {
        display: flex;
        flex-direction: column;
        margin: 20%;
        background-color: white;
        padding: 10px;
        border-radius: 10px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      li {
        border-bottom: 1px solid #f5f5f5;
        padding: 10px;
      }
      #button-container {
        display: grid;
      }
      #button-container #close-button {
        margin-left: auto;
      }
    `
  }

  static get properties() {
    return {
      tasks: Array
    }
  }

  get modal() {
    return this.shadowRoot.querySelector('#modal')
  }

  get container() {
    return this.shadowRoot.querySelector('#container')
  }

  render() {
    return html`
      <div id="modal" @click="${this.close}">
        <div id="container">
          <div id="button-container">
            <mwc-button id="close-button" @click=${this.close}>X</mwc-button>
          </div>
          <ul>
            ${(this.tasks || []).map(
              task =>
                html`
                  <li
                    @click="${event => {
                      this.dispatchEvent(
                        new CustomEvent('clickTask', {
                          detail: {
                            task
                          }
                        })
                      )

                      event.stopPropagation()
                    }}"
                  >
                    ${task.name}
                  </li>
                `
            )}
          </ul>
        </div>
      </div>
    `
  }

  open() {
    this.style.display = 'flex'
  }

  close(event) {
    if (event.target === this.container) return
    this.style.display = 'none'
  }
}

window.customElements.define('calendar-grid-overlay', CalendarGridOverlay)
