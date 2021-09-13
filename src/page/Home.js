import Loading from "../component/Loading";
import CatFolder from "../component/CatFolder";
import Fetch from "../function/Fetch";
import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";

function Home() {
    const history = useHistory();
    const stack = useRef([]);
    const [load, setLoad] = useState(false);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        setLoad(true);

        fetchInfo('')
        // stack.current.push('')
    }, [])

    function fetchInfo(objId){
        Fetch(objId).then(array => {
            setFolders(array);
            setLoad(false);
        })
    }

    function handleClick(objId) {
        // setLoad(true);

        fetchInfo(objId);
        stack.current.push(objId);

        history.push(`/${objId}`);
        // console.log(objId);
        // console.log(stack);
    }

    function goBackWeb() {
        history.goBack()
        // stack.current.pop()
        // const backId = stack.current[stack.current.length-1]
        // fetchInfo(backId)
        // console.log(backId);
        // console.log(stack);
    }


    if (load) {
        return <Loading/>;
    }

    if (!folders.length) {
        return <div>결과가 없습니다.</div>
    }

    return (
        <div>
            <button type={"button"} onClick={goBackWeb}>뒤로가기</button>
            <div>
                {
                    folders.map(obj =>
                        <CatFolder key={obj.id}
                                   obj={obj}
                                   onClick={() => handleClick(obj.id, obj.parent)}
                        />)
                }
            </div>
        </div>
    )
}

export default Home;