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
      widgetsBack:["rgba(255, 255, 255, 0.8)","rgba(255, 255, 255, 0.8)"],
      middleBack:["rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"]
    },
    weatherPoint:"340010",
    mySite:[{
      link:"https://maps.google.com",
      imgLink:"https://www.google.com/images/branding/product/ico/maps15_bnuw3a_32dp.ico",
      title:"Google map"
    },{
      link:"https://amazon.co.jp",
      imgLink:"https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png",
      title:"amazon"
    },{
      link:"https://youtube.com",
      imgLink:"https://play-lh.googleusercontent.com/lMoItBgdPPVDJsNOVtP26EKHePkwBg-PkuY9NOrc-fumRtTFP4XhpUNk_22syN4Datc=s96",
      title:"Youtube"
    },{
      link:"https://drive.google.com/drive/my-drive",
      imgLink:"https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
      title:"Google Drive"
    },{
      link:"https://www.office.com/",
      imgLink:"https://res.cdn.office.net/officehub/images/content/images/favicon_m365-67350a08e8.ico",
      title:"Microsoft 365"
    },{
      link:"https://www.deepl.com/ja/translator",
      imgLink:"https://static.deepl.com/img/logo/DeepL_Logo_darkBlue_v2.svg",
      title:"DeepL翻訳"
    },{
      link:"https://www.jtb.co.jp/",
      imgLink:"https://play-lh.googleusercontent.com/isHtY3jIseSHCsWHp-HxTqSLTQgjDkoewEcyt4_SoSbMcHtz24m98J1KEGD2bzpk5QY",
      title:"JTB"
    }]
  }
  const [settings,setSettings]=useState(defaultJson)
  useEffect(()=>{
    if(localStorage.getItem('settings')==null)localStorage.setItem("settings",JSON.stringify(defaultJson))
    setSettings(JSON.parse(localStorage.getItem("settings")||JSON.stringify(defaultJson)))
    console.log(settings)
  },[])

  return (
    <div style={{backgroundImage:`url("/back/12.jpg")`}} id={styles.parent}>
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
        <Middle back={settings.theme.middleBack} mySite={settings.mySite}></Middle>
        <WidArea>
          <Trend theme={settings.theme}></Trend>
          <News theme={settings.theme}></News>
        </WidArea>
      </div>
    </div>
  )
}