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
            
            .blog-posts .posts {
              padding: 0 20px;
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              grid-auto-rows: 1fr;
              grid-gap: 25px;
              --blog-post-width: auto;
              --blog-post-height: 100%;
              --blog-post-thumb-bg: #3d5063;
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
