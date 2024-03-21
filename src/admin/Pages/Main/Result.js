
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { faBookOpen, faHourglass1, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import getAllResult from "../../connections/getResult";
import DataTable from "../../components/Table/DataTable";
import getSingleResult from "../../connections/getSingleResult";
// import LogTable from "../components/LogTable/LogTable";
import { Modal, Button } from "react-bootstrap";
import resultCount from "../../connections/counts/resultCount";

const Result = () => {
  const [show, setShow] = useState();
  const [result, setResult] = useState();
  const [resultPopUp, setResultPopUp] = useState();
  const [totalExams, setTotalExams] = useState();
  const [totalPendingExams , setTotalPendingExams ]= useState();
  const [totalPublishExam , setTotalPublish] = useState(); 
  useEffect(() => {
    async function getData() {
      const response = await getAllResult();
      setResult(response.data);
      const result =await resultCount();
      console.log("Result",result["response"]);
      setTotalExams(result["response"]["totalExam"]);
      setTotalPendingExams(result["response"]["pendingExam"]);
      setTotalPublish(result["response"]["publishedExam"]);
    }
    getData();
  }, [])
  useEffect(() => {
    if (resultPopUp !== undefined)
      handleOpen();
  }, [resultPopUp])
  const handleViewResult = (id) => {
    async function getAllData() {
      const response = await getSingleResult(id);
      console.log(response);
      setResultPopUp(response.data);

    }
    getAllData();
  }

  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resultPopUp && Object.keys(resultPopUp).map(key => (
           <h3><div key={key}>
              {key}: {resultPopUp[key]} {/* Render each value */}
            </div></h3> 
          ))}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row" style={{ width: "100%" }}>
        <Card cardTitle="Exams" Icon={faBookOpen} Count={totalExams} />
        <Card cardTitle="Pending Result" Icon={faHourglass1} Count={totalPendingExams} />
        <Card cardTitle="Result Published" Icon={faPenFancy} Count={totalPublishExam} />
      </div>
      <div className="row" style={{ width: "100%", marginTop: "20px" }}>
        <div className="col-12">
          <DataTable data={result} title="Exam" view={true} handleView={handleViewResult} />
        </div>

      </div>
    </>

  );
}

export default Result;