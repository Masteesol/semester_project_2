import admin from "./pages/admin/admin.js";
import cart from "./pages/cart/cart.js";
import home from "./pages/home/home.js";
import details from "./pages/product/details.js";
import store from "./pages/store/store.js"
import { createElement, selectElement } from "./utils/manage-elements.js";

  (function()  {
    const loader = createElement("div", "loader-container position-absolute w-h-100 d-flex-centering", "style", "z-index: 7000; top: 0;", "", `<span class="loader"></span>`)
    if(window.location.pathname === "/index.html") {
      selectElement("#featured-products").append(loader)
    } else {
      selectElement("main").append(loader);
    }
    switch (window.location.pathname) {
      case "/index.html":
        home();
        break;
      case "/store.html":
        store()
        break;
      case "/details.html":
        details();
        break;
      case "/cart.html":
        cart();
        break;
      case "/admin.html":
        admin()
        break;
      default:
        window.location.replace("/index.html");
    }
  })()


