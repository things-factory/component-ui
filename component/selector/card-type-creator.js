import { LitElement, html, css } from 'lit-element'

export class CardTypeCreator extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          position: relative;

          padding: 0;
          margin: 0;
          height: 100%;

          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          -webkit-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }

        :host(.flipped) {
          -webkit-transform: var(--card-list-flip-transform);
          transform: var(--card-list-flip-transform);
        }

        [front],
        [back] {
          position: absolute;

          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;

          border: var(--card-list-create-border);
          border-radius: var(--card-list-create-border-radius);

          background-color: #fff;

          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        [front] {
          text-align: center;
          font-size: 0.8em;
          color: var(--card-list-create-color);
          text-transform: capitalize;
        }

        [front] mwc-icon {
          margin-top: 15%;
          display: block;
          font-size: 3.5em;
          color: var(--card-list-create-icon-color);
        }

        [back] {
          -webkit-transform: var(--card-list-flip-transform);
          transform: var(--card-list-flip-transform);
        }

        [back] form {
          padding: var(--card-list-create-form-padding);
          display: flex;
          flex-flow: row wrap;
        }

        [back] form label {
          flex: 1 1 25%;
          font: var(--card-list-create-label-font);
          color: var(--card-list-create-label-color);
        }

        [back] form input,
        [back] form select {
          flex: 1 1 60%;
          width: 10px;
          background-color: #fff;
          border: var(--card-list-create-input-border);
          border-radius: var(--card-list-create-input-border-radius);
          padding: var(--card-list-create-input-padding);
          font: var(--card-list-create-input-font);
          color: var(--card-list-create-input-color);
        }
      `
    ]
  }

  render() {
    return html`
      <div @click=${e => this.onClickFlip(e)} front><mwc-icon>add_circle_outline</mwc-icon>create font</div>

      <div @click=${e => this.onClickFlip(e)} back>
        ${this.renderForm()}
      </div>
    `
  }

  renderForm() {
    return html``
  }

  onClickFlip(e) {
    if (e.currentTarget.hasAttribute('front') || e.target.hasAttribute('back')) {
      this.classList.toggle('flipped')
    }

    e.stopPropagation()
  }

  reset() {
    this.classList.remove('flipped')
  }
}
