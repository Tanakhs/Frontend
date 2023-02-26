import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SignUpModal from "./signUpModal";

function MainNavbar() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Navbar bg="light" expand="lg" style={{ marginBottom: "2rem" }}>
      <Container fluid>
        <Navbar.Brand href="/">תנ"כס</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="#action1">הברית הישנה</Nav.Link>
            <Nav.Link href="#action2">הברית החדשה</Nav.Link>
            <Nav.Link href="#">קוראן</Nav.Link>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav.Link href="#" onClick={() => setModalShow(true)}>
              הירשם
            </Nav.Link>

            <SignUpModal show={modalShow} onHide={() => setModalShow(false)} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
