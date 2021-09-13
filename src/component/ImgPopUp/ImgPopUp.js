import styles from './ImgPopUp.module.css'

function ImgPopUp({url, onClick}) {
    return (
        <div className={styles[""]}>
            <img className={styles["img"]} src={url} alt={`이미지`}/>
            <button type={"button"} onClick={onClick}>나가기</button>
        </div>
    )
}

export default ImgPopUp;