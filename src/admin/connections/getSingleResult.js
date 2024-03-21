import axios from "axios";
import { getToken } from "../authentication/authentication";
import mainUrl from "./mailUrl";
async function getSingleResult(id) {
    const token = getToken();
    const url = mainUrl() + "/admin/test/get/single/"
    const body = {
        id : id 
    }
    const headers = {
        Authorization : token
    } 

    return await axios.post(url,body , {headers})
    .then(response =>{
        console.log(response)
        return response.data;
    })
    .catch (error => {
        let return_data = {error : true , data : error}
        return return_data ;
    })
}
export default getSingleResult;