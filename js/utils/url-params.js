export function addParams(state) {
    const url = window.location.href;
    const key = state.substring(1, state.indexOf("="));
    if(!findParam(key)) {
        history.pushState({}, '', url + state)
    } else {
        console.log("Error: key already exists")
    }
    
}
export function setParams(param) {
    history.replaceState(null, null, param)
}

export function removeParams(id) {
    const url = new URL(window.location);
    const searchParams = url.searchParams;
    searchParams.delete(id);
    setParams(url.search);
}

export function getParams() {
    return newURLParams();
}

function newURLParams() {
    const url = window.location
    const urlObject = new URL(url);
    const params = new URLSearchParams(urlObject.search);
    return params;
}


export function modifyParams(key, newValue) {
    const url = new URL(window.location);
    const searchParams = url.searchParams;
    if(key) {
        if(Array.isArray(key)) {
            key.forEach((item, index) => {
                if(findParam(item)) {
                    searchParams.set(item, newValue[index]);
                }
                else {
                    console.log("error: search param does not exist in url")
                }
            });
        } else {
            searchParams.set(key, newValue);
        }  
    } else {
        console.log("null value entered")
    } 
    setParams(url.search)
}

export function findParam(param) {
    const url = new URL(window.location);
    const searchParams = url.searchParams;
    const searchArray = Array.from(searchParams);
    const result = searchArray.filter(key => key[0] === param);
    if(result.length > 0) {
        return result[0][1];
    } else {
        return false;
    }
}