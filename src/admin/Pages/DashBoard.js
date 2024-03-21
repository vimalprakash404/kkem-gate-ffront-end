import Layout from "../components/Layout";
import Assessment from "./Main/Assessment";
import Result from "./Main/Result";
import { useState } from "react";
import Home from "./Main/Home";
const Dashboard =()=>{
  const [mainContent,setMainContent] = useState("home");
  const changeTab =(index)=>{
    console.log("change the tab  " + index)
    setMainContent(index)
  }
    return (
        <Layout changeTab={changeTab} active={mainContent}>
          {mainContent === "home" ? <Home/>: mainContent === "assessment" ? <Assessment/> : mainContent === "result" ? <Result/> : "Home" }
          {/* <Result/> */}

        </Layout>
      );
}

export default Dashboard;