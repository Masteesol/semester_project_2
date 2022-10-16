export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}

export function getLocalStorage(key) {
    let json = [];
    if(JSON.parse(localStorage.getItem(key))) {
        json = JSON.parse(localStorage.getItem(key))
    }
    return json;
}

export let inCart = [];

(function setInCartOnLoad() {
    
    const items = getLocalStorage("product");
    if(Object.keys(items).length > 0) {
        inCart = items;
    }
    console.log("incart", inCart);
})()

