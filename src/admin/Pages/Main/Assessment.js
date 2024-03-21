
import Card from "../../components/Card/Card";
import { faBook , faBookOpen , faServer } from '@fortawesome/free-solid-svg-icons';
import DataTable from "../../components/Table/DataTable";
import { useState, useEffect } from "react";
import getAllAssessment from "../../connections/getAllAssessment";
import { Modal, Button, Form } from "react-bootstrap";
import getAllPlatforms from "../../connections/getAllPlatform";
import addAssessment from "../../connections/addAssessment";
import removeAssessment from "../../connections/removeAssessment";
import editAssessment from "../../connections/editAssessment";
import getAllAssessmentDetails from "../../connections/getAllAssessmentDetails";
import getAllPlatformDetails from "../../connections/getAllPlatformDetails";
import addPlatform from "../../connections/addPlatform";
import editPlatform from "../../connections/editPlatform";
import removePlatform from "../../connections/removePlatform";
import assessmentCount from "../../connections/counts/assessmentCount";
const Assessment = () => {
  const [assessmentData, setAssessmentData] = useState();
  const [assessmentDetailsData,setAssessmentDetailsData] = useState()
  const [platformDetails, setPlatformDetails] = useState([]);
  const [toggler, setToggler] = useState(false);
  const [platformDetailsData, setPlatformDetailsData] = useState();
  const [totalAssessment,setTotalAssessment] =  useState()
  const [totalAssessmentDetails, setTotalAssessmentDetails] =  useState();
  const [totalPlatform, setTotalPlatform] =  useState()
  useEffect(() => {
    async function setData() {
      const response = await getAllAssessment();

      setAssessmentData(response);
      const platformResponse = await getAllPlatforms();
      setPlatformDetails(platformResponse.data);

      const responseAllResult = await getAllAssessmentDetails();
    
      setAssessmentDetailsData(responseAllResult.data);

      const platformDetailsResponse = await getAllPlatformDetails();
      // console.log("original res",platformDetailsResponse); 

      const count =await assessmentCount();
      console.log("Assessment:",count["response"])
      setTotalAssessment(count["response"]["totalAssessment"])
      setTotalAssessmentDetails(count['response']['totalAssessmentDetails'])
      setTotalPlatform(count['response']['totalPlatforms'])
      setPlatformDetailsData(platformDetailsResponse.data);
    }
    setData()
  }, [toggler])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editModal, setEditModal] = useState(false);
  const handleModalClose = () => setEditModal(false);
  const handleModalShow = () => setEditModal(true);

  const [addPlatformModal,setAddPlatformModal] = useState(false);
  const showAddPlatform=()=>setAddPlatformModal(true);
  const closeAddPlatform=()=>setAddPlatformModal(false);


  function openAddModal(platformId){
    showAddPlatform();
  }
  function addData() {
    handleShow();
  }
  const [formData, setFormData] = useState({
    test_id: '',
    test_name: '',
    test_description: '',
    platform: ''
  });
  const toggleChanger = () => {
    setToggler(!toggler);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const [addPlatformData,setPlatFormData]= useState({
    name:'',
    baseUrl :'',
    authKey :''
  })

  const handleChangeAddPlatformData = (e) => {
    const { name, value } = e.target;
    setPlatFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addNewPlatform =() =>{
    const adder = async () =>{
      const response =  await addPlatform({data:addPlatformData});
      console.log(response)
    }
    adder();
    closeAddPlatform();
    toggleChanger();
  }
  const addNewAssessment = () => {
    const adder = async () => {
      const response = await addAssessment({ data: formData });
      console.log(response)
    }
    adder()
    handleClose()
    toggleChanger()
  }
  const handleRemove = (data) => {
    async function remover() {
      const response = await removeAssessment(data);
      console.log(response);
      setToggler(!toggler)
    }
    remover()
  }
  const [editData,setEditData] = useState({});
  const handleEdit = (data)=> {
    const platformId = platformDetails.find(element => element.name === data["Platform"])
    const newEditData = {
      _id : data["id"],
      test_id : data["Test id"],
      test_name : data["Test Name"],
      test_description :  data["Test Description"],
      platform : platformId["_id"]
    }

    setEditData(newEditData);
    handleModalShow()
  }

  const editDataToServer = ()=>{
    const updater = async()=>{
      const response =await editAssessment({data: editData});
      console.log(response)
      setToggler(!toggler);
      handleModalClose();
    } 
    updater();
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const editPlatformOnClick= (data)=>{
    const platformId = platformDetails.find(element => element.name === data["Name"])

    const reqData = {
      _id  :  data.id ,
      name : platformId['name'],
      baseUrl : platformId["baseUrl"],
      authKey : platformId["authKey"]
    }

    async function editor(){
      const result = await editPlatform({data : reqData});
      console.log("result", result)
    }
    editor();
  }

  const removePlatformOnClick=(id)=>{
    async function removeNow(){
      const  result = await removePlatform({id:id})
      console.log("dataset"+JSON.stringify(result))
    }
    removeNow();
    toggleChanger();
  }

  return (
    <>
      {toggler}
      <Modal show={addPlatformModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add Platform</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group controlId="Platform name ">
              <Form.Label>Platform Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={addPlatformData.name}
                onChange={handleChangeAddPlatformData}
                placeholder="Platform Name"
              />
            </Form.Group>

            <Form.Group controlId="Platform baseurl">
              <Form.Label>Platform Base URL</Form.Label>
              <Form.Control
                type="text"
                name="baseUrl"
                value={addPlatformData.baseUrl}
                onChange={handleChangeAddPlatformData}
                placeholder="Test Name"
              />
            </Form.Group>
            <Form.Group controlId="platform ">
              <Form.Label>Key</Form.Label>
              <Form.Control
                type="password"
                name="authKey"
                value={addPlatformData.authKey}
                onChange={handleChangeAddPlatformData}
                placeholder="Test Description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddPlatform}>
            Close
          </Button>
          <Button variant="primary" onClick={addNewPlatform}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group controlId="firstName">
              <Form.Label>Test Id</Form.Label>
              <Form.Control
                type="text"
                name="test_id"
                value={formData.test_id}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                name="test_name"
                value={formData.test_name}
                onChange={handleChange}
                placeholder="Test Name"
              />
            </Form.Group>
            <Form.Group controlId="test_description">
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                name="test_description"
                value={formData.test_description}
                onChange={handleChange}
                placeholder="Test Description"
              />
            </Form.Group>
            <Form.Group controlId="formDropdown">
              <Form.Label>Select Option</Form.Label>
              <Form.Select value={formData.platform} onChange={handleChange} name="platform">
                <option value="">Choose...</option>
                {platformDetails.map((element) => (
                  <option key={element._id} value={element._id}>{element.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNewAssessment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={editModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
            <Form.Group controlId="firstName">
              <Form.Label>Test Id</Form.Label>
              <Form.Control
                type="text"
                name="test_id"
                value={editData.test_id}
                onChange={handleEditChange}
                placeholder="Enter your first name"
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                name="test_name"
                value={editData.test_name}
                onChange={handleEditChange}
                placeholder="Test Name"
              />
            </Form.Group>
            <Form.Group controlId="test_description">
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                name="test_description"
                value={editData.test_description}
                onChange={handleEditChange}
                placeholder="Test Description"
              />
            </Form.Group>
            <Form.Group controlId="formDropdown">
              <Form.Label>Select Option</Form.Label>
              <Form.Select value={editData.platform} onChange={handleEditChange} name="platform" style={{width:"100%"}}>
                <option value="" style={{width:"100%"}}>Choose...</option>
                {platformDetails.map((element) => (
                  <option style={{width:"100%"}}  key={element._id} value={element._id}>{element.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editDataToServer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="row" style={{ width: "100%" }}>
        <Card cardTitle="Assessments" Icon={faBook} Count={totalAssessment} />
        <Card cardTitle="Assessment Details" Icon={faBookOpen} Count={totalAssessmentDetails} />
        <Card cardTitle="Assessment Platforms" Icon={faServer} Count={totalPlatform} />
      </div>
      <div className="row" style={{ width: "100%", marginTop: "20px" }}>
        <div className="col-12">
          <DataTable data={assessmentData} title="Assessment" add={true} addOnClick={addData} edit={true} remove={true} handleRemove={handleRemove}  handleEdit={handleEdit}/>
        </div>

      </div>
      <div className="row" style={{ width: "100%", marginTop: "20px" }}>
        <div className="col-12">
          <DataTable data={assessmentDetailsData} title="Assessment Details" />
        </div>

      </div>
      <div className="row" style={{ width: "100%", marginTop: "20px" }}>
        <div className="col-12">
          <DataTable data={platformDetailsData} title="Platforms" add={true} addOnClick={openAddModal} remove={true} edit={true} handleEdit={editPlatformOnClick} handleRemove={removePlatformOnClick}/>
        </div>
      </div>
    </>

  );
}

export default Assessment;