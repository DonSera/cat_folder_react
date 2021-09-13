async function Fetch(id){
    const folderInfoUrl = `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/`;
    const url = folderInfoUrl+id;
    const folderInfoFetch = await fetch(url);
    return await folderInfoFetch.json();
}

export default Fetch;