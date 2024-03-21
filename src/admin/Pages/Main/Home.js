import { faClipboardUser , faPerson } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import homeCount from "../../connections/counts/homeCount";
const Home =()=>{
    const [totalCandidate,setTotalCandidate] =  useState();
    const [totalAssessment , setTotalAssessment] =  useState();
    useEffect(()=>{
       async function getCount(){
            const data = await homeCount();
           
            setTotalAssessment(data["response"]["totalAssessment"])
            setTotalCandidate(data["response"]["totalCandidate"])
       } 
       getCount();
    },[])
    return (
        <div className="row" style={{width:"100%"}}>
            <Card cardTitle="No of candidate" Icon={faPerson} Count={totalCandidate}/>
            <Card cardTitle="No of Assessment" Icon={faClipboardUser} Count={totalAssessment}/>
        </div>
    )
}

export default Home ;