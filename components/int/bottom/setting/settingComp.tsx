import { useState } from "react";
import styles from "../../../../styles/comp/setComp.module.css";

type radioType = {
  allBtName: string;
  radioSelect: {
    value: string;
    name: string;
  }[];
  onChange: (nowSe: String) => void;
  defaultValue: string;
};
/*設定用コンポーネントの集まり*/
export function SettingsRadios(props: radioType) {
  const [radioValue, setRadioValue] = useState(props.defaultValue);
  return (
    <div>
      {props.radioSelect.map((item, index) => {
        return (
          <div key={`settingRadio_${index}`}>
            <input
              className={styles.radioButtonInputOne}
              type="radio"
              id={`radioButton_${props.allBtName}_${String(index)}`}
              value={item.value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.onChange(event.target.value);
                setRadioValue(event.target.value);
              }}
              name={`radioButton_${props.allBtName}`}
              checked={item.value === radioValue}
            />
            <label
              className={styles.oneRadioButton}
              htmlFor={`radioButton_${props.allBtName}_${String(index)}`}
            >
              {item.name}
            </label>
          </div>
        );
      })}
    </div>
  );
}
