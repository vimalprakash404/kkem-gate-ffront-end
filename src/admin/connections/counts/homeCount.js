import axios from "axios";
import mainUrl from "../mailUrl";
import { getToken } from "../../authentication/authentication";

async function homeCount(){
    const token = getToken();
    const headers = {
        'Authorization' :  token ,
    }
    const url = mainUrl()+"/admin/count/home" ; 
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

export default homeCount ;