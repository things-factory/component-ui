import { LitElement, html, css } from 'lit-element'

class InfiniteScroll extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }
    `
  }
  static get properties() {
    return {
      pageProp: String,
      callback: Object,
      loadHeight: Number
    }
  }

  constructor() {
    super()
    this.loadHeight = 0.8
  }

  render() {
    return html`
      <slot></slot>
    `
  }

  firstUpdated() {
    const childElement = this.firstElementChild
    childElement.addEventListener('scroll', e => {
      const totalScrollHeight = childElement.scrollHeight
      const screenHeight = childElement.offsetHeight
      const currentScrollTop = childElement.scrollTop
      const targetHeight = totalScrollHeight * this.loadHeight
      console.log(targetHeight)

      if (totalScrollHeight == screenHeight + currentScrollTop) {
        if (this.pageProp) {
          childElement[this.pageProp]++
        }

        if (this.callback && typeof this.callback === 'function') {
          this.callback().bind(childElement)
        }
      }
    })
  }
}

window.customElements.define('infinite-scroll', InfiniteScroll)
