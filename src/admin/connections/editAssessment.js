import axios from "axios";
import mainUrl from "./mailUrl";
import { getToken } from "../authentication/authentication";
const editAssessment =async ({data})=>{
    console.log(data);
    const url = mainUrl() + "/admin/assessment/edit/"+data["_id"];
    const token = getToken();
    const headers = {
        "Authorization" :  token
    }
    return await axios.post(url, data, {headers} )
    .then(response=>{
        return response.data;
    })
    .catch(error=>{
        let return_data= {error : true , data : error.data}
        return return_data ;
    })
}

export default editAssessment ;