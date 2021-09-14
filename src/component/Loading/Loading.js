import styles from './Loading.module.css'
import Loader from "react-loader-spinner";

function Loading() {
    const loader = <Loader type="Oval"
                           color="#000000"
                           height={"100%"}
                           width={"100%"}
                           timeout={Number("infinity")}/>;
    const loaderText = <span className={styles['text']}>Loading ...</span>

    return <div className={styles['loading-div']}>{loader}{loaderText}</div>
}

export default Loading;