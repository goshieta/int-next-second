import Head from "next/head";
import styles from "@/styles/Home.module.css";
import SearchBox from "../components/int/top/searchbox";
import { useEffect, useState } from "react";
import WidArea from "@/components/int/bottom/widArea";
import Middle from "@/components/int/bottom/middle";
import { Clock, News, Trend, Weather } from "@/components/int/bottom/allWid";
import Settings, {
  settingJsonType,
} from "@/components/int/bottom/setting/settings";
import defaultJson from "@/components/int/bottom/setting/default.json";

export default function Home() {
  //設定ファイルを読み込み
  const [settings, setSettings] = useState<settingJsonType>(defaultJson);
  useEffect(() => {
    if (localStorage.getItem("settings") == null)
      localStorage.setItem("settings", JSON.stringify(defaultJson));
    setSettings(
      JSON.parse(
        localStorage.getItem("settings") || JSON.stringify(defaultJson)
      )
    );
  }, []);

  const [settState, setsettState] = useState<String | undefined>(undefined);

  return (
    <div style={{ backgroundImage: `url("/back/12.jpg")` }} id={styles.parent}>
      <Head>
        <title>峡緑 | KyouRyoku Portal</title>
        <meta
          name="description"
          content="峡緑(きょうりょく)ポータルは次世代の検索サイトです。これまでの検索サイトの欠点であったカスタマイズ性などを改善し、あなただけの検索サイトを作ります。"
        />
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
        <SearchBox
          searchEngine={settings.search.engine}
          changeSearchEngine={() => {
            setsettState("search");
          }}
        ></SearchBox>
        <div id={styles.buttonArea}>
          <button
            onClick={() => {
              setsettState("top");
            }}
          >
            <img src="/icon/settings.svg" alt="設定" />
          </button>
          <button>
            <img src="/icon/info.svg" alt="アバウト" />
          </button>
          <button>
            <img src="/icon/help.svg" alt="ヘルプ" />
          </button>
        </div>
      </div>
      <div id={styles.bottom}>
        <WidArea>
          <Clock theme={settings.theme}></Clock>
          <Weather
            theme={settings.theme}
            point={settings.weather.point}
            weatherSet={() => {
              setsettState("weather");
            }}
          ></Weather>
        </WidArea>
        <Middle
          back={settings.theme.middleBack}
          mySite={settings.mySite.array}
        ></Middle>
        <WidArea>
          <Trend theme={settings.theme}></Trend>
          <News theme={settings.theme} src={settings.news.src}></News>
        </WidArea>
      </div>
      {/*設定の記述*/}
      <Settings
        state={settState}
        changeSetState={(newState) => {
          setsettState(newState);
        }}
        changeSetting={(newSetting) => {
          setSettings(newSetting);
        }}
        settingJson={settings}
      ></Settings>
    </div>
  );
}
