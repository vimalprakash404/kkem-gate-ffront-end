import axios  from "axios";
async function getAllAssessment(token){
    const headers = {
        'Authorization': token,
      } 
    const url = "http://localhost:4001/assessment/"
    return await axios.post(url,{},{headers})
    .then(response => {
        console.log("______________assessment",response.data)
        return response.data;
      })
      .catch(error =>{
        let return_data = {error: true , data : error}
        return return_data  ;
      })
}

export default getAllAssessment ;