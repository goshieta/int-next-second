import { Dispatch, SetStateAction } from "react";
import { settingJsonType } from "./settings";

export default function SettingReact(
  settingJson: settingJsonType,
  setSettingJson: Dispatch<SetStateAction<settingJsonType>>,
  newValue: String,
  target: string
) {
  let newSettingJson = JSON.parse(JSON.stringify(settingJson));
  const keys = target.split(".");
  let scoapJson: any[] = [newSettingJson];
  //scapJsonを作成
  keys.forEach((oneKey, index) => {
    if (index === keys.length - 2) {
      const newScoap = JSON.parse(JSON.stringify(scoapJson[index][oneKey]));
      newScoap[keys[index + 1]] = newValue;
      scoapJson.unshift(newScoap);
    } else if (index === keys.length - 1) {
    } else {
      scoapJson.unshift(scoapJson[index][oneKey]);
    }
  });
  //scoapJsonをもとに新しいJsonを作る
  newSettingJson = scoapJson[0];
  scoapJson.forEach((oneScoap, index) => {
    if (index == 0) return;
    newSettingJson = {
      ...oneScoap,
      [keys[scoapJson.length - 1 - index]]: newSettingJson,
    };
  });
  setSettingJson(newSettingJson);
}
