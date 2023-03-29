import { useEffect, useRef, useState } from "react";
import WidBasic from "./widgets"
import styles from "../../../styles/comp/widgets.module.css"

type allWidType={
    theme:{ widgetsBack: string[]; }
}

export function Clock(props:allWidType){
    const [nowTime,setNowTime]=useState(new Date())

    setInterval(()=>{
        setNowTime(new Date())
    },500)

    const timeCanvas=useRef(null)
    useEffect(()=>{
        const canvas:any=timeCanvas.current
        const ctx:CanvasRenderingContext2D=canvas.getContext('2d')
        //ここにcanvasの処理を記述
    },[nowTime])

    return (
        <WidBasic title="時計" theme={props.theme}>
            <div id={styles.clockChild}>
                <div id={styles.timeArea}>
                    <canvas width="100" height="100" ref={timeCanvas}></canvas>
                    <p suppressHydrationWarning={true} id={styles.clTime}>{`${String(nowTime.getHours()).padStart(2,"0")}:${String(nowTime.getMinutes()).padStart(2,"0")}`}</p>
                </div>
                <div id={styles.dateArea}>
                    <p suppressHydrationWarning={true} id={styles.clDate}>{`${String(nowTime.getFullYear())}年${String(nowTime.getMonth()+1)}月${String(nowTime.getDate())}日`}</p>
                </div>
            </div>
        </WidBasic>
    )
}

export function Weather(props:allWidType){
    return (
        <WidBasic title="天気" theme={props.theme}>
            test
        </WidBasic>
    )
}

export function Trend(props:allWidType){
    return (
        <WidBasic title="トレンド" theme={props.theme}>test</WidBasic>
    )
}

export function News(props:allWidType){
    return (
        <WidBasic title="ニュース" theme={props.theme}>test</WidBasic>
    )
}