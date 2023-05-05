import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import SearchBox from '../components/int/top/searchbox'
import { useEffect, useState } from 'react'
import WidArea from '@/components/int/bottom/widArea'
import Middle from '@/components/int/bottom/middle'
import { Clock, News, Trend, Weather } from '@/components/int/bottom/allWid'
import Settings from '@/components/int/bottom/settings'


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
      imgLink:"https://www.jtb.co.jp/smartphone/images/icon180.png",
      title:"JTB"
    },{
      link:"https://mail.google.com/",
      imgLink:"https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
      title:"Gmail"
    },{
      link:"https://chat.openai.com/",
      imgLink:"https://chat.openai.com/apple-touch-icon.png",
      title:"ChatGPT"
    },{
      link:"https://www.canva.com/",
      imgLink:"https://static.canva.com/static/images/favicon-1.ico",
      title:"Canva"
    },{
      link:"https://tocaly.com/",
      imgLink:"https://marketplacecontent.zoom.us/%2FM6sl8JOCTmqokExRFYODKg%2F7Rv0GMlZQhOf--R91hiA0w%2Fapp%2FhHuWlu1ZQymGxK_iQ1vslw%2FmdQUUL7PTJKlikT4bVn__Q.png",
      title:"Tocaly"
    }],
    newsSrc:[["nikkei","news"],["yomiuri","national"],["yomiuri","politics"],["yomiuri","world"],["yomiuri","sports"],["trafficnews","top"]]
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
        <title>峡緑 | KyouRyoku Portal</title>
        <meta name="description" content="峡緑(きょうりょく)ポータルは次世代の検索サイトです。これまでの検索サイトの欠点であったカスタマイズ性などを改善し、あなただけの検索サイトを作ります。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id={styles.top}>
        <div id={styles.icon}>
          <img src="/favicon.svg" alt="icon" />
          <div id={styles.sitetitleArea}>
            <p className={styles.Furigana}>KyouRyoku</p>
            <h1>峡緑</h1>
          </div>
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
          <News theme={settings.theme} src={settings.newsSrc}></News>
        </WidArea>
      </div>
      {/*設定の記述*/}
      <Settings></Settings>
    </div>
  )
}