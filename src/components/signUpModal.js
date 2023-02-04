import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SignUpForm from "./signUpForm";
import React from "react";

function SignUpModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">הירשם</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignUpForm />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpModal;
