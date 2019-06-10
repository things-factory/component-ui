import { html, css, LitElement } from 'lit-element'
import './calendar-grid-body'

class CalendarGrid extends LitElement {
  static get properties() {
    return {
      year: Number,
      month: Number,
      days: Array,
      months: Array,
      dateList: Array,
      events: Array
    }
  }

  static get styles() {
    return css`
      section {
        padding: 30px;
      }
    `
  }

  render() {
    return html`
      <section>
        <h2>${this.currentMonth}, ${this.currentYear}</h2>
        <calendar-grid-body .days="${this.days}" .dateList="${this.dateList}"></calendar-grid-body>
      </section>
    `
  }

  constructor() {
    super()
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

    this.months = [
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
  }

  updated(props) {
    if (props.has('year') || props.has('month') || props.has('events')) {
      this._getDateList()
    }
  }

  _getDateList() {
    if (!this.year || !this.month) return
    this.date = new Date()

    this.date.setFullYear(this.year, this.month - 1, 1)

    this.currentMonth = this.months[this.date.getMonth()]
    this.currentYear = this.date.getFullYear()

    const firstDay = this.date.getDay()
    const lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()

    this.dateList = this._computeDateList(firstDay, lastDate)
  }

  _computeDateList(firstDay, lastDate) {
    let dateList = []
    let row = []

    // firstDay is 6
    for (let i = 0; i < firstDay; i++) {
      row.push({})
    }

    for (let date = 1; date <= lastDate; date++) {
      if (row.length >= 7) {
        dateList.push(row)
        row = new Array()
      }

      row.push({
        date,
        events: (this.events || []).filter(e => e.date === date),
        isCurrentDate: this._isCurrentDate(date)
      })

      if (date === lastDate) {
        dateList.push(row)
      }
    }

    return dateList
  }

  _isCurrentDate(date) {
    const stdDate = new Date()

    const currentDate = stdDate.getDate()
    if (date !== currentDate) return false

    const currentYear = stdDate.getFullYear()
    if (this.year !== currentYear) return false

    const currentMonth = stdDate.getMonth() + 1
    if (this.month !== currentMonth) return false

    return true
  }
}

window.customElements.define('calendar-grid', CalendarGrid)
