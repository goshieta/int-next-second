import { ReactNode, useState } from "react";
import styles from "@/styles/comp/setting.module.css";
import { SettingsRadios } from "./settingComp";
import settingPageJson from "./settingView.json";
import parse, {
  domToReact,
  attributesToProps,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";

type setPropsType = {
  state: String | undefined;
  changeSetState: (newState: String | undefined) => void;
  settingJson: {
    theme: {
      widgetsBack: String[];
      middleBack: String[];
    };
    search: {
      engine: String;
    };
    weather: {
      point: String;
    };
    news: {
      src: String[][];
    };
    mySite: {
      array: {
        link: String;
        imgLink: String;
        title: String;
      }[];
    };
  };
};

export default function Settings(props: setPropsType) {
  //HTML-React-Parser Options
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      const typedDomNode = domNode as Element;

      if (typedDomNode.attribs && typedDomNode.name === "a") {
        return (
          <a
            {...attributesToProps(typedDomNode.attribs)}
            className="underline text-primary-500"
            target="_blank"
          >
            {typedDomNode.children &&
              domToReact(typedDomNode.children, options)}
          </a>
        );
      }

      return false;
    },
  };

  const [settingJson, setSettingJson] = useState(props.settingJson);

  return (
    <div
      style={{ display: props.state == undefined ? "none" : "flex" }}
      id={styles.backShadow}
    >
      <div id={styles.settingWindow}>
        <div id={styles.bar}>
          <div id={styles.windowtitleArea}>
            <p>設定</p>
          </div>
          <div id={styles.applybuttonArea}>
            <input
              type="button"
              value="キャンセル"
              id={styles.cancelB}
              onClick={() => {
                props.changeSetState(undefined);
              }}
            />
            <input type="button" value="決定" id={styles.applyB} />
          </div>
        </div>
        <div id={styles.body}>
          <div id={styles.sideBar}>
            {settingPageJson.map((item, index) => {
              return (
                <OneSidebarTitle
                  key={index}
                  title={item.title}
                  nowSetState={props.state}
                  onClick={() => {
                    props.changeSetState(item.title);
                  }}
                >
                  {item.name}
                </OneSidebarTitle>
              );
            })}
          </div>
          <div id={styles.setDisplay}>
            {/*この中をすべてsettingView.jsonとして作成する。 */}
            {settingPageJson.map((onePage, index) => {
              return (
                <OneSettingPage
                  key={`oneSettingPage_${onePage.title}`}
                  title={onePage.title}
                  nowSetState={props.state}
                >
                  <h3>{onePage.h3Title}</h3>
                  {onePage.body?.map((pageOnePara) => {
                    const renderJSX = [];
                    const paratitle =
                      pageOnePara.title == "none" ? (
                        <></>
                      ) : (
                        <SettingOneTitle>{pageOnePara.title}</SettingOneTitle>
                      );
                    let body: string | JSX.Element | JSX.Element[] = <></>;

                    //bodyの中身をif文で制御
                    if (
                      pageOnePara.type == "html" &&
                      typeof pageOnePara.value == "string"
                    ) {
                      let test = parse("<p>Google!</p>", options);
                      body = parse(pageOnePara.value, options);
                    }

                    renderJSX.push(paratitle);
                    renderJSX.push(body);
                    return renderJSX;
                  })}
                </OneSettingPage>
              );
            })}
            {/*<OneSettingPage title="top" nowSetState={props.state}>
              <h3>設定へようこそ</h3>
              <p>カスタマイズ性の高さは峡緑（きょうりょく）の特徴の一つです</p>
              <br />
              <div id={styles.topDesc}>
                <p>
                  設定の仕方がわからない場合は<a href="">設定のヘルプ</a>へ
                </p>
                <p>
                  このような設定を追加してほしいなどの要望は
                  <a href="">報告・提案</a>へ
                </p>
                <p>
                  右のサイドバーから項目を選んであなただけののポータルサイトを作りましょう！
                </p>
              </div>
            </OneSettingPage>
            <OneSettingPage title="theme" nowSetState={props.state}>
              テーマ
            </OneSettingPage>
            <OneSettingPage title="search" nowSetState={props.state}>
              <h3>検索の設定</h3>
              <div className={styles.oneSettingState}>
                <SettingOneTitle>検索エンジン</SettingOneTitle>
                <SettingsRadios
                  radioSelect={searchEngineList}
                  onChange={(nowSel: String) => {
                    console.log(nowSel);
                  }}
                  allBtName="searchEngine"
                ></SettingsRadios>
              </div>
            </OneSettingPage>
            <OneSettingPage title="weather" nowSetState={props.state}>
              天気
            </OneSettingPage>
            <OneSettingPage title="news" nowSetState={props.state}>
              ニュース
            </OneSettingPage>
            <OneSettingPage title="mySite" nowSetState={props.state}>
              マイサイト
            </OneSettingPage>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

type ostPropsType = {
  children: ReactNode;
  title: String;
  nowSetState: String | undefined;
  onClick: Function;
};
function OneSidebarTitle(props: ostPropsType) {
  return (
    <p
      className={`${
        props.title == props.nowSetState ? styles.nowSelect : styles.noneSelect
      } ${styles.sidebarTitle}`}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.children}
    </p>
  );
}

type ospPropsType = {
  children: ReactNode;
  title: String;
  nowSetState: String | undefined;
};
function OneSettingPage(props: ospPropsType) {
  return (
    <div
      style={{ display: props.nowSetState == props.title ? "block" : "none" }}
    >
      {props.children}
    </div>
  );
}

type sotType = {
  children: ReactNode;
};
function SettingOneTitle(props: sotType) {
  return <p className={styles.settingOneTitle}>{props.children}</p>;
}
