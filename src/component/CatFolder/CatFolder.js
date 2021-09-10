import styles from './CatFolder.module.css'
import {AiOutlineFolder} from "react-icons/ai";

function CatFolder({name, type, filePath}) {
    const imgUrl = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public`

    function imgCase() {
        return (
            <div className={styles['cat-card']}>
                <img src={imgUrl + filePath} alt={`이미지`} className={styles['img']}/>
                <span className={styles['name']}>{name}</span>
            </div>
        );
    }

    function folderCase() {
        return (
            <div className={styles['cat-card']}>
                <AiOutlineFolder size={"200px"} color={"black"}/>
                <span className={styles['name']}>{name}</span>
            </div>
        )
    }

    function render() {
        if (type === "DIRECTORY") return folderCase();
        else if (type === "FILE") return imgCase();
        else return <div>Not Dic and File</div>
    }

    return render();
}

export default CatFolder;