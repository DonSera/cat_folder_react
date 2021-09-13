import {useState} from "react";
import styles from './CatFolder.module.css'
import {AiOutlineFolder} from "react-icons/ai";
import ImgPopUp from "../ImgPopUp";

function CatFolder({obj, onClick}) {
    const imgUrl = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public`
    const [popup, setPopup ] = useState(false);

    const openPopup = () => {
        setPopup(true);
    }
    const closePopup = () => {
        setPopup(false);
    }

    function handleClick() {
        onClick({obj, onClick});
    }

    function imgCase() {
        return (
            <div className={styles['cat-card']} onClick={openPopup}>
                <img src={imgUrl + obj.filePath} alt={`이미지`} className={styles['img']}/>
                <span className={styles['name']}>{obj.name}</span>
            </div>
        );
    }

    function folderCase() {
        return (
            <div className={styles['cat-card']} onClick={handleClick}>
                <AiOutlineFolder size={"200px"} color={"black"}/>
                <span className={styles['name']}>{obj.name}</span>
            </div>
        )
    }

    function render() {
        if(popup){
            return <ImgPopUp url={imgUrl+obj.filePath} onClick={closePopup}/>
        }else {
            if (obj.type === "DIRECTORY") return folderCase();
            else if (obj.type === "FILE") return imgCase();
            else return <div>Not Dic and File</div>
        }

    }

    return render();
}

export default CatFolder;