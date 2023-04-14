import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DetailUsers(data) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  const [users] = useState(data.users);

  return (
    <>
      <Button className="btn-icon-only" variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>

      <Modal show={isShow} size={"lg"} className=" color">
        <Modal.Header>
          <Modal.Title>Programa de formaión... {users._id}</Modal.Title>
        </Modal.Header>

        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-4">
                <h2>{users.first_name}</h2>
                <Form.Group>
                  <Form.Label>last_name</Form.Label>
                  <h3 className="ml-4">{users.first_name}</h3>
                </Form.Group>
              </Form.Group>
              <Form.Group>
                <Form.Label>last_name</Form.Label>
                <h3 className="ml-4">{users.last_name}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>email</Form.Label>
                <h3 className="ml-4">{users.email}</h3>
              </Form.Group>
              <Form.Group>
                <Form.Label>password</Form.Label>
                <h3 className="ml-4">{users.password}</h3>
              </Form.Group>
              <Form.Group>
                <Form.Label>contact_number</Form.Label>
                <h3 className="ml-4">{users.contact_number}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>document_number</Form.Label>
                <h3 className="ml-4">{users.document_number}</h3>
              </Form.Group>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default DetailUsers;
