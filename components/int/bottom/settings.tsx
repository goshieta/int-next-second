import { ReactNode , useState} from "react"
import styles from "../../../styles/comp/setting.module.css"
import { SettingsRadios } from "./settingComp"

type setPropsType={
    state:String|undefined,
    changeSetState:(newState:String|undefined)=>void,
    settingJson:{
        theme:{
            widgetsBack:String[],
            middleBack:String[]
        },
        search:{
            engine:String
        },
        weather:{
            point:String,
        },
        news:{
            src:String[][]
        },
        mySite:{
            array:{
                link:String,
                imgLink:String,
                title:String
            }[]
        }
    }
}


export default function Settings(props:setPropsType){
    const sideBarInfo=[
        {
            title:"top",
            name:"トップ"
        },{
            title:"theme",
            name:"テーマ"
        },{
            title:"search",
            name:"検索"
        },{
            title:"weather",
            name:"天気"
        },{
            title:"news",
            name:"ニュース"
        },{
            title:"mySite",
            name:"マイサイト"
        }
    ]

    const [settingJson,setSettingJson]=useState(props.settingJson)

    const searchEngineList=[{
        name:"Google",
        value:"google"
    },{
        name:"Bing",
        value:"bing"
    },{
        name:"Yahoo",
        value:"yahoo"
    },{
        name:"DuckDuckGo",
        value:"duckduckgo"
    },{
        name:"Ecosia",
        value:"ecosia"
    },{
        name:"Baidu",
        value:"baidu"
    },{
        name:"Ask",
        value:"ask"
    },{
        name:"Amazon",
        value:"amazon"
    },{
        name:"Wolframalpha",
        value:"wolframalpha"
    },{
        name:"YouTube",
        value:"youtube"
    }]

    return (
        <div style={{display: props.state==undefined? "none":"flex"}} id={styles.backShadow}>
            <div id={styles.settingWindow}>
                <div id={styles.bar}>
                    <div id={styles.windowtitleArea}>
                        <p>設定</p>
                    </div>
                    <div id={styles.applybuttonArea}>
                        <input type="button" value="×" id={styles.cancelB} onClick={()=>{props.changeSetState(undefined)}}/>
                        <input type="button" value="✓" id={styles.applyB}/>
                    </div>
                </div>
                <div id={styles.body}>
                    <div id={styles.sideBar}>
                        {
                            sideBarInfo.map((item,index)=>{
                                return <OneSidebarTitle key={index} title={item.title} nowSetState={props.state} onClick={()=>{props.changeSetState(item.title)}}>{item.name}</OneSidebarTitle>
                            })
                        }
                    </div>
                    <div id={styles.setDisplay}>
                        <OneSettingPage title="top" nowSetState={props.state}>
                            <h3>設定へようこそ</h3>
                            <p>カスタマイズ性の高さは峡緑（きょうりょく）の特徴の一つです</p>
                            <br />
                            <div id={styles.topDesc}>
                                <p>設定の仕方がわからない場合は<a href="">設定のヘルプ</a>へ</p>
                                <p>このような設定を追加してほしいなどの要望は<a href="">報告・提案</a>へ</p>
                                <p>右のサイドバーから項目を選んであなただけののポータルサイトを作りましょう！</p>
                            </div>
                        </OneSettingPage>
                        <OneSettingPage title="theme" nowSetState={props.state}>テーマ</OneSettingPage>
                        <OneSettingPage title="search" nowSetState={props.state}>
                            <h3>検索の設定</h3>
                            <div className={styles.oneSettingState}>
                                <SettingOneTitle>検索エンジン</SettingOneTitle>
                                <SettingsRadios radioSelect={searchEngineList} onChange={(nowSel:String)=>{console.log(nowSel)}} allBtName="searchEngine"></SettingsRadios>
                            </div>
                        </OneSettingPage>
                        <OneSettingPage title="weather" nowSetState={props.state}>天気</OneSettingPage>
                        <OneSettingPage title="news" nowSetState={props.state}>ニュース</OneSettingPage>
                        <OneSettingPage title="mySite" nowSetState={props.state}>マイサイト</OneSettingPage>
                    </div>
                </div>
            </div>
        </div>
    )
}

type ostPropsType={
    children:ReactNode,
    title:String,
    nowSetState:String|undefined,
    onClick:Function
}
function OneSidebarTitle(props:ostPropsType){
    return (
        <p className={`${props.title==props.nowSetState? styles.nowSelect:styles.noneSelect} ${styles.sidebarTitle}`} onClick={()=>{props.onClick()}}>{props.children}</p>
    )
}

type ospPropsType={
    children:ReactNode,
    title:String,
    nowSetState:String|undefined
}
function OneSettingPage(props:ospPropsType){
    return (
        <div style={{display: props.nowSetState==props.title? "block":"none"}}>{props.children}</div>
    )
}

type sotType={
    children:ReactNode,
}
function SettingOneTitle(props:sotType){
    return (
        <p className={styles.settingOneTitle}>{props.children}</p>
    )
}