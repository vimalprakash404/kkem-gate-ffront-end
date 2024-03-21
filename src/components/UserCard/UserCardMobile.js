import React, { useState, useRef, useEffect } from "react";
import "./UserCard.css"
import { FaIdCardAlt, FaRegUser, FaPenAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMobileScreenButton } from "react-icons/fa6";
import SelectBox from "../SelectBox";
import getAllAssessment from "../../connection/getAssessement";
import createTest from "../../connection/postCreateTest";
import { IoLocation } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { Collapse } from "bootstrap";
const UserCardMobile = ({ title, Name, kkem_id, email, mobile, district, buttonOnClick, hider, candidate_ref }) => {

    useEffect(() => {
        async function getAssessementData() {
            if (assessment_data === undefined)
                setAssessmentData(await getAllAssessment())
        }
        getAssessementData()
    })


    function closeDescription() {
        var myCollapse = document.getElementById('collapseTarget')
        var bsCollapse = new Collapse(myCollapse, { toggle: false })
        bsCollapse.hide();
        document.getElementById("select_box").value="Select Test";
    }
    function openDescription() {
        var myCollapse = document.getElementById('collapseTarget')
        var bsCollapse = new Collapse(myCollapse, { toggle: false })
        bsCollapse.show()

    }
    const [assessment_data, setAssessmentData] = useState(undefined);
    const selectRef = useRef(null);
    function formSubmit() {
        const selectedValue = selectRef.current.value;
        if (selectedValue === "Select Test") {
            alert("plase select test")
        }
        else {
            const candidate = candidate_ref.current.value;
            //alert(candidate)
            async function createTestNow() {
                const responce = await createTest(selectedValue, candidate);
                console.log("test data", responce)
                if (responce.error === true) {
                    alert(responce.data)
                } else {
                    window.location.href = responce.autoLoginURL;
                }
            }
            createTestNow()
            // window.location.href = test_data.autoLoginURL
        }

    }
    const getTestDescription = (_id) => {
        // Find the assessment with the matching _id
        const assessment = assessment_data.find((item) => item["id"] === _id);

        // If assessment is found, return the test_description, otherwise return a default message
        return assessment ? assessment['Test Description'] : 'Test description not found';
    };
    const [description, setDescription] = useState("description here")
    const handleSelectChange = (event) => {
        const selectedValue = selectRef.current.value;
        if (selectedValue !== "Select Test") {
            openDescription()
        } else {
            closeDescription()
        }
        setDescription(getTestDescription(event.target.value));
    };
    return (
        <div>
            <div className="middle-container d-flex  align-items-center mt-3 p-2top-container">
                <br />
                <div className="dollar-div px-3">

                    <div className="round-div"><FaRegUser className="dollar" /></div>

                </div>
                <div className="ml-3 text-body">
                    <h4 className="name">{Name}</h4>

                </div>
            </div>


            <div className="middle-container d-flex  mt-3 ">
                <br />
                <div className="dollar-div px-3">

                    <div className="round-div"><FaIdCardAlt className="dollar" /></div>

                </div>
                <div className="ml-3 text-body">
                    <h4 className="name">DWMS ID</h4>
                    <h4 className="mail">{kkem_id}</h4>
                </div>
            </div>

            <div className="middle-container d-flex   mt-3 ">
                <div className="dollar-div px-3">

                    <div className="round-div"><MdEmail className="dollar" /></div>

                </div>
                <div className="ml-3 text-body">
                    <div>
                        <h4 className="name">Email</h4>
                        <h4 className="mail">{email}</h4>
                    </div>

                </div>
            </div>

            <div className="middle-container d-flex   mt-3 ">
                <div className="dollar-div px-3">

                    <div className="round-div"><FaMobileScreenButton className="dollar" /></div>

                </div>
                <div className="ml-3 text-body">
                    <div>
                        <h4 className="name">Mobile</h4>
                        <h4 className="mail">{mobile}</h4>
                    </div>

                </div>
            </div>
            <div className="middle-container d-flex   mt-3 ">
                <div className="dollar-div px-3">

                    <div className="round-div"><IoLocation className="dollar" /></div>

                </div>
                <div className="ml-3 text-body">
                    <div>
                        <h4 className="name">District</h4>
                        <h4 className="mail">{district}</h4>
                    </div>

                </div>
            </div>
            {assessment_data !== undefined ? <div className="mt-3">
                <SelectBox assessment={assessment_data} handleSelectChange={handleSelectChange} selectRef={selectRef}/>
            </div> : <></>}
            <div className="collapse" id="collapseTarget">
                <div>
                    <div className="mt-3 card">
                        <h5>Description</h5>

                        {description}

                    </div>

                    <div className="mt-3">
                        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={formSubmit}>
                            Proceed to Assessment <FaPenAlt />
                        </button>
                        <button className="btn btn-danger" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={closeDescription}>
                            Cancel <MdCancel />
                        </button>
                    </div>
                </div>
            </div>


        </div>)
};
export default UserCardMobile;
