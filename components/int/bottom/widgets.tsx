import { ReactNode } from "react"
import styles from "../../../styles/comp/widBasic.module.css"

type widBasicType={
    title:String
}

//基本ウィジェット
export default function Widgets(props:widBasicType){
    return (
        <div id={styles.wid}>
            <WidTitle>{props.title}</WidTitle>
        </div>
    )
}

type widTitleType={
    children:ReactNode
}

export function WidTitle(props:widTitleType){
    return (
        <p>{props.children}</p>
    )
}