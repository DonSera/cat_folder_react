import {useEffect, useRef, useState} from "react";
import styles from "./App.module.css";
import CatFolder from "./component/CatFolder";
import Loading from './component/Loading';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";

function App() {
    const locArray = useRef([]);
    const currentLoc = useRef(null);
    const [load, setLoad] = useState(false);
    const [folderInfo, setFolderInfo] = useState([]);

    useEffect(() => {
        locArray.current = [];
        judgeGoBack("");
    }, []);

    function judgeGoBack(id) {
        if (id) {
            //Go
            locArray.current.push(currentLoc.current);
            currentLoc.current = id;
        } else if (id === "") {
            // Root
            locArray.current.push(id);
            currentLoc.current = id;
        } else {
            currentLoc.current = locArray.current.pop();
        }
        console.log(`길이 : ${locArray.current.length}`)
        saveFolderInfo(currentLoc.current).then();
    }

    async function saveFolderInfo(id) {
        // 로딩 실행
        setLoad(true);

        // [{"id":"1","name":"노란고양이","type":"DIRECTORY","filePath":null,"parent":null},...]
        // 결과 정보 저장
        const infoArray = await getJson(id);
        setFolderInfo(infoArray);

        // 로딩 종료
        setLoad(false)
    }


    async function getJson(id) {
        // API를 이용하여 json 결과 array로 불러오기
        console.log(`start fetch`);
        const url = `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/${id}`;
        const folderInfoFetch = await fetch(url);
        const folderInfoArray = await folderInfoFetch.json();
        console.log(`end fetch`);
        return folderInfoArray;
    }


    function rendering() {
        if (load) {
            return <Loading/>;
        } else {
            return (
                <div>
                    <div className={styles[`back-button`]}>
                        {renderBackButton()}
                    </div>
                    {renderMain()}
                </div>);
        }


    }

    function renderMain() {
        if (folderInfo.length === 0) {
            return <div>결과가 없습니다.</div>
        } else {
            return (folderInfo.map(obj =>
                <Link to={`/${obj.id}`} onClick={() => judgeGoBack(obj.id, true)}>
                    <CatFolder name={obj.name}
                               type={obj.type}
                               filePath={obj.filePath}/>
                </Link>));
        }
    }


    function renderBackButton() {
        if (locArray.current.length === 1) {
            return <div>Root</div>
        } else {
            return (
                <button onClick={() => judgeGoBack(0, false)}>
                    <AiOutlineLeft/> 나가기
                </button>);
        }
    }

    return (
        <div className={styles[`App`]}>
            <header className={styles[`App-header`]}>
                <Router>
                    {rendering()}
                </Router>
            </header>
        </div>
    );
}

export default App;
