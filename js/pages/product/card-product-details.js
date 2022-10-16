import { findValue } from "../../data/internalData.js";
import { createElement } from "../../utils/manage-elements.js";
import { inCart } from "../../utils/storage.js";

export default function(data) {
    const { title, description, price} = data.attributes;
    const headingMain = findValue("title");

    let descriptionModified = description.replaceAll("\n", `<br>`);
    descriptionModified = descriptionModified.replaceAll("#", "");
    descriptionModified = descriptionModified.replaceAll("##", "");
    const container = createElement("div", ["col", "w-lg-100", "p-0", "mb-5"], ["style", "id"], ["width: 50%", "products-description"])
    let inCartDisplay = ""
    let addToCartDisplay = "d-none";
    if(inCart.filter(item => item === data.id).length === 0 || inCart.length === 0) {
        addToCartDisplay = "";
        inCartDisplay = "d-none";
    }
    const template = `
                <div>
                    <div class="my-4 d-flex justify-content-between">
                        <h2 class="font-heading text-primary" style="margin-bottom: 0">${headingMain}</h2>
                        <button id="back-button-3" class="btn fa-solid fa-chevron-left bg-primary-variant text-white p-0" style="font-size: 1.2rem; width: 2.2rem; height: 2.2rem"></button>
                    </div>
                    <div class="card-cut-primary w-100 p-3 d-flex flex-column justify-content-between" style="min-height: 70vh;">
                        <div>
                            <h3 class="text-white font-heading mt-3 h1">${title}</h3>
                            <div class="overflow-auto p-container mt-4" style="height: 60%; ">
                                <p class="text-white">${descriptionModified}</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-end flex-column w-md-100">
                            <p id="price" class="text-white font-special">${price} credits</p>
                            <button id="btn-in-cart" class="btn font-special p-2 bg-primary-variant text-white p-0 mt-3 ${inCartDisplay}">In Cart</button>
                            <button id="btn-add-to-cart" class="fa-solid fa-shopping-cart btn btn-bs-dark base text-white p-0 mt-3 ${addToCartDisplay}" style="font-size: 1.5rem; width: 3rem; height: 3rem;"></button>
                        </div>
                    </div>
                </div>`
        container.innerHTML = template;
        return container;
}