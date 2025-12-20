import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: "220px" }}>
      <h5>Menu</h5>
      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Nav.Link href="#">Dashboard</Nav.Link>
        <Nav.Link href="#">Generate Certificate</Nav.Link>
        <Nav.Link href="#">History</Nav.Link>
        <Nav.Link href="#">Settings</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
