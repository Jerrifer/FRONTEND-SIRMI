import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UncontrolledTooltip } from "reactstrap";

function DetailTitledFormation({ titledFormation }) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };


  return (
    <>
      <Button 
        variant="" 
        id="btn-titled-formation-detail"
        onClick={initModal}
      >
        <i className="fas fa-eye-solid fa-eye" />
      </Button>
      <UncontrolledTooltip
        className="tooltip-inner"
        delay={0}
        target="btn-titled-formation-detail"
      >
        Ver detalle reporte
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color ">
        <Modal.Header>
          <Modal.Title>Programación asignada... </Modal.Title>
        </Modal.Header>
        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group>
              <Form.Label>Ficha</Form.Label>
                <h2>{titledFormation.ficha}</h2>
              </Form.Group>
              <Form.Group>
                <Form.Label>Actividad</Form.Label>
                <h3 className="ml-4">{titledFormation.activity}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Horas al mes</Form.Label>
                <h3 className="ml-4">{titledFormation.hours_month}</h3>
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

export default DetailTitledFormation;
