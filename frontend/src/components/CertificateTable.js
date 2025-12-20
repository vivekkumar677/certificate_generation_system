import React from "react";
import { Table } from "react-bootstrap";

const CertificateTable = ({ certificates }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Business</th>
          <th>GST Number</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((cert, idx) => (
          <tr key={cert.id}>
            <td>{idx + 1}</td>
            <td>{cert.name}</td>
            <td>{cert.email}</td>
            <td>{cert.business_name}</td>
            <td>{cert.gst_number}</td>
            <td>{cert.business_address}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CertificateTable;
