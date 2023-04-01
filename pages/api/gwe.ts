import { NextApiRequest, NextApiResponse } from "next";

//天気情報を取ってくる
export default async function getWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const weatherJson = await fetch(
    "https://weather.tsukumijima.net/api/forecast/city/" + req.query.city
  )
    .then((res) => res.json())
    .then((gjson) => gjson.forecasts)
    .then((mjson) => {
      delete mjson[2];
      return mjson;
    })
    .then((mjson) => {
      //最終的に帰ってくるJson
      const newMyJson = {
        1: {
          wind: mjson[0].detail.wind,
          weather: mjson[0].telop,
          maxtemp: mjson[0].temperature.max.celsius,
          mintemp: mjson[0].temperature.min.celsius,
          chanceOfRain: "",
        },
        2: {
          wind: mjson[1].detail.wind,
          weather: mjson[1].telop,
          maxtemp: mjson[1].temperature.max.celsius,
          mintemp: mjson[1].temperature.min.celsius,
          chanceOfRain: "",
        },
      };
      const tcor = mjson[0].chanceOfRain;
      const chanceOfRainArray = [
        tcor.T06_12,
        tcor.T12_18,
        tcor.T18_24,
        mjson[1].chanceOfRain.T00_06,
      ];
      newMyJson[1].chanceOfRain =
        chanceOfRainArray[Math.floor(new Date().getHours() / 6)];
      return newMyJson;
    });
  res.status(200).json(weatherJson);
}
