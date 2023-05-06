import { useEffect, useRef, useState } from "react";
import WidBasic from "./widgets"
import styles from "../../../styles/comp/widgets.module.css"
import OneWeather from "./oneWeather";

type allWidType={
    theme:{ widgetsBack: string[]; }
}

export function Clock(props:allWidType){
    const [nowTime,setNowTime]=useState(new Date())

    useEffect(()=>{
        const interval=setInterval(()=>{
            setNowTime(new Date())
        },500)
        return ()=>clearInterval(interval)
    },[])

    return (
        <WidBasic theme={props.theme}>
            <div id={styles.clockChild}>
                <div id={styles.dateArea}>
                    <p id={styles.clDate}>{`${String(nowTime.getFullYear())}年 (令和${String(nowTime.getFullYear()-2018)}年)`}</p>
                    <p>{`${String(nowTime.getMonth()+1)}月${String(nowTime.getDate())}日(${["日","月","火","水","木","金","土"][nowTime.getDay()]})`}</p>
                </div>
                <div id={styles.timeArea}>
                    <p id={styles.clTime}>{`${String(nowTime.getHours()).padStart(2,"0")}:${String(nowTime.getMinutes()).padStart(2,"0")}`}</p>
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
        <WidBasic title={`${weatherJson.location}の天気`} theme={props.theme} topSide={(<a onClick={()=>{alert("まだ実装されていないボタンを押すな。")}}>地点を変更</a>)}>
            <OneWeather date={`${today.getMonth()}月${today.getDate()}日`} weatherJson={weatherJson[1]}></OneWeather>
            <OneWeather date={`${tommorow.getMonth()}月${tommorow.getDate()}日`} weatherJson={weatherJson[2]}></OneWeather>
        </WidBasic>
    )
}

export function Trend(props:allWidType){
    const [trendArr,setTrendArr]=useState<String[]>(["--"])

    useEffect(()=>{
        fetch("/api/trend").then(res=>res.json()).then(json=>{
            setTrendArr(json.data)
        })
    },[])

    return (
        <WidBasic title="トレンド" theme={props.theme}>
            {
                trendArr.map(onePhrase=>(<a href={`https://www.google.com/search?q=${onePhrase}`} rel="nofollow noopener noreferrer" target="_blank" className={styles.trendA}>{onePhrase}</a>))
            }
        </WidBasic>
    )
}

type newsType=allWidType&{
    src:String[][]
}

export function News(props:newsType){
    const [allNews,setAllNews]=useState([{
        title:"ニュース",
        body:[{title:"--",link:""}]
    }])
    const [nowNewsNum,setNowNewsNum]=useState(0)

    useEffect(()=>{
        const fetchNews=async()=>{
            const srcStr=props.src.map(val=>val.join("-")).join(",")
            await fetch(`/api/news?src=${srcStr}`)
                .then((res)=>res.json())
                .then(json=>json.list)
                .then(list=>{setAllNews(list)})
        }
        fetchNews()
    },[])

    useEffect(()=>{
        const interval=setInterval(()=>{
            console.log("ok")
            let nextNum=nowNewsNum+1
            if(nextNum==allNews.length)nextNum=0
            setNowNewsNum(nextNum)
        },10000)
        return ()=>clearInterval(interval)
    },[nowNewsNum,allNews])

    const topSideButton=(
        <div id={styles.tsButton}>
            <button className={styles.newsButton} onClick={()=>{
                let nextNum=nowNewsNum-1
                if(nextNum==-1)nextNum=allNews.length-1
                setNowNewsNum(nextNum)
            }}>
                <img src="/int/back.svg" alt="戻る"/>
            </button>
            <button className={styles.newsButton} onClick={()=>{
                let nextNum=nowNewsNum+1
                if(nextNum==allNews.length)nextNum=0
                setNowNewsNum(nextNum)
            }}>
                <img src="/int/forward.svg" alt="進む"/>
            </button>
        </div>
    )

    return (
        <WidBasic title={allNews[nowNewsNum].title} theme={props.theme} topSide={topSideButton}>
            <div id={styles.newsArea}>
                {
                    allNews[nowNewsNum].body.map(oneElem=>{
                        return (
                            <a href={oneElem.link} target="_blank" rel="noopener noreferrer" key={oneElem.link} className={styles.newsA} title={oneElem.title}>{oneElem.title}</a>
                        )
                    })
                }
            </div>
        </WidBasic>
    )
}