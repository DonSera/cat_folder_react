async function Fetch(fetchUrl) {
    const fetchInfo = await fetch(fetchUrl);
    const info = await fetchInfo.json();
    if (info.length === 0) {
        console.log("Fetch Info Nothing")
        return []
    } else if (info.message) {
        console.log(info.message)
        return []
    }
    return info
}

export default Fetch;