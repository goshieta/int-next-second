import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import SearchBox from '../components/int/top/searchbox'
import { useEffect, useState } from 'react'
import WidArea from '@/components/int/bottom/widArea'
import Middle from '@/components/int/bottom/middle'
import { Clock, News, Trend, Weather } from '@/components/int/bottom/allWid'


export default function Home() {

  //設定ファイルを読み込み
  //デフォルトのJson
  const defaultJson={
    searchEngine:"google",
    theme:{
      widgetsBack:["rgba(255, 255, 255, 0.7)","rgba(255, 255, 255, 0.7)"]
    },
    weatherPoint:"340010"
  }
  const [settings,setSettings]=useState(defaultJson)
  useEffect(()=>{
    if(localStorage.getItem('settings')==null)localStorage.setItem("settings",JSON.stringify(defaultJson))
    setSettings(JSON.parse(localStorage.getItem("settings")||JSON.stringify(defaultJson)))
    console.log(settings)
  },[])

  return (
    <div style={{backgroundImage:`url("/back/1.jpg")`}} id={styles.parent}>
      <Head>
        <title>Inforde Top</title>
        <meta name="description" content="Inforde Topは次世代の検索サイトです。これまでの検索サイトの欠点であったカスタマイズ性などを改善し、あなただけの検索サイトを作ります。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id={styles.top}>
        <div id={styles.icon}>
          <img src="/favicon.ico" alt="Inf" />
          <h1>orde</h1>
        </div>
        <SearchBox searchEngine={settings.searchEngine}></SearchBox>
      </div>
      <div id={styles.bottom}>
        <WidArea>
          <Clock theme={settings.theme}></Clock>
          <Weather theme={settings.theme} point={settings.weatherPoint}></Weather>
        </WidArea>
        <Middle></Middle>
        <WidArea>
          <Trend theme={settings.theme}></Trend>
          <News theme={settings.theme}></News>
        </WidArea>
      </div>
    </div>
  )
}