import styles from "../../../styles/comp/weather.module.css"

type owtype={
    date:String,
    weatherJson:{
        weather: String,
        maxtemp: Number,
        mintemp: Number,
        chanceOfRain:String
    }
}

export default function OneWeather(props:owtype){
    return (
        <div id={styles.parent}>
            <div id={styles.imgArea}></div>
            <div id={styles.strArea}>
                <p>{props.weatherJson.weather}</p>
            </div>
        </div>
    )
}