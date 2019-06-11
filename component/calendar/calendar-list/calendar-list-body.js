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
      .calendar > li .date-container {
        display: flex;
      }
      .date-container {
        display: flex;
      }
      .date-container span {
        margin: auto 3px;
      }
      .date-container span.task-cnt {
        flex: 1;
        text-align: right;
        color: #888;
      }
      .calendar > li.sunday {
        color: red;
      }
      .calendar > li.saturday {
        color: blue;
      }
      .calendar > li span.date {
        font-weight: bold;
        font-size: 1.5rem;
      }

      .calendar ul.tasks {
        list-style: none;
        color: black;
        padding-top: 10px;
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
                @click="${e => {
                  if (calendar.tasks.length === 0 || e.target.classList.contains('task-item')) return
                  const tasks = e.currentTarget.querySelector('.tasks')
                  tasks.hidden = !tasks.hidden
                }}"
              >
                <div class="date-container">
                  <span class="date">${calendar.date}</span>
                  <span class="day">${calendar.day}</span>
                  <span class="task-cnt"
                    >${calendar.tasks.length > 0
                      ? calendar.tasks.length == 1
                        ? calendar.tasks.length + ' task'
                        : calendar.tasks.length + ' tasks'
                      : ''}</span
                  >
                </div>

                <ul class="tasks" hidden>
                  ${(calendar.tasks || []).map(
                    task => html`
                      <li>
                        <span
                          class="task-item"
                          @click="${() => {
                            this.dispatchEvent(
                              new CustomEvent('clickTask', {
                                detail: {
                                  task
                                }
                              })
                            )
                          }}"
                          >${task.name}</span
                        >
                      </li>
                    `
                  )}
                </ul>
              </li>
            `
        )}
      </ul>
    `
  }
}

window.customElements.define('calendar-list-body', CalendarListBody)
