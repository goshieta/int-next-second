import styles from "../../../styles/comp/widBasic.module.css"

//基本ウィジェット
export default function Widgets(){
    return (
        <div id={styles.wid}>
            <WidTitle title="ああ"></WidTitle>
        </div>
    )
}

type widTitleType={
    title:String
}

export function WidTitle(props:widTitleType){
    return (
        <p>{props.title}</p>
    )
}