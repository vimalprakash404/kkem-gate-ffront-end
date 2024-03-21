import axios from "axios"
import mainUrl from "./mailUrl";
import { getToken } from "../authentication/authentication";

const removePlatform =({id})=>{
    const url = mainUrl() + "/admin/platform/remove/"+id;
    const  token = getToken();
    const headers = {
        "Authorization" : token
    }
    return  axios.post(url,{headers})
    .then(
        (response) =>{
            return response.data;
        }
    )
    .catch(error => {
        const returnData= {error : true , data : error}
        return returnData ; 
    } )
}
export default removePlatform ;