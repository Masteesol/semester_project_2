import { addListener, createElement } from "../../utils/manage-elements.js";
import purchaseModal from "./modal.js"
import searchBar from "./search-bar.js";

export default function () {
    const container = createElement("nav", "navbar w-100 d-flex justify-content-center justify-content-md-end px-4 py-1 position-fixed", "style", "z-index: 9999;");
    const cartIcon = createElement("i", "fa-solid fa-shopping-cart text-white");
    const homeIcon = createElement("i", "fa-solid fa-house text-white");
    const shopIcon = createElement("i", "fa-solid fa-store text-white");
    const searchIcon = createElement("i", "fa-solid fa-magnifying-glass text-white")
    ;
    const buttonCart = createElement("a", "btn", "href", "/cart.html");
    const homeLinkBtn = createElement("a", "btn", "href", "/index.html");
    const buttonStore = createElement("a", "btn", "href", "/store.html");
    const buttonSearch = createElement("button", "btn", "id", "btn-search");

    buttonCart.append(cartIcon);
    homeLinkBtn.append(homeIcon);
    buttonSearch.append(searchIcon);
    buttonStore.append(shopIcon);

    const containerInner= createElement("div", "d-flex shadow bg-primary-variant mx-2", "style", "top: 0px")
    containerInner.append(homeLinkBtn, buttonStore, buttonCart, purchaseModal())
    if(window.location.pathname.includes("store.html")) {
        containerInner.append(buttonSearch)
        addListener(buttonSearch, searchBar)
    }
    container.append(containerInner)
    return container;
}
