import axios from "axios";
import mainUrl from "./mailUrl";
import { getToken } from "../authentication/authentication";
const addPlatform=async({data})=>{
    const token = getToken();
    const headers = {
        'Authorization': token,
      } 
    const url = mainUrl()+"/admin/platform/add";
    return (await axios.post(url, data,{ headers })
    .then(response=>{
        return {err:false, response: response}
    })
    .catch(error =>{
        let returnData ={err:true, response:error.response}
        console.log(error);
        return returnData;
    })
    )
}

export default addPlatform;