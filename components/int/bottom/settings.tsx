import styles from "../../../styles/comp/setting.module.css"

type setPropsType={
    state:String|undefined
}

export default function Settings(props:setPropsType){
    return (
        <div style={{display: props.state==undefined? "none":"block"}} id={styles.backShadow}>
            <div id={styles.settingWindow}></div>
        </div>
    )
}