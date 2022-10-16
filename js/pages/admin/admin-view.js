import { getApi } from "../../data/api.js";
import { internalData } from "../../data/internalData.js";
import { createElement, modifyClassNames, selectElement, addListener } from "../../utils/manage-elements.js";
import {formModal, confirmDeleteModal} from "./manage-products/admin-product-modal.js";

export default async function() {
    try {
        const json = await getApi("products?pagination[start]=0&pagination[limit]=40");
        const data = json.data;
        console.log(data)
        modifyClassNames(".loader-container", "d-none");
        modifyClassNames(".admin-view", "", "d-none");
        const cards = data.map(data => createCard(data));
        const row = createElement("div", "row w-h-100");
        cards.forEach(card => row.append(card));
        const modal = formModal("new-product")
        selectElement("#open-modal-container").append(modal)
        selectElement("main").append(confirmDeleteModal())
        selectElement(".main-container").append(row);
        addListener("main", (e) => {
            const strapiID = parseInt(e.target.getAttribute("data"));
            const className = e.target.className;
            const productData = data.filter(data => data.id === strapiID);
            if(productData.length > 0) {
                if(className.includes("delete")) {
                    console.log(productData[0].id)
                    selectElement("#delete-product-id").value = productData[0].id;
                    selectElement("#delete-product-id").innerText = productData[0].id;
                } if(className.includes("edit")) {
                    setModalValues(productData)
                    }
                }
        })
        addListener("#open-modal", resetModal);
        
    } catch (error) {
        console.log(error)
    }
}

function createCard(data) {
    const {title, image_url, price, tag, category} = data.attributes
    let image_src = image_url;
    let filter;
    if(tag.includes("upgrade")) {
        image_src = internalData.filter(item => item[0] === category);
        image_src = image_src[0][1].iconSource
        filter = "filter-primary";
    }
    const template = `
                
                <div class=" d-flex-centering p-3 flex-grow-1" style="height: 15rem">
                    <img src="${image_src}" class=" ${filter}" style="max-width: 100%; max-height: 100%;">
                </div>
                <div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p>PRICE: ${price}</p>
                        </div>
                        <div>
                            <button class="btn delete fa-solid delete fa-trash text-primary pointer"
                                data-bs-toggle="modal" 
                                data-bs-target="#staticBackdrop" 
                                data="${data.id}">
                            </button>
                            <button data="${data.id}"
                                type="button"
                                class="btn fa-solid edit fa-pen-to-square text-primary pointer"
                                data-bs-toggle="modal"
                                data-bs-target="#admin-add-modal"
                            ></button>
                        </div>
                    </div>
                    <div class="mb-2">
                        <h3 class="h3">${title}</h3>
                    </div>
                </div>
    `;
    return createElement("div", "col-3 text-primary bg-white mx-auto shadow rounded my-5 d-flex flex-column justify-content-between", 
    "style", "width: 20rem; height: 30rem", "", template);
}

function resetModal() {
        console.log("test")
        const formInput = selectElement("#new-product");
        console.log(formInput)
        formInput.forEach(item =>  {
          if(item.classList.contains("category-check")) {
              item.removeAttribute("checked")
              if(item.value === "arms") {
                  item.setAttribute("checked", "true")
              }
          }
          if(item.classList.contains("base-upgrade-check")) {
              item.removeAttribute("checked")
              if(item.value === "base") {
                  item.setAttribute("checked", "true")
              }
          }
          if(item.classList.contains("feature-check")) {
              item.removeAttribute("checked")
              if(item.value === "false") {
                  item.setAttribute("checked", "true")
              }
             }
          });
          formInput[6].value = "";
          formInput[8].value = "";
          formInput[7].value = "";
          formInput[13].value = "";
          formInput[14].value = "N/A";
}

function setModalValues(productData) {
    const {title, description, category, featured, price, image_url, tag} = productData[0].attributes
    const formInput = selectElement("#new-product");
    console.log(formInput)
    formInput.forEach(item =>  {
        if(item.classList.contains("category-check")) {
            item.removeAttribute("checked")
            if(item.value === category) {
                item.setAttribute("checked", "true")
            }
        }
        if(item.classList.contains("base-upgrade-check")) {
            item.removeAttribute("checked")
            if(item.value === tag) {
                item.setAttribute("checked", "true")
            }
        }
        if(item.classList.contains("feature-check")) {
            item.removeAttribute("checked")
            if(item.value === featured) {
                item.setAttribute("checked", "true")
            }
        }
    });
    formInput[6].value = title;
    formInput[8].value = description;
    formInput[7].value = price;
    formInput[13].value = image_url;
    formInput[14].value = productData[0].id;
}

