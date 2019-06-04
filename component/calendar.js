import { html, LitElement } from 'lit-element'

class CalendarUI extends LitElement {
  static get properties() {
    return {
      days: Array,
      firstDay: Number
    }
  }

  constructor() {
    super()
    this.date = new Date()
    this.firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
    this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
    // this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }

  firstUpdated() {
    // this.showCalendar(this.currentMonth, this.currentYear)
  }

  render() {
    return html`
      <section>
        <h2>Welcome To OPAone Calendar</h2>

        <table class="table" id="calendar">
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>

          <tbody id="calendar-body">
            ${this.date.map(
              dateRow => html`
                <tr>
                  ${dateRow.map(
                    (date, idx) =>
                      html`
                        <th class="${(idx + 1) % 7 == 0 ? 'sat' : (idx + 1) % 7 == 1 ? 'sun' : ''}">${date}</th>
                      `
                  )}
                </tr>
              `
            )}
          </tbody>
        </table>
      </section>
    `
  }

  showCalendar(month, year) {
    let firstDay = new Date(year, month).getDay()
    this.tbl = this.shadowRoot.getElementById('calendar-body')

    // tbl = document.getElementById('calendar-body') // body of the calendar

    // clearing all previous cells
    this.tbl.innerHTML = ''

    // creating all cells
    let date = 1
    for (let i = 0; i < 6; i++) {
      // creates a table row
      const row = document.createElement('tr')

      //creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          const cell = document.createElement('td')
          const cellText = document.createTextNode('')
          cell.appendChild(cellText)
          row.appendChild(cell)
        } else if (date > this.daysInMonth(month, year)) {
          break
        } else {
          const cell = document.createElement('td')
          const cellText = document.createTextNode(date)
          if (date === this.date.getDate() && year === this.date.getFullYear() && month === this.date.getMonth()) {
            cell.classList.add('bg-info')
          } // color today's date
          cell.appendChild(cellText)
          row.appendChild(cell)
          date++
        }
      }

      this.tbl.appendChild(row) // appending each row into calendar body.
    }
  }

  daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate()
  }
}

window.customElements.define('calendar-ui', CalendarUI)
