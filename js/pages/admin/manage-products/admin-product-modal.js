import { createElement, addListener, selectElement } from "../../../utils/manage-elements.js";
import createEntry from "./admin-product-create.js"
import editEntry from "./admin-product-edit.js"
import deleteEntry from "./admin-product-delete.js"

export function formModal(formId) {
    const templateInputGrops = `
                                <div class="accordion accordion-flush my-3" id="accordionFlushExample">
                                <div class="accordion-item">
                                  <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                      Category
                                    </button>
                                  </h2>
                                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div>
                                            <div class="form-check">
                                                <input class="form-check-input category-check" type="radio" name="options" id="check-filter-arms" value="arms" checked>
                                                <label class="form-check-label text-primary" for="check-filter-arms">
                                                Arms
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input category-check" type="radio" name="options" value="legs" id="check-filter-legs">
                                                <label class="form-check-label text-primary" for="check-filter-legs">
                                                Legs
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input category-check" type="radio" name="options" value="chest" id="check-filter-chest">
                                                <label class="form-check-label text-primary" for="check-filter-chest">
                                                Chest
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input category-check" type="radio" name="options" value="torso" id="check-filter-torso">
                                                <label class="form-check-label text-primary" for="check-filter-torso">
                                                Torso
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input category-check" type="radio" name="options" value="head" id="check-filter-head">
                                                <label class="form-check-label text-primary" for="check-filter-head">
                                                head
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                            <div class="mb-3">
                              <label for="title" class="form-label">Title</label>
                              <input type="text" class="form-control" id="title" placeholder="Product title...">
                            </div>
                            <div class="mb-3">
                              <label for="price" class="form-label">Price</label>
                              <input type="number" class="form-control" id="price" placeholder="Product price..."">
                            </div>
                            <div class="mb-3">
                              <label for="description" class="form-label">Description</label>
                              <textarea class="form-control" id="description" rows="3" placeholder="#This is an example of a description excerpt using hashes##"></textarea>
                            </div>
                            <div class="mb-3">
                              <p class="mb-2">Featured Item?</p> 
                              <div class="form-check form-check-inline">
                                  <input class="form-check-input featured-check" type="radio" name="featured-option" id="featured-true" value="true">
                                  <label class="form-check-label" for="featured-true">True</label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input class="form-check-input featured-check" type="radio" name="featured-option" id="featured-false" value="false" checked>
                                  <label class="form-check-label" for="featured-false">False</label>
                                </div>
                            </div>
                            <div class="mb-3">
                              <p class="mb-2">Base product or upgrade</p> 
                              <div class="form-check form-check-inline">
                                  <input class="form-check-input base-upgrade-check" type="radio" name="sub-category-option" id="base" value="base" checked>
                                  <label class="form-check-label" for="base">Base</label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input class="form-check-input base-upgrade-check" type="radio" name="sub-category-option" id="upgrade" value="upgrade">
                                  <label class="form-check-label" for="upgrade">Upgrade</label>
                                </div>
                            </div>
                            <div class="mb-3">
                              <label for="basic-url" class="form-label">Image URL</label>
                              <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon3">https://</span>
                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder="res.cloudinary.com/">
                              </div>
                            </div>
                            <div class="input-group mb-3">
                              <span class="input-group-text" id="basic-addon2">Product ID</span>
                              <input class="form-control" type="text" value="N/A" aria-describedby="basic-addon2" aria-label="readonly input example" readonly>
                            </div>
                                `;


    const modal = `
    <!-- Button trigger modal -->
              <button
                type="button"
                class="btn bg-primary fa-solid fa-plus text-white rounded-circle p-0 shadow"
                style="font-size: 1.5rem; height: 3rem; width: 3rem;"
                data-bs-toggle="modal"
                data-bs-target="#admin-add-modal"
                id="open-modal"
              >
              </button>

              <!-- Modal -->
              <div
                class="modal fade text-primary"
                style="z-index: 9999"
                id="admin-add-modal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Manage Products
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <form id=${formId}>
                        <div class="modal-body">
                            ${templateInputGrops}
                        </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        id="close-modal"
                      >
                        Close
                      </button>
                        <button type="submit" class="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
    `;
    const modalContainer = createElement("div", "")
    modalContainer.innerHTML = modal;

    modalContainer.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log(e.target)
      const formInput = e.target;
      let category;
      let featured;
      let baseOrUpgrade;

      formInput.forEach(item =>  {
        if(item.classList.contains("category-check") && item.checked === true) {
          category = item.value;
        }
        if(item.classList.contains("featured-check") && item.checked === true) {
          featured = item.value
        }
        if(item.classList.contains("base-upgrade-check") && item.checked === true) {
          baseOrUpgrade = item.value
        }
      });
      console.log(formInput)
      const object = {
          title: formInput[6].value,
          description: formInput[8].value,
          category: category,
          featured: formInput[6],
          price: formInput[7].value,
          image_url: formInput[13].value,
          featured: featured,
          tag: baseOrUpgrade
      }
      if(formInput[14].value === "N/A") {
        createEntry(object);
      } else {
        editEntry(object, parseInt(formInput[14].value));
      }
    })
    return modalContainer;
}

export function confirmDeleteModal() {
    const template = `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Launch static backdrop modal
    </button>
    
    <!-- Modal -->
    <div class="modal fade" style="z-index: 9999" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <form>  
        <div class="modal-dialog text-primary">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Warning!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Product ID: <span id="delete-product-id"></span></p>
                <p>Are you sure you want to delete this entry?</p>
              </div>
              <div class="modal-footer bg-primary-variant">
                <button type="button" class="btn text-white bg-primary" data-bs-dismiss="modal">No</button>
                <button type="submit" class="btn text-white bg-secondary">Yes</button>
              </div>
            </div>
          </div>
        </form>
    </div>
    
    `;
    const container = createElement("div", "", "id", "confirm-delete", "", template);
    container.addEventListener("submit", (e) => {
        e.preventDefault()
        deleteEntry(selectElement("#delete-product-id").value)
    })
    return container;
}