import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";

/*RSS愛好会を使用(https://rss.wor.jp/)
日経 - nikkei
ロイター - reuters
ブルームバーグ - bloomberg
産経新聞 - sankei
読売新聞 - yomiuri
47news全国 - ynnews
47news地域 - ynlocalnews
乗り物ニュース - trafficnews
オリコンニュース - oricon
*/

export default async function getNews(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const srcStr: String =
    req.query.src == undefined ? "nikkei-news" : String(req.query.src);
  const getrssList = srcStr.split(",");
  const rssDetailList = getrssList.map((oneArt) => oneArt.split("-"));
  let returnList = await Promise.all(
    rssDetailList.map(async (defArt) => {
      let artTitleArr = await fetch(
        `https://assets.wor.jp/rss/rdf/${defArt[0]}/${defArt[1]}.rdf`
      )
        .then((rss) => rss.text())
        .then((text) => parse(text))
        .then((xml) => {
          const title = xml
            .querySelector("channel")
            ?.querySelector("title")?.innerHTML;
          const bodyList = xml.querySelectorAll("item").map((oneItem) => {
            return {
              title: oneItem.querySelector("title")?.innerHTML,
              link: oneItem.getAttribute("rdf:about"),
            };
          });
          bodyList.length = 6;
          return {
            title: title,
            body: bodyList,
          };
        });
      return artTitleArr;
    })
  );
  res.status(200).json({ list: returnList });
}
