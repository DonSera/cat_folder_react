import "./App.css";
import CatFolder from "./component/CatFolder";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

function App() {
    const locationArray = useRef([]);
    const currentLocation = useRef(null);
    const [load, setLoad] = useState(false);
    const [folderInfo, setFolderInfo] = useState([]);

    useEffect(() => {
        console.log(`useEffect 실행`)
        judgeGoBack("");
    }, []);

    function judgeGoBack(id) {
        console.log(`들어온 id : ${id}`);
        if (id) {
            //Go
            locationArray.current.push(currentLocation.current);
            currentLocation.current = id;
            console.log(`Go ${currentLocation.current}`);
        } else if(id === ""){
            // Root
            locationArray.current.push(id);
            currentLocation.current = id;
            console.log(`Root ${currentLocation.current}`);
        }
        else {
            currentLocation.current = locationArray.current.pop();
            console.log(`Back ${currentLocation.current}`);
        }
        console.log(`locationArray : ${locationArray.current.length}`);
        saveFolderInfo(currentLocation.current).then();
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


    function renderMain() {
        if (load) {
            return <div>Loading</div>;
        } else {
            let catFolderComponent;
            let backButton;
            if (folderInfo.length === 0) {
                catFolderComponent = <div>결과가 없습니다.</div>
            } else {
                catFolderComponent = folderInfo.map(obj =>
                    <Link to={`/${obj.id}`} onClick={() => judgeGoBack(obj.id, true)}>
                        <CatFolder id={obj.id}
                                   name={obj.name}
                                   type={obj.type}
                                   filePath={obj.filePath}/>
                    </Link>);
            }

            if (locationArray.current.length === 0) {
                backButton = <div>Root</div>
            } else {
                backButton = <button onClick={() => judgeGoBack(0, false)}>뒤로가기</button>
            }


            return (
                <div>
                    {backButton}
                    {catFolderComponent}
                </div>);
        }
    }

    return (
        <div className={`App`}>
            <header className={`App-header`}>
                <Router>
                    {renderMain()}
                </Router>
            </header>
        </div>
    );
}

export default App;