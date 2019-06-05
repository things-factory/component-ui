import { html, css, LitElement } from 'lit-element'

class CalendarUI extends LitElement {
  static get properties() {
    return {
      days: Array,
      firstDay: Number
    }
  }

  static get styles() {
    return css`
      #calendar {
        text-align: center;
      }
      .sunday {
        color: red;
      }
      .saturday {
        color: blue;
      }
    `
  }

  firstUpdated() {
    const date = new Date()
    const firstDate = new Date(new Date().setDate(1))
    const firstDay = firstDate.getDay()
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    this.year = date.getFullYear()
    this.month = date.getMonth() + 1
    this.date = date.getDate()

    this.shadowRoot.querySelector('#date-picker').value = `${this.year}-${
      this.month < 10 ? `0${this.month}` : this.month
    }-${this.date < 10 ? `0${this.date}` : this.date}`

    this.dateList = this._computeDateList(firstDay, lastDate)

    this.requestUpdate()
  }

  render() {
    return html`
      <input id="date-picker" type="date" @change="${this._dateChanged}" />
      <table class="calendar-table" id="calendar">
        <thead>
          <tr>
            <th class="sunday">Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th class="saturday">Sat</th>
          </tr>
        </thead>

        <tbody id="calendar-body">
          ${(this.dateList || []).map(
            dateRow => html`
              <tr>
                ${dateRow.map(
                  (date, idx) => html`
                    <td class="${idx === 0 ? 'sunday' : idx === 6 ? 'saturday' : ''}">${date}</td>
                  `
                )}
              </tr>
            `
          )}
        </tbody>
      </table>
    `
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

  _dateChanged(e) {
    console.log(e.currentTarget.value)
  }
}

window.customElements.define('calendar-ui', CalendarUI)
