import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";

export default async function trend(req: NextApiRequest, res: NextApiResponse) {
  const dataArr = await fetch(
    "https://trends.google.co.jp/trends/trendingsearches/daily/rss?geo=JP"
  )
    .then((res) => res.text())
    .then((txt) => parse(txt))
    .then((xml) => {
      return xml.querySelectorAll("title").map((oEl) => oEl.innerHTML);
    });
  dataArr.splice(0, 1);
  dataArr.length = 4;
  res.status(200).json({ data: dataArr });
}
