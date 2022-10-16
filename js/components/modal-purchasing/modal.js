import { createElement } from "../../utils/manage-elements.js";

export default function () {
    const modal = `
    <!-- Button trigger modal -->
              <button
                type="button"
                class="btn text-white"
                data-bs-toggle="modal"
                data-bs-target="#modal-credit"
              >
              <i class="fa-solid fa-credit-card text-white"></i>
              </button>
              <!-- Modal -->
              <div
                style="z-index: 9999"
                class="modal fade"
                id="modal-credit"
                tabindex="-1"
                aria-labelledby="modal-credit-label"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content bg-primary">
                    <div class="modal-header bg-gradient-card">
                      <h5 class="modal-title text-primary font-special" id="modal-credit-label">
                        SARIF CREDITS
                      </h5>
                      <button
                        type="button"
                        class="btn-close filter-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <form id="form-credit-purchase" class="container">
                        <div class="modal-body row bg-primary">
                            <div name="current-balance" class="col d-flex align-items-center">
                                <div>
                                    <h6 class="font-heading">CURRENT BALANCE</h6>
                                    <p>0 CREDITS</p>
                                </div>
                            </div>
                            <div name="add-credit" class="col d-flex flex-column mt-3">
                                <div class="d-flex align-items-center mt-2">
                                    <div>
                                        <i class="btn d-block bg-secondary">
                                            <i class="fa-solid fa-chevron-up text-white"></i>
                                        </i>
                                        <i class="btn d-block bg-primary-variant mt-1">
                                            <i class="fa-solid fa-chevron-down text-white"></i>
                                        </i>
                                    </div>
                                    <div class="mx-3">
                                        <label class="d-block">CREDIT</label>
                                        <span class="d-block" id="display-amount-credit">0</span>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center mt-3">
                                    <div>
                                        <i class="btn d-block bg-secondary">
                                            <i class="fa-solid fa-chevron-up text-white"></i>
                                        </i>
                                        <i class="btn d-block bg-primary-variant mt-1">
                                            <i class="fa-solid fa-chevron-down text-white"></i>
                                        </i>
                                    </div>
                                    <div class="mx-3">
                                        <label class="d-block">USD</label>
                                        <span class="d-block" id="display-amount-dollars">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="modal-footer bg-light row">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                        <button type="submit" class="btn bg-secondary text-white font-special">
                          PURCHASE
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
    `;
    const modalContainer = createElement("div")
    modalContainer.innerHTML = modal;
    return modalContainer;
}