import { stringify, api} from "../../../data/api.js";
import { getLocalStorage } from "../../../utils/storage.js";

export default function editArticle(object, id) {
    addChanges(object, id)
    /*if(simpleInputValidation(inputs)) {
        addChanges()
    }*/
}


async function addChanges(object, id){
    console.log(id)
    const token =  getLocalStorage("token");
    const json = await api(
        stringify(object),
        {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
        `products/${id}`,
        "PUT"
      )
    console.log(json)
    const { response } = json;

    if (response.status === 200) {
       location.reload()
      } else {
        alert("You are not authorized to edit articles")
    }
}