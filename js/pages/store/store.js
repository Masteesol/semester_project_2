import {
  bodyInterface,
  interfaceActive,
  moveFigure,
} from "./body-interface.js";
import { findParam, setParams } from "../../utils/url-params.js";
import { openProductOverview } from "./grid-product-overview.js";
import {
  addListener,
  selectElement,
  modifyClassNames,
} from "../../utils/manage-elements.js";
import icons from "../../components/modal-purchasing/icons.js";
import baseUrl from "../../data/api.js";

async function store() {
  try {
    const res = await fetch(
      baseUrl + "products?pagination[start]=0&pagination[limit]=40"
    );
    const json = res.json();
    const data = json.data;
    modifyClassNames(".loader-container", "d-none");
    console.log(data);
    bodyInterface();
    insertData();
    addListener(window, () => window.location.reload(), "popstate");
    selectElement(".main-container").insertAdjacentElement(
      "afterbegin",
      icons(data)
    );
  } catch (error) {
    console.log(error);
  }
}

function insertData() {
  if (!window.location.search) {
    setParams("?step=1");
  } else {
    if (findParam("step") === "2" && findParam("category")) {
      const id = findParam("category");
      interfaceActive(id);
      modifyClassNames(selectElement("#info-modular-1"), "d-none");
      modifyClassNames(selectElement("#body-png-overlay"), "", "fade-in");
      openProductOverview(id);
      moveFigure("increase", findParam("category"));
    }
    if (findParam("step") === "1" && findParam("category")) {
      const id = findParam("category");
      interfaceActive(id);
    }
  }
}
export default store;
