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
        className="tooltip-inner"
        delay={0}
        placement="top"
        target="btn-detail-user"
      >
        Ver detalles del usuario
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color">

        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-4">
                <h2>Detalles de {user.first_name}</h2>
              </Form.Group>

              <Form.Group>
                <Form.Label>Apellidos</Form.Label>
                <h3 className="ml-4">{user.last_name}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Correo</Form.Label>
                <h3 className="ml-4">{user.email}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Número de contacto</Form.Label>
                <h3 className="ml-4">{user.contact_number}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Número ded identificación</Form.Label>
                <h3 className="ml-4">{user.document_number}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Centro de formación</Form.Label>
                <h3 className="ml-4">{user.training_center.training_center}</h3>
              </Form.Group>

            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default DetailUsers;
