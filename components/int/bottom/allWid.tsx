import { useEffect, useRef, useState } from "react";
import WidBasic from "./widgets"
import styles from "../../../styles/comp/widgets.module.css"
import OneWeather from "./oneWeather";

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
        const radious=(nowTime.getHours()*60+nowTime.getMinutes())/1440*360
        //ここにcanvasの処理を記述
        ctx.clearRect(0,0,100,100)
        ctx.beginPath()
        ctx.arc(50,50,47,0,360*(Math.PI/180),false)
        ctx.strokeStyle="#bbbbbd"
        ctx.lineWidth=3
        ctx.stroke()
        ctx.fillStyle="rgba(255, 255, 255, 0.5)"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.arc(50,50,47,-90*(Math.PI/180),(radious-90)*(Math.PI/180),false)
        let stColor="gray"
        if(0<=nowTime.getHours()&&nowTime.getHours()<=5)stColor="black"
        else if(6<=nowTime.getHours()&&nowTime.getHours()<=6)stColor="#9003fc"
        else if(7<=nowTime.getHours()&&nowTime.getHours()<=8)stColor="#fc037f"
        else if(9<=nowTime.getHours()&&nowTime.getHours()<=16)stColor="green"
        else if(17<=nowTime.getHours()&&nowTime.getHours()<=20)stColor="#ff6a00"
        else if(21<=nowTime.getHours()&&nowTime.getHours()<=24)stColor="black"
        ctx.strokeStyle=stColor
        ctx.lineWidth=3
        ctx.stroke()
        ctx.closePath()
    },[nowTime])

    return (
        <WidBasic title="時計" theme={props.theme}>
            <div id={styles.clockChild}>
                <div id={styles.timeArea}>
                    <canvas width="100" height="100" ref={timeCanvas}></canvas>
                    <p suppressHydrationWarning={true} id={styles.clTime}>{`${String(nowTime.getHours()).padStart(2,"0")}:${String(nowTime.getMinutes()).padStart(2,"0")}`}</p>
                </div>
                <div id={styles.dateArea}>
                    <div id={styles.daCenter}>
                        <p suppressHydrationWarning={true} id={styles.clDate}>{`${String(nowTime.getFullYear())}年 (令和${String(nowTime.getFullYear()-2018)}年)`}</p>
                        <p suppressHydrationWarning={true}>{`${String(nowTime.getMonth()+1)}月${String(nowTime.getDate())}日(${["日","月","火","水","木","金","土"][nowTime.getDay()]})`}</p>
                    </div>
                </div>
            </div>
        </WidBasic>
    )
}

type weatherWidType=allWidType&{
    point:String
}

export function Weather(props:weatherWidType){
    const [weatherJson,setWeatherJson]=useState({
        location:"--",
        1: {
            wind:"--",
            weather: "",
            maxtemp: 0,
            mintemp: 0,
            chanceOfRain: "--",
        },
        2: {
            wind:"--",
            weather: "",
            maxtemp: 0,
            mintemp: 0,
        },
    })
    useEffect(()=>{
        const fetchwj=async ()=>{
            const returnJson:any=await fetch("/api/gwe?city="+props.point).then(res=>res.json())
            setWeatherJson(returnJson)
        }
        fetchwj()
    },[])
    const today=new Date()
    const tommorow=new Date()
    tommorow.setDate(today.getDate()+1)

    return (
        <WidBasic title={`${weatherJson.location}の天気`} theme={props.theme}>
            <OneWeather date={`${today.getMonth()}月${today.getDate()}日`} weatherJson={weatherJson[1]}></OneWeather>
            <OneWeather date={`${tommorow.getMonth()}月${tommorow.getDate()}日`} weatherJson={weatherJson[2]}></OneWeather>
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