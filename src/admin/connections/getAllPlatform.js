import axios from "axios";
import mainUrl from "./mailUrl";
import { getToken } from "../authentication/authentication";
async function getAllPlatforms(){
    const token = getToken();
    const headers = {
        'Authorization': token,
      } 
    const url = mainUrl() +"/admin/platform/get";
    return await axios.get(url,{headers})
    .then(response => {
        return response.data;
      })
      .catch(error =>{
        let return_data = {error: true , data : error}
        return return_data  ;
      })
}
export default getAllPlatforms;