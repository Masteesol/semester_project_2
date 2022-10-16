import { getApi } from "../../data/api.js";
import { findValue } from "../../data/internalData.js";
import { createElement, modifyClassNames, selectElement } from "../../utils/manage-elements.js";

export default async function() {
    try {
        
        const json = await getApi("products?filters[featured][$eq]=true");
        const data = json.data;
        modifyClassNames(".loader-container", "d-none");
        createFeaturedHTML(data)
    } catch (error) {
        console.log(error)
    }
}

export function createFeaturedHTML(data) {
    const container = selectElement("#featured-products");
    const containerInner = createElement("div", "container", "", "", "", `<div class="mb-3"><h3 class="font-heading">Featured Products</h3></div>`);
    const row = createElement("div", "row");
    data.forEach((data, index) => {
        const {category, image_url, title, description, tag} = data.attributes;
        if(tag === "base" && index === 0) {
            let descriptionModified = description.replaceAll("#", "");
            descriptionModified = descriptionModified.replaceAll("##", "");
            const summary = description.substring(description.indexOf("#")+1, description.indexOf("##"))
            const templateMain = `
            <div class="mb-4" id="main-featured">
                <div class="featured bg-gradient-card w-100 d-flex flex-column-reverse justify-content-around flex-lg-row px-3" style="min-height: 100vh;">
                    <div class="w-lg-100 d-flex flex-column justify-content-center" style="width: 50%">
                        <img src="${image_url}" alt="${title}" class="w-100">
                        <div id="featured-text">
                        <h2 class="h5 font-special text-primary font-weight-light mt-5 text-center">NEW AND IMPROVED DESIGN</h2>
                        </div>
                    </div>
                    <div class="w-lg-100 d-flex justify-content-start justify-content-lg-end flex-grow" style="width: 50%">
                        <div class="pt-5 px-3" style="max-width: 500px">
                            <h3 class="font-heading">${title}</h3>
                            <p>${summary}</p>
                        </div>
                    </div>
                </div>
            </div>`;
            container.append(createElement("div", "mb-4", "id", "main-featured", "", templateMain));
        } else {
            let imageSrc = findValue("iconSource", category);
            let filter = "filter-white";
            let bg = "card-cut-variant";
            if(tag === "base") {
                filter = "";
                bg = "bg-gradient-card-variant"
                imageSrc = image_url;
            }
            const templateCard =  `
                                <div class="card-container col-3 mx-auto m-screen-w-90" style="width: 20.5rem; height: 20rem">
                                    <a href="details.html?id=${data.id}&category=${category}">
                                        <div class="${bg} p-4 d-flex flex-column align-items-center" style="height: 12rem;">
                                            <img class="${filter} h-100" src="${imageSrc}" alt="body-part-icon" style="max-width: 100%;">
                                        </div>
                                        <p class="text-white font-heading text-center my-3 h6">${title}</p>
                                    </a>
                                </div>
                                `;
            row.innerHTML += templateCard;
        }
    })
    containerInner.append(row);
   container.append(containerInner)
}
