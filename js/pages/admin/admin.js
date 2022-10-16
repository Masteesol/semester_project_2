import { addListener, createElement, modifyClassNames, selectElement } from "../../utils/manage-elements.js";
import login from "./login.js";
import { getLocalStorage, removeLocalStorage } from "../../utils/storage.js";
import addAdminInterface from "./admin-view.js";

export default function () {
    const mainContainer = selectElement(".main-container");
    if(isLoggedIn()) {
        modifyClassNames(mainContainer, "bg-light", "bg-primary");
        modifyClassNames(".logo", "d-none");
        addAdminInterface();
        addListener("#logout", logout)
    } else {
        const container = createElement("div", "w-100 d-flex-centering", "style | id", "height: 100vh | btn-container")
        container.append(addLoginForm())
        mainContainer.append(container)
        addListener("#form-signin-admin", login, "submit")
        modifyClassNames(".loader-container", "d-none");
    }
}

function logout () {
    removeLocalStorage("user");
    removeLocalStorage("token");
    window.location.replace("index.html");
  }

function addLoginForm() {
    let modal = 
    `
    <!-- Button trigger modal -->
              <button
                type="button"
                class="btn bg-secondary text-white ms-auto me-5"
                data-bs-toggle="modal"
                data-bs-target="#modalLogin"
              >
                Sign in
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="modalLogin"
                tabindex="-1"
                aria-labelledby="modalLoginLabel"
                aria-hidden="true"
                style="z-index: 9999"
              >
                <div class="modal-dialog">
                  <div class="modal-content bg-primary-variant">
                    <div class="modal-header">
                      <h5 class="modal-title" id="modalLoginLabel">
                        Sign in
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <form id="form-signin-admin">
                    <div class="modal-body">
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Email address</label>
                          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">Password</label>
                          <input type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                        <button type="submit" class="btn bg-secondary text-white">
                          Sign in
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
    `;
    return createElement("div", "", "", "", "", modal);
}

export function isLoggedIn() {
    return (getLocalStorage("token").length > 0 ? true : false);
}
