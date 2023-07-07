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
                      body = parse(pageOnePara.value, options);
                    } else if (
                      pageOnePara.type == "radio" &&
                      typeof pageOnePara.value == "object"
                    ) {
                      body = (
                        <SettingsRadios
                          radioSelect={pageOnePara.value}
                          onChange={(nowSel: String) => {
                            console.log(nowSel);
                          }}
                          allBtName={pageOnePara.title}
                        ></SettingsRadios>
                      );
                    }

                    renderJSX.push(paratitle);
                    renderJSX.push(body);
                    return renderJSX;
                  })}
                </OneSettingPage>
              );
            })}
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
