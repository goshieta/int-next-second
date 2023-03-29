import { ReactNode } from "react"
import styles from "../../../styles/comp/widBasic.module.css"

type widBasicType={
    title:String
    theme:{ widgetsBack: string[]; }
    children:ReactNode
}

//基本ウィジェット
export default function Widgets(props:widBasicType){
    return (
        <div id={styles.wid} style={{background: `linear-gradient(to right, ${props.theme?.widgetsBack[0]}, ${props.theme?.widgetsBack[0]});}`}}>
            <WidTitle>{props.title}</WidTitle>
            <div className={styles.childArea}>{props.children}</div>
        </div>
    )
}

type widTitleType={
    children:ReactNode
}

export function WidTitle(props:widTitleType){
    return (
        <p className={styles.WidTitle}>{props.children}</p>
    )
}