import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SignUpForm from "./signUpForm";
import React from "react";

function SignUpModal(props) {
  return (
    <Modal {...props} aria-labelledby="example-modal-sizes-title-sm" centered>
      <Modal.Body>
        <SignUpForm />
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
