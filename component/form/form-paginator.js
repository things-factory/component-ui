import { css, html, LitElement } from 'lit-element'

class FormPaginator extends LitElement {
  static get properties() {
    return {
      pageCount: Number,
      selectors: Array
    }
  }

  static get styles() {
    return css`
      :host {
        display: grid;
        background-color: var(--form-background-color, #e5e5e5);
      }
      #paginator-nav {
        margin: auto;
      }
      #paginator-nav > .selector {
        font-size: 1.8rem;
        color: #c4c5c6;
      }
      #paginator-nav > .selector[selected] {
        font-size: 1.8rem;
        color: #6f6f6f;
      }
    `
  }

  constructor() {
    super()
    this.pageCount = 1
    this.selectors = []
    this.currentPage = 1
  }

  render() {
    return html`
      <div id="paginator-nav">
        ${this.selectors.map(
          page => html`
            <span
              class="selector"
              page="${page}"
              ?selected="${page == this.currentPage}"
              @click="${() => {
                this.currentPage = page
                this.dispatchEvent(new CustomEvent('pageChange'))
                this.requestUpdate()
              }}"
              >&bull;</span
            >
          `
        )}
      </div>
    `
  }

  updated(changeProps) {
    if (changeProps.has('pageCount')) {
      if (this.pageCount > 1) {
        let i = 1
        this.selectors = []

        while (i <= this.pageCount) {
          this.selectors.push(i)
          i++
        }
      } else {
        this.selectors = []
      }
    }
  }
}

window.customElements.define('form-paginator', FormPaginator)
