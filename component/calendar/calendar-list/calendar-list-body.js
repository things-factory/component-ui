import { LitElement, html, css } from 'lit-element'

class CalendarListBody extends LitElement {
  static get styles() {
    return css`
      :host {
        flex: 1;
        overflow: auto;
      }
      .calendar {
        padding: 0;
        margin: 0;
      }
      .calendar > li {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
      }
      .calendar > li.sunday {
        color: red;
      }
      .calendar > li.saturday {
        color: blue;
      }
      .calendar > li > span.date {
        font-weight: bold;
        font-size: 1.5rem;
      }
    `
  }

  static get properties() {
    return {
      firstDay: Number,
      dateList: Array
    }
  }

  render() {
    return html`
      <ul class="calendar">
        ${(this.dateList || []).map(
          (calendar, idx) =>
            html`
              <li
                class="${(this.firstDay + idx) % 7 === 0
                  ? 'sunday'
                  : (this.firstDay + idx) % 7 === 6
                  ? 'saturday'
                  : ''}"
              >
                <span class="date">${calendar.date}</span>
                <span class="day">${calendar.day}</span>
              </li>
            `
        )}
      </ul>
    `
  }
}

window.customElements.define('calendar-list-body', CalendarListBody)
