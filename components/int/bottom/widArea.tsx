import { ReactNode } from "react"
import styles from "../../../styles/comp/widBasic.module.css"

type widAreaType={
    children:ReactNode
}

export default function WidArea(props:widAreaType){
    return (
        <div className={styles.Area}>{props.children}</div>
    )
}