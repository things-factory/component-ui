import { html, css, LitElement } from 'lit-element'
import './calendar-list-body'

class CalendarList extends LitElement {
  static get properties() {
    return {
      months: Array,
      days: Array,
      year: Number,
      month: Number,
      dateList: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          padding: 10px;
          flex: 1;
        }
        .display > span {
          font-weight: bold;
          font-size: 2rem;
        }
      `
    ]
  }

  constructor() {
    super()
    this.months = []
    this.days = []
  }

  render() {
    return html`
      <div class="display">
        <span>${this.months[this.month - 1]}, ${this.year}</span>
      </div>

      <calendar-list-body .firstDay="${this.firstDay}" .dateList="${this.dateList}"></calendar-list-body>
    `
  }

  updated(props) {
    if (props.has('year')) {
      this._getDateList()
    } else if (props.has('month')) {
      this._getDateList()
    }
  }

  _getDateList() {
    this.months =
      this.months && this.months.length === 12
        ? this.months
        : [
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
    this.days = this.days && this.days.length === 7 ? this.days : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    this.dateList = []
    const stdDate = new Date(this.year, this.month - 1)
    this.firstDay = stdDate.getDay()

    stdDate.setMonth(this.month)
    stdDate.setDate(0)

    const lastDate = stdDate.getDate()

    for (let date = 1; date <= lastDate; date++) {
      const day = this.days[(this.firstDay + date - 1) % 7]
      this.dateList.push({
        date,
        day
      })
    }
  }
}

window.customElements.define('calendar-list', CalendarList)
