import { findValue } from "../../data/internalData.js";
import {
  deleteElement,
  selectElement,
  createElement,
  addListener,
  modifyClassNames,
} from "../../utils/manage-elements.js";
import { getApi } from "../../data/api.js";
import { moveFigure } from "./body-interface.js";
import { findParam, setParams } from "../../utils/url-params.js";

export async function openProductOverview(category) {
  const json = await getApi("products?filters[category][$eq]=" + category);
  const data = json.data;
  selectElement("#body-interface").insertAdjacentElement(
    "beforebegin",
    productOverview(data, category)
  );
  addListener("#back-button-2 | #products-grid", [
    () => {
      //back to step 1
      modifyClassNames("#products-grid", "decrease-width", "increase-width");
      moveFigure("decrease", findParam("category"));
      setTimeout(() => {
        deleteElement("#products-grid");
        modifyClassNames("#info-modular-1", "", "d-none");
      }, 1000);
      setParams("store.html?step=1&category=" + findParam("category"));
    },
    (e) => {
      if (e.target.id.includes("expand")) {
        if (!e.target.classList.contains("active")) {
          modifyClassNames(e.target, "active | fa-minus", "fa-plus");
        } else {
          modifyClassNames(e.target, "fa-plus", "active | fa-minus");
        }
      }
    },
  ]);
}

export function productOverview(products, category) {
  let headingMain = findValue("title");
  const container = createElement(
    "div",
    "container-fluid position-absolute flow-y-scroll increase-width",
    "style | id",
    "z-index: 6000; height: 100vh; right: 0; padding-top: 5rem | products-grid"
  );

  const wrapper = createElement(
    "div",
    ["wrapper", "mx-auto", "mb-5"],
    "style",
    "max-width: 1000px"
  );

  const headingOneTemplate = `<div class="my-4 d-flex justify-content-between">
                                    <h2 class="font-heading text-primary" style="margin-bottom: 0">${headingMain}</h2>
                                    <button id="back-button-2" class="btn bg-primary-variant p-0" style="width: 2rem; height: 2rem;">
                                        <i class="fa-solid fa-chevron-left text-white"></i>
                                    </button>
                                </div>`;
  wrapper.innerHTML += headingOneTemplate;

  products.forEach((product) => {
    const { title, description, tag } = product.attributes;
    let descriptionModified = description.replaceAll("#", "");
    descriptionModified = descriptionModified.replaceAll("##", "");
    const summary = description.substring(
      description.indexOf("#") + 1,
      description.indexOf("##")
    );
    descriptionModified = descriptionModified.replace(summary, "");
    const templateProductBase = `
                        <div class="card-cut-primary mb-5 w-100 p-3 d-flex flex-column justify-content-between" style="min-height: 17rem;">
                                <div class="my-4 d-flex flex-column">
                                    <div class="d-flex justify-content-between">
                                        <h3 class="text-white font-heading h1">${title}</h3>
                                        <i class="font-special text-white font-weight-light">Base</i>
                                    </div>
                                    <div class="mt-3">
                                        <i class="d-block">${summary}</i>
                                    </div>
                                </div>
                                <div class="collapse" id="collapse_${product.id}">
                                    <div class="card card-body bg-primary">
                                        <p>${descriptionModified}</p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                        <button class="btn btn-bs-dark base text-white fa-solid fa-plus p-0 m-1"
                                            type="button" 
                                            data-bs-toggle="collapse" 
                                            data-bs-target="#collapse_${product.id}" 
                                            aria-expanded="false" 
                                            aria-controls="collapse_${product.id}" 
                                            id="expand_${product.id}" 
                                            style="height: 3rem; width: 3rem">
                                        </button>
                                        <a class="btn bg-secondary fa-solid fa-chevron-right text-white bs-dark active p-0 m-1" style="height: 3rem; width: 3rem" href="details.html?id=${product.id}&category=${category}">
                                            <i class="" style="font-size: 2rem; height: 3rem; width: 3rem"></i>
                                        </a>
                                </div>
                        </div>`;
    if (tag === "base") {
      wrapper.innerHTML += templateProductBase;
      const containerProductUpgrades = createElement("div", "container-fluid");
      const row = createElement("div", [
        "card-row",
        "row",
        "mt-4",
        "m-screen-flex-column",
      ]);
      let count = 0;
      products.forEach((item) => {
        const {
          title: titleInner,
          tag: tagInner,
          category: categoryInner,
        } = item.attributes;
        const imageSrc = findValue("iconSource");
        const cardTemplateProductUpgrade = `
                            <div class="card-container col-3 m-screen-w-90" style="width: 20.5rem; height: 20rem">
                                <a href="details.html?id=${item.id}&category=${categoryInner}"><div class="card-cut-variant p-4 d-flex flex-column align-items-center" style="height: 12rem;">
                                    <img class="filter-white h-100" src="${imageSrc}" alt="body-part-icon" style="max-width: 100%;">
                                </div></a>
                                <h3 class="text-white font-heading text-center my-3">${titleInner}</h3>
                            </div>`;

        const headingTwoTemplate = `<div class="my-4">
                                                <h2 class="font-heading text-primary" style="margin-bottom: 0">Upgrades</h2>
                                            </div>`;
        const titleHyphen = title.replaceAll(" ", "-").toLowerCase();
        if (tagInner.includes("upgrade") && tagInner.includes(titleHyphen)) {
          if (count === 0) {
            row.innerHTML += headingTwoTemplate;
            count++;
          }
          row.innerHTML += cardTemplateProductUpgrade;
        } else if (tagInner === "upgrade") {
          if (count === 0) {
            row.innerHTML += headingTwoTemplate;
            count++;
          }
          row.innerHTML += cardTemplateProductUpgrade;
        }
      });
      containerProductUpgrades.append(row);
      wrapper.append(containerProductUpgrades);
    }
  });

  container.append(wrapper);
  return container;
}
