import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DetailContracts(data) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  console.log(data.competence);
  const [contract] = useState(data.contract);

  return (
    <>
      <Button className="btn-icon-only" variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>

      <Modal show={isShow} size={"lg"} className=" color ">
        <Modal.Header>
          <Modal.Title>CONTRATO {contract._id}</Modal.Title>
        </Modal.Header>

        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-4">
                <h2>{contract.contract_number}</h2>
              </Form.Group>
              <Form.Group>
                <Form.Label>Código del programa de formación</Form.Label>
                <h3 className="ml-4">{contract.object}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Versión del programa de formación</Form.Label>
                <h3 className="ml-4">{contract.pay}</h3>
              </Form.Group>
              <Form.Group>
                <Form.Label>Duración estimada</Form.Label>
                <h3 className="ml-4">{contract.start_date}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Duración estimada</Form.Label>
                <h3 className="ml-4">{contract.end_date}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Duración estimada</Form.Label>
                <h3 className="ml-4">{contract.type_contract}</h3>
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

export default DetailContracts;
