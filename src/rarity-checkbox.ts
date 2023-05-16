import { rarityCheckboxChangeEventName } from "./constants";

export class RarityCheckbox extends HTMLElement {
  name = "";
  color = "";
  value = "";
  checked = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "color", "value", "checked"];
  }

  connectedCallback() {
    this.render();

    //toggle checkbox function
    this.shadowRoot?.addEventListener("click", (event) => {
      event.preventDefault();
      this.checked = !this.checked;
      this.render();

      try {
        const rarityCheckboxChangeEvent = new Event(
          rarityCheckboxChangeEventName
        );
        document.dispatchEvent(rarityCheckboxChangeEvent);
      } catch (error) {
        console.error(error);
      }
    });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // make sure it is mounted first
    if (this.isConnected) {
      switch (name) {
        case "name":
          this.name = newValue || "default";
          break;
        case "color":
          this.color = newValue || "ffffff";
          break;
        case "value":
          this.value = newValue || "default";
          break;
      }

      this.render();
    }
  }

  get styles() {
    return `
          <style>
              .rarity-checkbox-container {
                width: 300px;
                margin: 25px 0;
                display: flex;
                align-items: center;
                user-select: none;
              }

              .rarity-checkbox-container label {
                  color: ${this.color};
                  font-size: 26px;
                  position: absolute;
                  z-index: 10;
                  padding-left: 50px;
                  cursor: pointer;
              }

              .rarity-checkbox-container input {
                opacity: 0;
                visibility: hidden;
                position: absolute;
              }

              .rarity-checkbox-container input:checked ~ .check {
                background: linear-gradient(rgb(62, 174, 255) -4.13%, rgb(60, 244, 200) 97.72%);
              }

              .rarity-checkbox-container input:checked ~ .check::after {
                opacity: 1;
                transform: scale(1.5);
              }

              .rarity-checkbox-container .check {
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                background-color: #FFF;
                border: none;
                border-radius: 10%;                
              }

              .rarity-checkbox-container .check::after {
                content: '';
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 4;
                position: absolute;
                transform: scale(0);
                background-size: 50%;
                background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxNCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01LjI4NDkxIDcuNzIxMDFMMTIuMTA3MiAwLjc5NDk5MUMxMi4zNzY0IDAuNTIxNzY3IDEyLjgxMjcgMC41MjE3NjcgMTMuMDgxOSAwLjc5NDk5MUMxMy4zNTEgMS4wNjgyMSAxMy4zNTEgMS41MTEyIDEzLjA4MTkgMS43ODQ0Mkw1Ljc3MjIyIDkuMjA1MTZDNS41MDMwOCA5LjQ3ODM4IDUuMDY2NzMgOS40NzgzOCA0Ljc5NzYgOS4yMDUxNkwwLjg5OTExNiA1LjI0NzQzQzAuNjI5OTgyIDQuOTc0MjEgMC42Mjk5ODIgNC41MzEyMiAwLjg5OTExNiA0LjI1OEMxLjE2ODI1IDMuOTg0NzggMS42MDQ2IDMuOTg0NzggMS44NzM3NCA0LjI1OEw1LjI4NDkxIDcuNzIxMDFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K");
                background-repeat: no-repeat;
                background-position: center;
              }
          </style>
        `;
  }

  get template() {
    return /*html*/ `
    <div class="rarity-checkbox-container">
      <input type="checkbox" id=${this.value} name=${this.name} ${
      this.checked ? "checked" : ""
    }>
      <span class="check"></span>
      <label for=${this.name}>${this.name}</label>
    </div>
        `;
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `${this.styles}${this.template}`;
    }
  }
}

customElements.define("rarity-checkbox", RarityCheckbox);
