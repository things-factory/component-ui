import { LitElement, html, css } from 'lit-element'

class CalendarGridBody extends LitElement {
  static get properties() {
    return {
      days: Array,
      dateList: Array,
      currentDate: Number
    }
  }

  static get styles() {
    return css`
      .grid-container {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
      }
      .label-day {
        text-align: right;
        font-weight: 100;
        padding-bottom: 10px;
      }
      .grid-item {
        border: 1px solid #f5f5f5;
        font-size: 1rem;
        height: 90px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: right;
        vertical-align: top;
        display: flex;
        flex-direction: column;
      }
      .date {
        margin: 0 10px auto auto;
      }
      .sunday {
        color: red;
      }
      .saturday {
        color: blue;
      }
      .dateBadge {
        background-color: #ff3b30;
        border-radius: 50%;
        color: white;
        padding: 5px 9px 5px 9px;
      }
      .countBadge {
        display: grid;
        background-color: #daf4d2;
        color: black;
        font-size: 0.8rem;
        font-weight: 100;
      }
    `
  }

  render() {
    return html`
      <div class="grid-container" id="calendar">
        ${(this.days || []).map(
          day => html`
            <div class="label-day">${day}</div>
          `
        )}
        ${(this.dateList || []).map(
          dateRow => html`
            ${dateRow.map(
              (calendar, idx) => html`
                <div class="grid-item ${idx === 0 ? 'sunday' : idx === 6 ? 'saturday' : ''}">
                  <span class="date ${calendar.isCurrentDate ? 'dateBadge' : ''}">${calendar.date}</span>

                  <span class="countBadge"
                    >${calendar.events && calendar.events.length > 0 ? calendar.events.length + ' tasks' : ''}</span
                  >
                </div>
              `
            )}
          `
        )}
      </div>
    `
  }
}

window.customElements.define('calendar-grid-body', CalendarGridBody)
