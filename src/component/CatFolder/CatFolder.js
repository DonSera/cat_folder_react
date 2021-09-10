import styles from './CatFolder.module.css'

function CatFolder({id, name, type, filePath}) {
    const imgUrl = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public`

    function imgCase(){
        return (
            <div>
                <img src={imgUrl+filePath} alt={`이미지`} width={"200px"} height={"200px"}/>
                <p>{name}</p>
                <p>id : {id}</p>
            </div>
        );
    }

    function folderCase(){
        return(
            <div>
                <button>{type}</button>
                <p>{name}</p>
                <p>id : {id}</p>
            </div>
        )
    }

    function render(){
        console.log(`${type} : ${name}`)
        if(type === "DIRECTORY") return folderCase();
        else if (type === "FILE") return  imgCase();
        else return <div>Not Dic and File</div>
    }

    return (
        <div>
            {render()}
        </div>
    );
}

export default CatFolder;