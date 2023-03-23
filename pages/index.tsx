import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import SearchBox from '../components/int/top/searchbox'
import { useEffect, useState } from 'react'


export default function Home() {

  //設定ファイルを読み込み
  //デフォルトのJson
  const defaultJson={
    searchEngine:"google"
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
          <img src="/favicon.ico" alt="" />
          <h1>Inforde</h1>
        </div>
        <SearchBox searchEngine={settings.searchEngine}></SearchBox>
      </div>
      <div id={styles.bottom}></div>
    </div>
  )
}