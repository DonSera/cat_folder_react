import Loading from "../component/Loading";
import CatFolder from "../component/CatFolder";
import Fetch from "../function/Fetch";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";

function Home() {
    const {id = ""} = useParams();
    const history = useHistory();
    const [load, setLoad] = useState(false);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        fetchInfo(id);
    }, [id]);

    async function fetchInfo(objId){
        setLoad(true);
        const array = await Fetch(objId);

        setFolders(array);
        setLoad(false);
    }

    function handleClick(objId) {
        history.push(`/${objId}`);
    }

    function goBackWeb() {
        history.goBack()
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