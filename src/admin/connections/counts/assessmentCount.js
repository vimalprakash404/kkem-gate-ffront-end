import axios from "axios";
import mainUrl from "../mailUrl";
import { getToken } from "../../authentication/authentication";


async function assessmentCount(){
    const token = getToken();
    const headers  = {
        'Authorization' : token
    }
    const url = mainUrl()+"/admin/count/assessment"
    return (await axios.post(url , {headers})
    .then(response=>{
        return {err : false , response : response.data}
    })
    .catch(error=>{
        let returnData = {err: true , response : error.response }
        return returnData ; 
    })
    )
}

export default assessmentCount;
