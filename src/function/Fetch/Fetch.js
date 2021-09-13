async function Fetch(id){
    const folderInfoUrl = `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/`;
    const url = folderInfoUrl+id;
    console.log(`start fetch ${url}`);
    const folderInfoFetch = await fetch(url);
    const folderInfoArray = await folderInfoFetch.json();
    console.log(`end fetch`);
    return folderInfoArray;
}

export default Fetch;