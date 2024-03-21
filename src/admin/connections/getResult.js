import axios from "axios";
import mainUrl  from "./mailUrl";
import { getToken } from "../authentication/authentication";

async function getAllResult() {
    const url = mainUrl() + "/admin/test/get/" ; 
    // fetching jwt token form browser local storage 
    const token = getToken () ; 
    const headers = {
        'Authorization' : token
    };


    // requesting  to server 
    return await axios.get(url, {headers})
    .then((response) =>{
        return response.data;
    })
    .catch(error =>{
        let return_data = {error : true , data : error}
        return return_data ;
    })
}
export default getAllResult ; 