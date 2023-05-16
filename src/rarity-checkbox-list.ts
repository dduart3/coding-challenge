import { Rarity } from "./interfaces";
export class RarityCheckboxList extends HTMLElement {
  #rarities: Rarity[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set rarities(value: Rarity[]) {
    this.#rarities = value;
    this.render();
  }

  get styles() {
    return `
        <style>
              :host {
                  margin-top: 30px;
                  display: block;
              }
              
             :host * {
                  box-sizing: border-box;
             }
        </style>
      `;
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = /*html*/ `
        ${this.styles}
        <fieldset class="rarity-checkbox-list">
        ${this.#rarities
          .map(
            (rarity) => /*html*/ `
                <rarity-checkbox
                  name="${rarity.name}"
                  color="${rarity.hexColor}"
                  value="${rarity.name}"
                  >
                </rarity-checkbox>
              `
          )
          .join("\n")}
        </fieldset>
      `;
    }
  }
}

customElements.define("rarity-checkbox-list", RarityCheckboxList);
