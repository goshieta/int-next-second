import styles from "../../../styles/comp/middle.module.css"

type middleType={
    back:String[],
    mySite:{
        link:String,
        imgLink:String,
        title:String
    }[]
}

export default function Middle(props:middleType){
    return (
        <div id={styles.middle} style={{background: `linear-gradient(to right,${props.back[0]},${props.back[1]})`}}>
            <div id={styles.mySiteArea}>
                {
                    props.mySite.map(mone=>(<SiteShortcut key={mone.title.toString()} link={mone.link} imgLink={mone.imgLink} title={mone.title} ></SiteShortcut>))
                }
            </div>
        </div>
    )
}

type ssType={
    link:String,
    imgLink:String,
    title:String
}
function SiteShortcut(props:ssType){
    return (
        <a href={String(props.link)} target="_blank" rel="noopener noreferrer" className={styles.oneMySite}>
            <div className={styles.ssImgArea}>
                <img src={String(props.imgLink)} alt="" />
            </div>
            <div className={styles.ssStringArea}>
                <p>{props.title}</p>
            </div>
        </a>
    )
}