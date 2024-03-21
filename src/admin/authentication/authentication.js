import axios from "axios";
import mainUrl from "../connections/mailUrl";

const saveToken =(value)=>{

    sessionStorage.setItem("token",value);
}

const getToken = ()=>
{
    return sessionStorage.getItem("token");
}

const removeToken=()=>{
    return sessionStorage.removeItem("token");
}

const checkIsLoggedIn=async()=>{
    try {
        const url = mainUrl() + "/admin/verify";
        const token = getToken();
        const headers = {
          'authorization': token,
          'Content-Type': 'application/json'
        };
        const requestBody = {
          // Your request body data
        };
    
        const response = await axios.post(url, requestBody, { headers });
        console.log(response.data);
        return { err: false, response: response.data };
      } catch (error) {
        console.error(error);
        return { err: true, response: error.response };
      }
}

const isLoggedIn =async ()=>{
        console.log("hoi");
        const getResponse =async ()=>{
        const response= await checkIsLoggedIn();
        console.log("isLoggedIn"+response);
        if(response.err===false){
            if(response.response.status===true){
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    return await getResponse();
    
}

export  {getToken ,saveToken,removeToken,isLoggedIn };