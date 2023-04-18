import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UncontrolledTooltip } from "reactstrap";

function DetailContracts({ contract }) {

  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  const user = contract.user;

  return (
    <>
      <Button id="btn-detail-contract" variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>

      <UncontrolledTooltip
        className="tooltip-inner"
        delay={0}
        placement="top"
        target="btn-detail-contract"
      >
          Ver detalles del contrato
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color ">

        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-4">
                <h2>Contrato de {user.first_name} {user.last_name}</h2>
              </Form.Group>

              <Form.Group>
                <Form.Label>Número de contrato</Form.Label>
                <h3 className="ml-4">{contract.contract_number}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Objeto</Form.Label>
                <h3 className="ml-4">{contract.object}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Pago</Form.Label>
                <h3 className="ml-4">{contract.pay}</h3>
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha inicio</Form.Label>
                <h3 className="ml-4">{contract.start_date}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Fecha fin</Form.Label>
                <h3 className="ml-4">{contract.end_date}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Tipo de contrato</Form.Label>
                <h3 className="ml-4">{contract.type_contract}</h3>
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

export default DetailContracts;
