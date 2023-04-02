import styles from "../../../styles/comp/weather.module.css"

type owtype={
    date:String,
    weatherJson:{
        wind:String,
        weather: String,
        maxtemp: Number,
        mintemp: Number,
        chanceOfRain?:String
    }
}

export default function OneWeather(props:owtype){
    //画像用の天気文字列を作成する
    const weather_img_arr=["晴","曇","雨","雪"]
    let weatherString=""
    weather_img_arr.map((value)=>{
        if(props.weatherJson.weather.indexOf(value)!==-1){
            weatherString+=value
        }
    })
    weatherString=weatherString.substring(0, 2)
    console.log(props.weatherJson)
    
    return (
        <div id={styles.parent}>
            <div id={styles.flexParent}>
                <div id={styles.imgArea}>
                    <p className={styles.weatherDate}>{props.date}</p>
                    <img src={`/weather/${weatherString}.png`} alt={String(props.weatherJson.weather)} width="70" height="70" />
                </div>
                <div id={styles.strArea}>
                    <div className={styles.oneStr}>
                        <p className={styles.oneStrTitle}>風</p>
                        <p className={styles.oneStrBody}>{props.weatherJson.wind.replace(/．/g,".").replace(/\s+/g,' ').replace(/(?:海上)(.*)/,"").replace("海上","")}</p>
                    </div>
                    <div className={styles.oneStr} style={{display: props.weatherJson.maxtemp==null? "none":"flex"}}>
                        <p className={styles.oneStrTitle}>最高気温</p>
                        <p className={styles.oneStrBody}>{String(props.weatherJson.maxtemp)}度</p>
                    </div>
                    <div className={styles.oneStr} style={{display: props.weatherJson.mintemp==null? "none":"flex"}}>
                        <p className={styles.oneStrTitle}>最低気温</p>
                        <p className={styles.oneStrBody}>{String(props.weatherJson.mintemp)}度</p>
                    </div>
                    <div className={styles.oneStr} style={{display: props.weatherJson.chanceOfRain==""? "none":"flex"}}>
                        <p className={styles.oneStrTitle}>降水確率</p>
                        <p className={styles.oneStrBody}>{String(props.weatherJson.chanceOfRain)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}