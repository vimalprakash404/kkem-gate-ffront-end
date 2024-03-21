import axios from "axios";
import  mainUrl from "./mailUrl"
const Login =async (username,password)=>{
    const data ={username , password}
    const url = mainUrl()+"/admin/login";
    console.log(url)
    return (await axios.post(url, data)
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

export default Login;