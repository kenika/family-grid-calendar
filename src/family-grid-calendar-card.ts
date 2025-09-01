import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('family-grid-calendar-card')
export class FamilyGridCalendarCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<div>Family Grid Calendar Card</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-grid-calendar-card': FamilyGridCalendarCard;
  }
}
