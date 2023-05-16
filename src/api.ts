import { Rarity } from "./interfaces";
import axios from "axios";

export async function getRarities() {
    try {
      const response = await axios.get<string[][]>("http://reshade.io:1234/");
  
      const raritiesCastedResponse = response.data.map((rawRarity) => {
        return {
          name: rawRarity[0],
          hexColor: `#${rawRarity[1]}`,
        } as Rarity;
      });
  
      const rarities: Rarity[] = [
        { name: "All", hexColor: "#ffffff" },
        ...raritiesCastedResponse,
      ];
  
      return rarities;
    } catch (error) {
      console.error(error);
    }
  }