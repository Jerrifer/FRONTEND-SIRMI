import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UncontrolledTooltip } from "reactstrap";

function DetailLearningResult({learningResult, competence}) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  console.log(learningResult);
  return (
    <>
      <Button variant=""
      id="btn-program-detail"
       onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button> 
      <UncontrolledTooltip
        className="tooltip-inner"
        delay={0}
        target="btn-program-detail"
      >
        Ver detalle
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color">

        <Modal.Header className="justify-content-end pb-0">
          <i className="fas fa-remove" style={{cursor: 'pointer'}} onClick={initModal}></i>
        </Modal.Header>
        <div className="container">
          <Modal.Body>
            <div className="container">
              <Form.Group className="text-center mb-4">
                <h1>Detalles resultado de aprendizaje</h1>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Resultado de aprendizaje</Form.Label>
                <h3>{competence.learning_result}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Competencia</Form.Label>
                <h3>{competence.labor_competition}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Código de la competencia</Form.Label>
                <h3>{competence.labor_competence_code}</h3>
              </Form.Group>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default DetailLearningResult;
