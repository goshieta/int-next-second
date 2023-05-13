import styles from "../../../styles/comp/setComp.module.css"

type radioType={
    allBtName:string,
    radioSelect:{
        value:string,
        name:string
    }[],
    onChange:(nowSe:String) => void
}
/*設定用コンポーネントの集まり*/
export function SettingsRadios(props:radioType){
    return (
        <div>
            {
                props.radioSelect.map((item,index)=>{
                    return (
                        <>
                            <input className={styles.radioButtonInputOne} type="radio" id={`radioButton_${props.allBtName}_${String(index)}`} value={item.value} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{props.onChange(event.target.value)}} name={`radioButton_${props.allBtName}`}/>
                            <label className={styles.oneRadioButton} key={index} htmlFor={`radioButton_${props.allBtName}_${String(index)}`}>
                                {item.name}
                            </label>
                        </>
                    )
                })
            }
        </div>
    )
}