import { NextApiRequest, NextApiResponse } from "next";
import { parse } from 'node-html-parser';

export default async function postsuggest(req:NextApiRequest,res:NextApiResponse){
    const headers = new Headers({
        "Content-Type": "text/plain; charset=UTF-8"
    });

    const resXML=await fetch("http://www.google.com/complete/search?hl=ja&output=toolbar&q="+req.query.word,{
        method: "GET",
        headers: headers
    }).then(res=>res.text())
    const root=parse(resXML)
    const returnArray=root.querySelectorAll("suggestion").map((tag)=>tag.getAttribute("data"))
    const returnString=returnArray.join(",")

    res.status(200).send(JSON.stringify({wordList:returnString,test:"おちんちん"}, null, 2))
}