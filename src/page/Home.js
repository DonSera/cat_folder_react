import Loading from "../component/Loading";
import CatFolder from "../component/CatFolder";
import Fetch from "../function/Fetch";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

function Home() {
    const history = useHistory();
    const [load, setLoad] = useState(false);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        setLoad(true);

        Fetch('').then(array => {
            setFolders(array);
            setLoad(false);
        })
    }, [])

    function handleClick(obj) {
        setLoad(true);

        Fetch(obj.id).then(array => {
            setFolders(array);
            setLoad(false);
        })

        history.push(`/:${obj.id}`);
    }


    if (load) {
        return <Loading/>;
    }

    if (!folders.length) {
        return <div>결과가 없습니다.</div>
    }

    return (
        <div>
            {
                folders.map(obj =>
                    <CatFolder key={obj.id}
                               obj={obj}
                               onClick={() => handleClick(obj)}
                    />)
            }
        </div>
    )
}

export default Home;