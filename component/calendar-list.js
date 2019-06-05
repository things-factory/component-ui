import { html, css, LitElement } from 'lit-element'

class ClandarList extends LitElement {
  static get properties() {
    return {
      year: Number,
      month: Number
    }
  }

  render() {
    return html`
      <ul>
        <h4>${this.month}</h4>
        ${(this.date || []).map(date => {
          html`
            <li>${date}</li>
          `
        })}
      </ul>
    `
  }

  hasChanged(changedProps) {
    if (changedProps.has('year')) {
      console.log(this.year)
    }
  }
}

window.customElements.define('calandar-list', ClandarList)
