import { ReactNode } from "react"
import styles from "../../../styles/comp/setting.module.css"

type setPropsType={
    state:String|undefined,
    changeSetState:(newState:String|undefined)=>void
}

export default function Settings(props:setPropsType){
    return (
        <div style={{display: props.state==undefined? "none":"flex"}} id={styles.backShadow}>
            <div id={styles.settingWindow}>
                <div id={styles.bar}>
                    <div id={styles.windowtitleArea}>
                        <p>設定</p>
                    </div>
                    <div id={styles.applybuttonArea}>
                        <input type="button" value="キャンセル" id={styles.cancelB} onClick={()=>{props.changeSetState(undefined)}}/>
                        <input type="button" value="適用" id={styles.applyB}/>
                    </div>
                </div>
                <div id={styles.body}>
                    <div id={styles.sideBar}>
                        <OneSidebarTitle title="top" nowSetState={props.state}>トップ</OneSidebarTitle>
                        <OneSidebarTitle title="theme" nowSetState={props.state}>テーマ</OneSidebarTitle>
                        <OneSidebarTitle title="search" nowSetState={props.state}>検索</OneSidebarTitle>
                        <OneSidebarTitle title="weather" nowSetState={props.state}>天気</OneSidebarTitle>
                        <OneSidebarTitle title="news" nowSetState={props.state}>ニュース</OneSidebarTitle>
                        <OneSidebarTitle title="mySite" nowSetState={props.state}>マイサイト</OneSidebarTitle>
                    </div>
                    <div id={styles.setDisplay}>
                        <OneSettingPage title="top" nowSetState={props.state}>トップ</OneSettingPage>
                        <OneSettingPage title="theme" nowSetState={props.state}>テーマ</OneSettingPage>
                        <OneSettingPage title="search" nowSetState={props.state}>検索</OneSettingPage>
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
    nowSetState:String|undefined
}
function OneSidebarTitle(props:ostPropsType){
    return (
        <p className={`${props.title==props.nowSetState? styles.nowSelect:styles.noneSelect}`}>{props.children}</p>
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