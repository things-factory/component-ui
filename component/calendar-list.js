import { html, css, LitElement } from 'lit-element'

class CalendarList extends LitElement {
  static get properties() {
    return {
      year: Number,
      month: Number,
      columns: Array,
      data: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          overflow: auto;
        }

        .calendar-item {
          padding: 5px 15px 5px 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .calendar-date {
          font-size: 1.2em;
          font-weight: bold;
        }

        .calendar-event {
          font-size: 0.8em;
          color: gray;
        }
      `
    ]
  }

  constructor() {
    super()
    this.date = new Date()
    this.currentDate = this.date.getDate()

    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    this.currentMonth = month[this.date.getMonth()]
    this.currentYear = this.date.getFullYear()
  }

  render() {
    var columns = this.columns.filter(column => {
      return Number(column.gridWidth) && !column.hiddenFlag
    })
    var date = (this.date && this.date.event) || []

    return html`
      <h2>${this.currentMonth}, ${this.currentYear}</h2>

      ${(date || []).map(calendar => {
        html`
          <div class="calendar-item">
            <div class="calendar-date">
              ${calendar[columns[0].date]}
            </div>
            <div class="calendar-event">
              ${calendar[columns[1].event]}
            </div>
          </div>
        `
      })}
    `
  }

  hasChanged(changedProps) {
    if (changedProps.has('year')) {
      console.log(this.year)
    }
  }
}

window.customElements.define('calendar-list', CalendarList)
