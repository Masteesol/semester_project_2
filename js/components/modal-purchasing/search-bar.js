import { getApi } from "../../data/api.js";
import { internalData } from "../../data/internalData.js";
import { addListener, createElement, modifyClassNames, selectElement } from "../../utils/manage-elements.js";

export default async function() {
    const json = await getApi("products?pagination[start]=0&pagination[limit]=40");
    const data = json.data;
    const mainContainer = selectElement(".main-container");
   this.classList.toggle("active")
   //console.log(this)
   const container = createElement("div", "container-fluid w-100 position-absolute bg-light", "style | id", "top: 0; z-index: 7000; min-height: 100vh | product-list");
   if(this.classList.contains("active")) {
        modifyClassNames(this.firstChild, "fa-xmark", "fa-magnifying-glass")
        const heading = createElement("h2", "text-primary my-4", "", "", "All products")
        const searchHTML = `
                    <label for="search-text" class="form-label text-primary">Search</label>
                    <input type="text" class="form-control" id="search-text" placeholder="Search title or description text">
                    `;
        const searchContainer = createElement("div", "my-3 container", "", "", "", searchHTML);
        const cards = data.map(data => createCard(data));
        const row = createElement("div", "row w-h-100", "id", "all-cards");
        cards.forEach(card => row.append(card));
        container.append(heading, searchContainer, row)
        mainContainer.append(container)
        addListener("#search-text", () => {
            const searchElement = selectElement("#search-text");
            selectElement("#all-cards").childNodes.forEach(element => {
                const modifiedSearch = searchElement.value.toLowerCase();
                const elementData = element.getAttribute("data").replaceAll(";", " ").toLowerCase();
                const title = element.id.replaceAll(";", " ").toLowerCase();
                if(!elementData.includes(modifiedSearch) || !title.includes(modifiedSearch)) {
                    modifyClassNames(element, "d-none");
                } else {
                    modifyClassNames(element, "", "d-none");
                }
            })
            
        }, "keyup");
   } else {
        selectElement("#product-list").remove()
        modifyClassNames(this.firstChild, "fa-magnifying-glass", "fa-xmark")
   }

}

function createCard(data) {
    const {title, image_url, price, tag, category, description} = data.attributes
    let image_src = image_url;
    let filter;
    if(tag.includes("upgrade")) {
        image_src = internalData.filter(item => item[0] === category);
        image_src = image_src[0][1].iconSource
        filter = "filter-primary";
    }
    let descriptionModified = description.replaceAll("#", "");
    descriptionModified = descriptionModified.replaceAll("##", "");
    descriptionModified = descriptionModified.replaceAll(" ", ";");
    const  titleModified = title.replaceAll(" ", ";")
    const template = `
                
                <div class=" d-flex-centering p-3 flex-grow-1" style="height: 15rem">
                    <a href="details.html?id=${data.id}&category=${category}">
                    <img src="${image_src}" class=" ${filter}" style="max-width: 100%; max-height: 100%;"></a>
                </div>
                <div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p>PRICE: ${price}</p>
                        </div>
                    </div>
                    <div class="mb-2">
                        <h3 class="h6">${title}</h3>
                    </div>
                </div>
    `;
    return createElement("div", "col-3 text-primary bg-white mx-auto shadow rounded my-5 d-flex flex-column justify-content-between", 
    "style | id |  data", `width: 15rem; height: 20rem | card-${titleModified} | ${descriptionModified}`, "", template);
}
