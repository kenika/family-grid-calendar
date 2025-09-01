import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('family-grid-calendar')
export class FamilyGridCalendar extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<div>Family Grid Calendar</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-grid-calendar': FamilyGridCalendar;
  }
}
