import "./App.css";
import CatFolder from "./component/CatFolder";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {useEffect, useState} from "react";

function App() {
    const [load, setLoad] = useState(false);
    const [folderInfo, setFolderInfo] = useState([]);

    useEffect(() => {
        console.log(`useEffect 실행`)

        saveFolderInfo("2").then(() => {
            console.log("useEffect 끝");
        });
    }, []);


    async function saveFolderInfo(id) {
        console.log(`들어온 id : ${id}`);

        // 로딩 실행
        setLoad(true);

        // [{"id":"1","name":"노란고양이","type":"DIRECTORY","filePath":null,"parent":null},...]
        // 결과 정보 저장
        const infoArray = await getJson(id);
        setFolderInfo(infoArray);

        // 로딩 끝
        setLoad(false);
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
            const catFolderComponent = folderInfo.map(obj => <CatFolder id={obj.id}
                                                                        name={obj.name}
                                                                        type={obj.type}
                                                                        filePath={obj.filePath}/>);
            return (catFolderComponent);
        }
    }

    return (
        <div className={`App`}>
            <header className={`App-header`}>
                {renderMain()}
            </header>
        </div>
    );
}

export default App;