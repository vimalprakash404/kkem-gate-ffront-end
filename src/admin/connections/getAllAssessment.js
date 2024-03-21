import axios from "axios";
import { getToken } from "../authentication/authentication";
import mainUrl from "./mailUrl";
async function getAllAssessment(){
    const token = getToken();
    const headers = {
        'Authorization': token,
      } 
    const url = mainUrl() +"/assessment";
    return await axios.post(url,{headers})
    .then(response => {
        return response.data;
      })
      .catch(error =>{
        let return_data = {error: true , data : error}
        return return_data  ;
      })
}
export default getAllAssessment;