import React, { useEffect, useState } from 'react'
import styles from '../../../styles/comp/searchbox.module.css'

type props={
    searchEngine:String,
    changeSearchEngine:Function
}

//検索ボックス
export default function searchbox(props:props){
    const se=props.searchEngine
    const tipsArr=["テスト用です。配列の中身を変更してください。"]

    interface Seuobj{
        [key: string]:string;
        google:string;
        bing:string;
        duckduckgo:string;
        baidu:string;
        yahoo:string;
        amazon:string;
        ask:string;
        ecosia:string;
        wolframalpha:string;
        youtube:string;
    }
    const searchEngineUrlJson:Seuobj={
        google:"https://www.google.com/search?q=",
        bing:"https://www.bing.com/search?q=",
        duckduckgo:"https://duckduckgo.com/?q=",
        baidu:"https://www.baidu.com/s?wd=",
        yahoo:"https://search.yahoo.co.jp/search?p=",
        amazon:"https://www.amazon.co.jp/s?k=",
        ask:"https://www.ask.jp/web?q=",
        ecosia:"https://www.ecosia.org/search?q=",
        wolframalpha:"https://www.wolframalpha.com/input?i=",
        youtube:"https://www.youtube.com/results?search_query="
    }

    const [search,setSearch]=useState("")

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        setSearch(e.target.value)
    }
    function submitEve(e:React.FormEvent<HTMLFormElement>){
        if(search==""){
            alert("検索欄に何も入力されていません。")
            e.preventDefault()
            return
        }
        e.preventDefault()
        setSearch("")
        //検索結果へ送信
        const newURL=searchEngineUrlJson[String(se)]+search
        window.open(newURL,"_blank")
    }

    //サジェストがクリックされたとき
    function suggestClick(word:String){
        setSearch("")
        //検索結果へ送信
        const newURL=searchEngineUrlJson[String(se)]+word
        window.open(newURL,"_blank")
    }

    const [suggestList,setSuggestList]=useState<String[]>([""])
    //サジェスト用
    useEffect(()=>{
        if(search==""){
            //サジェストリストの１つ目が空文字だった場合、サジェストを表示しない仕様のため、空配列ではなく、空文字を入れた配列をセットする。
            setSuggestList([""])
            return
        }
        const defaultFunction=async ()=>{
            const list=await (await JSON.parse(await (await fetch("/api/suggest?word="+search)).text())).wordList.split(",")
            setSuggestList(list)
        }
        defaultFunction()
    },[search])

    return (
        <div id={styles.topArea}>
            <form onSubmit={submitEve} id={styles.box}>
                <button type='button' onClick={()=>props.changeSearchEngine()}>
                    <img src={`/searchEngine/${se}.ico`} alt="" id={styles.sefaivcon} />
                </button>
                <input type="search" id={styles.form} placeholder={`ヒント: ${tipsArr[Math.floor(Math.random()*tipsArr.length)]}`} value={search} onChange={handleChange} autoComplete="off"/>
                <button type="submit">
                    <img src="int/search.svg" alt="検索" />
                </button>
            </form>
            <div id={styles.suggestArea} style={{display: suggestList[0]==""? "none":"block"}}>
                {
                    suggestList.map((oneElem)=>{
                        return (
                            <button type='button' key={oneElem.toString()} onClick={()=>suggestClick(oneElem)}>{oneElem}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}