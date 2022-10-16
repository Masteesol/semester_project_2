import { findValue } from "../../data/internalData.js";
import { createElement } from "../../utils/manage-elements.js";

export default function(data) {
    const { image_url, title, tag} = data.attributes
    let imageSrc = image_url;
    let filter = "";
    let maxWidth = "40rem";
    if(tag != "base") {
        imageSrc = findValue("iconSource");
        filter = "filter-white";
        maxWidth = "25rem";
    }
    const container = createElement("div", ["col-2", "w-lg-100", "d-flex", "align-items-center", 
    "justify-content-center", "p-0"], ["style", "id"], ["width: 50%", "products-image"])
    const template = `<img alt="${title}" src="${imageSrc}" class="w-100 ${filter}" style="max-width: ${maxWidth}">`
                    //TODO api 
        container.innerHTML = template;
        return container;
}