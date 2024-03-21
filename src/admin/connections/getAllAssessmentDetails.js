import axios from "axios";
import { getToken } from "../authentication/authentication";
import mainUrl from "./mailUrl";

const getAllAssessmentDetails = async () =>{
    const token = getToken();
    const headers = {"Authorization":token};
    const url = mainUrl() + "/admin/test/get"

    return await axios.get(url,headers)
    .then(response=>{
        return response.data;
    })
    .catch(error=>{
        let return_data = {error : true , data :  error}
        return return_data ;
    })
}
export default getAllAssessmentDetails;