import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";

//Googleのapiから直接(en)
export default async function postsuggest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resXML = await fetch(
    "http://www.google.com/complete/search?hl=en&output=toolbar&q=" +
      req.query.word
  ).then((res) => res.text());
  const root = parse(resXML);
  const returnArray = root
    .querySelectorAll("suggestion")
    .map((tag) => tag.getAttribute("data"));
  const returnString = returnArray.join(",");

  res.status(200).send(JSON.stringify({ wordList: returnString }, null, 2));
}
