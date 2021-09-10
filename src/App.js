import "./App.css";
import CatFolder from "./component/CatFolder";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

function App() {
  const parentId = useRef(``);
  const localId = useRef('');
  const [load, setLoad] = useState(false);
  const [folderInfo, setFolderInfo] = useState([]);

  useEffect(() => {
    console.log(`useEffect 실행`)
    saveFolderInfo("");
  }, []);

  async function saveFolderInfo(id) {
    setLoad(true);
    console.log(`들어온 id : ${id}`);
    parentId.current = localId.current;
    localId.current = id;
    const folderInfoArray = await getJson(id);
    // {"id":"1","name":"노란고양이","type":"DIRECTORY","filePath":null,"parent":null}

    console.log(folderInfoArray);
    setFolderInfo(folderInfoArray);
    setLoad(false);
  }


  async function getJson(id) {
    // API를 이용하여 json 결과 array로 불러오기
    console.log(`start fetch`);
    const url = `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/${id}`;
    const folderInfoFetch = await fetch(url);
    console.log(`end fetch`);
    return await folderInfoFetch.json();
  }


  function renderMain() {
    if (load) {
      return <div>Loading</div>;
    } else {
      const folders = folderInfo.map(obj => {
        return <CatFolder id={obj.id}
                          name={obj.name}
                          type={obj.type}
                          filePath={obj.filePath}/>
      })

      // const backButton = <button onClick={() => saveFolderInfo(parentId.current)}>뒤로가기</button>

      return <Router>{folders}</Router>;
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