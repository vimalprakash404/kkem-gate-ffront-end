import axios  from "axios";
async function createTest(assessment,candidate){ 
    const data= {
        assessment , candidate
    }
    const url = "http://localhost:4001/test/create"
    return await axios.post(url,data)
    .then(response => {
        return response.data;
      })
      .catch(error =>{
        let return_data = {error: true , data : error}
        return return_data  ;
      })
}

export default createTest ;