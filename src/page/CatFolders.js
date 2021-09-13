import CatFolder from "../component/CatFolder";

function CatFolders({objs, objOnClick}) {
    if (!objs.length) {
        return <div>결과가 없습니다.</div>
    }

    return(
        <div>
            {
                objs.map(obj =>
                    <CatFolder key={obj.id}
                               obj={obj}
                               onClick={() => objOnClick(obj)}
                    />)
            }
        </div>
    )
}

export default CatFolders;