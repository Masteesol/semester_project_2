import icons from "../../components/modal-purchasing/icons.js";
import {
  selectElement,
  addListener,
  modifyClassNames,
} from "../../utils/manage-elements.js";
import { inCart, setLocalStorage } from "../../utils/storage.js";
import { findParam } from "../../utils/url-params.js";
import cardProductDetails from "./card-product-details.js";
import imageProduct from "./image-product-details.js";
import baseUrl from "../../data/api.js";
async function details() {
  try {
    const productId = findParam("id");
    const category = findParam("category");
    const res = await fetch(baseUrl + "products/" + productId);
    const json = await res.json();
    const data = json.data;
    modifyClassNames(".loader-container", "d-none");
    const container = selectElement("#wrapper");
    container.append(imageProduct(data), cardProductDetails(data));
    selectElement("main").insertAdjacentElement("afterbegin", icons());
    addListener(
      [
        [selectElement("#btn-add-to-cart"), selectElement("#btn-in-cart")],
        selectElement("#back-button-3"),
      ],
      [
        addToCart,
        () => window.location.replace("store.html?step=2&category=" + category),
      ]
    );

    function addToCart() {
      if (
        inCart.filter((item) => item === data.id).length === 0 ||
        inCart.length === 0
      ) {
        inCart.push(data.id);
        modifyClassNames("#btn-add-to-cart", "d-none");
        modifyClassNames("#btn-in-cart", "", "d-none");
      } else {
        inCart.splice(inCart.indexOf(data.id), 1);
        modifyClassNames("#btn-add-to-cart", "", "d-none");
        modifyClassNames("#btn-in-cart", "d-none");
      }
      setLocalStorage("product", inCart);
    }
  } catch (error) {
    console.log(error);
  }
}

export default details;
