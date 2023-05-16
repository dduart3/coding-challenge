import { RarityCheckboxInfo } from "./interfaces";

export const RaritiesInfo = () => {
  let raritiesInfo: RarityCheckboxInfo[] = [];

  const getRaritiesInfo = () => raritiesInfo;
  const setRaritiesInfo = (newValue: RarityCheckboxInfo[]) =>
    (raritiesInfo = newValue);

  return {
    getRaritiesInfo,
    setRaritiesInfo,
  };
};
