import { i18next, localize } from '@things-factory/i18n-base'
import '@things-factory/setting-base'
import { css, html, LitElement } from 'lit-element'

import { InfiniteScrollable, ScrollbarStyles, TooltipStyles } from '@things-factory/shell'
import './attachment-creation-card'

export class CardTypeSelector extends InfiniteScrollable(localize(i18next)(LitElement)) {
  static get styles() {
    return [
      ScrollbarStyles,
      TooltipStyles,
      css`
        :host {
          display: grid;
          grid-template-rows: auto auto 1fr;
          overflow: hidden;
          background-color: var(--popup-content-background-color);
        }

        :host(.candrop) {
          background: orange;
          cursor: pointer;
        }

        #list {
          overflow: auto;
          padding: var(--popup-content-padding);
          display: grid;
          grid-template-columns: var(--card-list-template);
          grid-auto-rows: var(--card-list-rows-height);
          grid-gap: 20px;
        }

        #list .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          border-radius: var(--card-list-border-radius);
          border: var(--attachment-selector-border);
          background-color: var(--attachment-selector-background-color);

          position: relative;
        }

        #list .card.create {
          overflow: visible;
          background-color: initial;
        }

        #list .card:hover {
          cursor: pointer;
        }

        .name {
          background-color: rgba(1, 126, 127, 0.8);
          position: absolute;
          bottom: 0px;
          width: 100%;
          padding: 2px 5px;
          font: var(--attachment-selector-name-font);
          color: #fff;
          text-indent: 7px;
        }

        mwc-icon {
          position: absolute;
          right: 0px;
          text-align: center;

          background-color: var(--attachment-selector-icon-background-color);
          width: var(--attachment-selector-icon-size);
          height: var(--attachment-selector-icon-size);
          font: var(--attachment-selector-icon-font);
          color: var(--attachment-selector-icon-color);
        }

        mwc-icon:hover,
        mwc-icon:active {
          background-color: var(--primary-color);
          color: #fff;
        }

        #filter {
          padding: var(--popup-content-padding);
          background-color: var(--attachment-tools-background-color);
          box-shadow: var(--box-shadow);
        }

        #filter * {
          font-size: 15px;
        }
      `
    ]
  }

  static get properties() {
    return {
      categories: Array,
      attachments: Array,
      category: String,
      _page: Number,
      _total: Number,
      creatable: Boolean
    }
  }

  constructor() {
    super()

    this.categories = ['audio', 'video', 'image', 'text', 'application']
    this.attachments = []

    this._page = 1
    this._total = 0

    this._infiniteScrollOptions.limit = 20
  }

  render() {
    return html`
      <div id="filter">
        ${this.renderFilter()}
      </div>

      <div id="list">
        ${this.renderList()}
      </div>
    `
  }
}
