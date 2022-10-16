import { internalData as textData } from "../../data/internalData.js";
import { createElement } from "../../utils/manage-elements.js";
import { findParam } from "../../utils/url-params.js";

export default function(interfaceContainer, id = findParam("category")) {
    const container = createElement("aside", "card-container", "id", "info-modular-1");
    const text = textData.filter(item => item[0].includes(id) || id.includes(item[0]));
    const object = text[0][1];
    const { title, excerpt } = object;
    const template = `
    <div class="position-absolute fade-in sm-screen-90" style="top: 5rem; right: 1rem; margin-left: 1rem; z-index: 6000">
      <div class="card-cut-primary"  
      style="max-width: 350px; height: 50vh; max-height: 300px;">
        <h3 class="text-white font-heading pt-4 px-2">${title}</h3>
        <p class="text-white py-2 px-2">${excerpt}</p>
      </div>
      <div class="w-100 mt-3 position-relative d-flex justify-content-end">
          <div class="d-inline">
            <button id="back-button" class="btn bg-primary-variant">
              <i class="fa-solid fa-chevron-left text-white"></i>
            </button>
            <button id="proceed-button" class="btn bg-secondary" style="height: 4rem; width: 4rem;">
              <i class="fa-solid fa-chevron-right text-white" style="font-size: 2rem"></i>
            </button>
        </div>
      </div>`;
    container.innerHTML = template;
    interfaceContainer.append(container);
  }