import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UncontrolledTooltip } from "reactstrap";

function DetailUsers({user}) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  // const users = data
  console.log(user);

  return (
    <>
      <Button id="btn-detail-user" variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>

      <UncontrolledTooltip
        delay={0}
        placement="top"
        target="btn-detail-user"
      >
        Ver detalles del usuario
      </UncontrolledTooltip>
      
      <Modal show={isShow} size={"lg"} className=" color">

        <Modal.Header className="justify-content-end pb-0">
          <i className="fas fa-remove" style={{cursor: 'pointer'}} onClick={initModal}></i>
        </Modal.Header>
        <div className="container">
          <Modal.Body>
              <Form.Group className="text-center mb-4">
                <h1>Detalles usuario</h1>
                <hr className="mt-3"></hr>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Usuario</Form.Label>
                <h3>{user.first_name} {user.last_name}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Perfil (Quemado)</Form.Label>
                <h3>Instructor</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Correo</Form.Label>
                <h3>{user.email}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Número de contacto</Form.Label>
                <h3>{user.contact_number}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Número de identificación</Form.Label>
                <h3>{user.document_number}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Centro de formación</Form.Label>
                <h3>{user.training_center.training_center}</h3>
              </Form.Group>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default DetailUsers;
