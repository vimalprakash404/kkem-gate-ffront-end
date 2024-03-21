import axios from "axios";
async function userDetails(token){
    const headers = {
        'Authorization': token,
      } 
    const url = "http://localhost:4001/candidate/get"
    return await axios.post(url,{},{headers})
    .then(response => {
        return response.data;
      })
      .catch(error =>{
        let return_data = {error: true , data : error}
        return return_data  ;
      })
}

export default userDetails ;