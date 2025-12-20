import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Form, Button, Alert } from "react-bootstrap";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gst_number: "",
    business_name: "",
    business_address: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL)
    try {
      const res = await axios.post(
        `${BASE_URL}/api/certificates`,
        form
      );
      console.log("Backend response:", res.data); // <-- debug
      setMessage(res.data.message || "Certificate sent successfully");
    } catch (err) {
      console.error("Backend error:", err.response?.data || err); // <-- debug
      // Safely handle missing fields
      const backendData = err.response?.data;
      setMessage(
        backendData?.error
          ? backendData.error + (backendData?.details ? ` - ${backendData.details}` : "")
          : "Something went wrong"
      );
    }
  };


  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Certificate App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h2>Generate Certificate</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          {["name", "email", "gst_number", "business_name", "business_address"].map((field) => (
            <Form.Group className="mb-3" key={field}>
              <Form.Label>{field.replace("_", " ").toUpperCase()}</Form.Label>
              <Form.Control
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
}

export default App;
