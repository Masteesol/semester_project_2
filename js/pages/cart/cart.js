import icons from "../../components/modal-purchasing/icons.js";
import { findValue } from "../../data/internalData.js";
import {
  addListener,
  selectElement,
  modifyClassNames,
  createElement,
} from "../../utils/manage-elements.js";
import { inCart, setLocalStorage } from "../../utils/storage.js";
import baseUrl from "../../data/api.js";
export default async function () {
  try {
    console.log(inCart);
    selectElement("main").insertAdjacentElement("afterbegin", icons());
    if (inCart.length > 0) {
      let queryString = "?";
      inCart.forEach((id, index) => {
        queryString += `filters[id][$in][${index}]=${id}`;
        if (index < inCart.length - 1) {
          queryString += "&";
        }
      });
      const res = await fetch(baseUrl + "products" + queryString);
      const json = await res.json();
      const data = json.data;
      modifyClassNames(".loader-container", "d-none");

      let total = 0;
      const cards = data.map((data) => {
        const { title, price = 50, image_url, tag, category } = data.attributes;
        total += price;
        let imageSrc = findValue("iconSource", category);
        let filter = "filter-white";
        let bg = "card-cut-variant";
        if (tag === "base") {
          filter = "";
          bg = "bg-gradient-card-variant";
          imageSrc = image_url;
        }
        const templateCard = `                                      
                                                        <h3 class="h5 font-heading text-center my-4">${title}</h3>
                                                        <a href="details.html?id=${data.id}&category=${category}">
                                                            <div class="card-cut d-flex-centering ${bg}" style="width: 15.5rem; height: 15rem">
                                                                <img class="${filter}" src="${imageSrc}" alt="${title}" style="height: 80%">
                                                            </div>
                                                        </a>
                                                        <div class="d-flex justify-content-between my-3">
                                                            <p><span id="item-price-${data.id}">${price}</span> CREDITS</p>
                                                            <button class="btn bg-primary fa-thin fa-x text-white" id="remove-${data.id}" data=${data.id}>
                                                            </button>
                                                        </div>`;
        const container = createElement(
          "div",
          "card-container text-primary",
          "style | data",
          `width: 15.5rem; | ${data.id}`,
          "",
          templateCard
        );
        return container;
      });

      const template = `
                        <div name="cart-container" id="cart-container" class="w-100 p-3 d-flex flex-column flex-md-row justify-content-between fade-in" style="height: 70vh;">
                            <div name="left-column" class="d-flex flex-column align-items-center w-lg-100" id="left-column" style="width: 50%">
                            </div>
                            <div name="right-column" class="d-flex flex-column w-lg-100" style="width: 50%">
                                <div class="my-4 d-flex justify-content-center justify-content-lg-end">
                                    <div>
                                        <p class="font-heading text-primary font-weight-light">BALANCE</p>
                                        <p class="font-regular text-primary">0 CREDITS</p>
                                    </div>
                                </div>
                                <div name="left-column" class="d-flex justify-content-center justify-content-lg-end mb-4 sm-screen-w-100">
                                    <div>
                                        <p class="text-primary font-special" style="text-align: right"><span id="total-price">${total}</span> credits</p>
                                        <button id="proceed-button-2" class="btn bg-secondary text-white font-special">PURCHASE</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                            `;
      selectElement("#card-container").innerHTML += template;

      cards.forEach((card) => selectElement("#left-column").append(card));
      addListener("#left-column", (e) => removeFromCart(e));
    } else {
      modifyClassNames(".loader-container", "d-none");
      emptyCartText();
    }
    addListener("#back-button-4", () => location.replace("/store.html"));
  } catch (error) {
    console.log(error);
  }
}

function removeFromCart(e) {
  if (e.target.id.includes("remove")) {
    const strapiID = parseInt(e.target.getAttribute("data"));
    inCart.splice(inCart.indexOf(strapiID), 1);
    setLocalStorage("product", inCart);
    const total = parseInt(selectElement("#total-price").innerText);
    const itemPrice = parseInt(
      selectElement("#item-price-" + e.target.getAttribute("data")).innerText
    );
    selectElement("#total-price").innerText = total - itemPrice;
    selectElement(`.card-container[data="${strapiID}"]`).remove();
    if (inCart.length === 0) {
      selectElement(`#cart-container`).remove();
      emptyCartText();
    }
  }
}

function emptyCartText() {
  selectElement("#card-container").append(
    createElement(
      "div",
      "w-100 d-flex-centering text-primary",
      "",
      "",
      "",
      `<h2 class="text-heading">Empty Cart</h2>`
    )
  );
}
