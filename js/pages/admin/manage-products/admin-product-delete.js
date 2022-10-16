import { stringify, api} from "../../../data/api.js";
import { getLocalStorage } from "../../../utils/storage.js";


export default function deleteArticle(id) {
    makeChanges(id)
}

async function makeChanges(id){
    const token =  getLocalStorage("token");    
    const json = await api(
        stringify({id: id}),
        { Authorization : `bearer ${token}`},
        `products/${id}`,
        "DELETE"
      )
    const { response } = json;

    if (response.status === 200) {
        location.replace("/admin.html")
        console.log("removed node")
      } else {
        alert("You are not authorized to edit articles")
    }
}
