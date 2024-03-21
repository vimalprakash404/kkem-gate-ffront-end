import axios from "axios";
import { getToken } from "../authentication/authentication";
import mainUrl from "./mailUrl";

async function removeAssessment(id){
    const token = getToken()
    const headers = {
        'Authorization' : token 
    }
    const url = mainUrl() + "/admin/assessment/remove/"+id;
    return await axios.post(url, {headers})
    .then(response => {
        return response.data;
    })
    .catch(error=>{
        let return_data = {error : true , data :  error}
        return return_data ;
    })
}

export default removeAssessment;