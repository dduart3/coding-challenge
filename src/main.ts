import "./style.css";
import { getRarities } from "./api";
import './rarity-checkbox';
import './rarity-checkbox-list';
import { RarityCheckboxList } from "./rarity-checkbox-list";
import { RarityCheckboxInfo } from "./interfaces";
import { RaritiesInfo } from "./modules";
import { rarityCheckboxChangeEventName } from "./constants";

const updateRaritiesInfo = (updateFunction:(newValue: RarityCheckboxInfo[]) => void) => {

  const newRaritiesInfo: { name: string | null | undefined; checked: boolean; }[]= []

  const raritiesListElement = document.getElementById('rarities-list') as RarityCheckboxList;
  const rarityCheckboxList = raritiesListElement.shadowRoot?.querySelectorAll('rarity-checkbox')

  rarityCheckboxList?.forEach((checkboxElement)=>{
    const input = checkboxElement.shadowRoot?.querySelector('input');
    
    const name = input?.getAttribute('name');
    const checked = input?.getAttribute('checked') != null;
    //console.log(input)
    
    const rarityInfo = {
      name,
      checked
    }
    newRaritiesInfo.push(rarityInfo)
  })
  updateFunction(newRaritiesInfo)
  return
} 



async function main (){
  const raritiesInfo = RaritiesInfo();
  
  const rarities = await getRarities();
  const raritiesListElement = document.getElementById('rarities-list') as RarityCheckboxList;

  if(!rarities) return;
  raritiesListElement.rarities = rarities;

  document.addEventListener(rarityCheckboxChangeEventName, (e)=>{
    console.log(e)
  })

}

main();


