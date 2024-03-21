import React from 'react';
import { Col, Nav } from 'react-bootstrap';
import MenuITem from './MenuItem';
import './Sidebar.css';
import { faHome, faPenNib , faSquarePollVertical} from '@fortawesome/free-solid-svg-icons';
const Sidebar = ({changeTab , active }) => {
  console.log("active"+active)
  return (
    <Col  md={4} sm={12} xl={2} xs={12} xxl={2} className="bg-light sidebar" style={{position:"relative",bottom:1, top:1}}>
    <Nav className="flex-column">
      <Nav.Link href="#" className={active === "dd" ? "active" : ""} onClick={() => changeTab("home")} ><MenuITem icon={faHome} title="Home" active={active === "home" ? true : false}/></Nav.Link>
      <Nav.Link href="#" className={active === "assessment" ? "active" : ""} onClick={() => changeTab("assessment")} ><MenuITem icon={faPenNib} title="Assessment" active={active === "assessment" ? true : false}/></Nav.Link>
      <Nav.Link href="#" className={active === "result" ? "active" : ""} onClick={() => changeTab("result")}><MenuITem icon={faSquarePollVertical} title="Result" active={active === "result" ? true : false}/></Nav.Link>
    </Nav>
  </Col>
  );
};

export default Sidebar;
