import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import Sidebar from "../components/Sidebar";
import CertificateTable from "../components/CertificateTable";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";


const Dashboard = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Fetch certificates from backend
    axios
      .get(`${BASE_URL}/api/certificates`)
      .then((res) => setCertificates(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10} className="p-4">
            <h3>Certificate History</h3>
            <CertificateTable certificates={certificates} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
