import styles from './CatFolder.module.css'

function CatFolder({id, name, type, filePath}) {
    return (
        <div>
            {
                type === "DIRECTORY" ?
                    <button>{type}</button>
                    : <img src={filePath} alt={`이미지`} width={"200px"} height={"200px"}/>
            }
            <p>{name}</p>
            <p>id : {id}</p>
        </div>
    );
}

export default CatFolder;