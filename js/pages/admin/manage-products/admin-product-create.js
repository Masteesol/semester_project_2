/*import { stringify, api } from "../../data/api.js";
import simpleInputValidation from "../../utils/simpleInputValidation.js";
*/

import { stringify, api} from "../../../data/api.js";
import { getLocalStorage } from "../../../utils/storage.js";

export default function(submitValue) {
        console.log(submitValue)
        saveArticle(submitValue)
}

async function saveArticle(submitValue){
    const token =  getLocalStorage("token");
    const apiCall = await api(
        stringify(submitValue),
        {"Content-Type": "application/json", "Authorization" : `bearer ${token}`},
        "products",
        "POST"
      )

    console.log(apiCall)

    const { response } = apiCall;

    if (response.status === 200) {
        location.reload();
      } else {
          alert("You are not authorized to add articles")
    }
}