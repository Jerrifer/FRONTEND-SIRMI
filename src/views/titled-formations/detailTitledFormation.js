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
        <Modal.Header className="justify-content-end pb-0">
          <i className="fas fa-remove" style={{cursor: 'pointer'}} onClick={initModal}></i>
        </Modal.Header>
        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-5">
                <h1>Detalles reporte formación titulada</h1>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Ficha</Form.Label>
                <h3>{titledFormation.ficha}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Actividad</Form.Label>
                <h3>{titledFormation.activity}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Horas al mes</Form.Label>
                <h3>{titledFormation.hours_month}</h3>
              </Form.Group>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default DetailTitledFormation;
