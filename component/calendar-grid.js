import { html, css, LitElement } from 'lit-element'

class CalendarGrid extends LitElement {
  static get properties() {
    return {
      firstDay: Number,
      year: Number,
      month: Number
    }
  }

  static get styles() {
    return css`
      section {
        padding: 30px;
      }
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
        padding-right: 10px;
        padding-top: 10px;
        text-align: right;
        vertical-align: top;
      }
      .sunday {
        color: red;
      }
      .saturday {
        color: blue;
      }
    `
  }

  render() {
    return html`
      <section>
        <div class="grid-container" id="calendar">
          ${(this.labelDay || []).map(
            label => html`
              <div class="label-day">${label}</div>
            `
          )}
          ${(this.dateList || []).map(
            dateRow => html`
              ${dateRow.map(
                (date, idx) => html`
                  <div class="grid-item ${idx === 0 ? 'sunday' : idx === 6 ? 'saturday' : ''}">${date}</div>
                `
              )}
            `
          )}
        </div>
      </section>
    `
  }

  constructor() {
    super()
    this.labelDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
  }

  updated(changedProps) {
    if (changedProps.has('year') && changedProps.has('month')) {
      this.date = new Date()
      this.date.setFullYear(this.year, this.month - 1, 1)

      const firstDay = this.date.getDay()
      const lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()

      this.dateList = this._computeDateList(firstDay, lastDate)
      this.requestUpdate()
    }
  }

  _computeDateList(firstDay, lastDate) {
    let dateList = []
    let row = []
    // firstDay is 6
    for (let i = 0; i < firstDay; i++) {
      row.push('')
    }

    for (let i = 1; i <= lastDate; i++) {
      if (row.length >= 7) {
        dateList.push(row)
        row = new Array()
      }

      row.push(i)

      if (i === lastDate) {
        dateList.push(row)
      }
    }

    return dateList
  }
}

window.customElements.define('calendar-grid', CalendarGrid)
