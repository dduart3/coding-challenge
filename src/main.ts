import "./style.css";
import { getRarities } from "./api";
import "./rarity-checkbox";
import "./rarity-checkbox-list";
import { RarityCheckboxList } from "./rarity-checkbox-list";
import { RarityCheckboxInfo } from "./interfaces";
import { RaritiesInfo } from "./modules";
import { rarityCheckboxChangeEventName } from "./constants";

const updateRaritiesInfo = (
  updateFunction: (newValue: RarityCheckboxInfo[]) => void
) => {
  const newRaritiesInfoArray: RarityCheckboxInfo[] = [];

  const raritiesListElement = document.getElementById(
    "rarities-list"
  ) as RarityCheckboxList;

  const rarityCheckboxList =
    raritiesListElement.shadowRoot?.querySelectorAll("rarity-checkbox");

  rarityCheckboxList?.forEach((checkboxElement) => {
    const input = checkboxElement.shadowRoot?.querySelector("input");
    const name = input?.name;
    const checked = input?.checked;

    const rarityInfo = {
      name,
      checked,
    };

    newRaritiesInfoArray.push(rarityInfo);
  });

  updateFunction(newRaritiesInfoArray);
  return;
};

async function main() {
  //you can just move this and export it to have access globally
  const raritiesInfo = RaritiesInfo();

  const rarities = await getRarities();
  const raritiesListElement = document.getElementById(
    "rarities-list"
  ) as RarityCheckboxList;

  if (!rarities) return;
  raritiesListElement.rarities = rarities;

  document.addEventListener(rarityCheckboxChangeEventName, () => {
    updateRaritiesInfo(raritiesInfo.setRaritiesInfo);

    //gonna leave this console log so you can see the information being updated
    console.log(raritiesInfo.getRaritiesInfo());
  });
}

main();
