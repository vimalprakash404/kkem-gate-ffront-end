// Layout.js

import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; 
import Sidebar from './Sidebar';
import './Layout.css'; // Import custom CSS file for layout styles
import Logo from "../../assets/header.png";
import {  useNavigate } from 'react-router-dom';
import { isLoggedIn ,removeToken } from '../authentication/authentication';
const Layout = ({ children , changeTab , active}) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const navigate = useNavigate();

  const redirectToHome = () => {
    // Redirect to the home page
    removeToken()
    navigate("/login")
  };
  

  useEffect(()=>{
    const checkLogin = async()=>{
    
    const isLogged= await isLoggedIn();
    console.log("sdsd")
    if(isLogged!==true){
      navigate("/login")
    }
  } 
  checkLogin();
});
  return (
    <div className="layout-container">
      <Row>
       
          <header className="bg-white d-flex justify-content-between align-items-center p-3 shadow-sm">
            <div>
              <Button variant="light" onClick={toggleSidebar}>
                {showSidebar ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
              </Button>
              <img src={Logo} alt="logo" width="220px" className="nav-bar-logo" />
            </div>
            <Button variant="danger" style={{width:"50px"}} onClick={redirectToHome}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
          </header>
        
      </Row>
      <Row>
        {/* <Col md={showSidebar ?  2: ''}> */}
          {showSidebar && <Sidebar changeTab={changeTab} active={active}/>}
        {/* </Col> */}
        <Col md={showSidebar ? 8: 12} xs={12} sm={12} xl={showSidebar ? 10: 12} xxl={showSidebar ? 10: 12}  className='main-content' style={{paddingLeft:"50px"}}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default Layout;
