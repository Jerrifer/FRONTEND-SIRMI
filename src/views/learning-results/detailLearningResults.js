import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DetailLearningResult({learningResult, competence}) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  console.log(learningResult);
  return (
    <>
      <Button variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>

      <Modal show={isShow} size={"lg"} className=" color">

      <Modal.Header>
        <Modal.Title>
          Resultado de aprendizaje...
        </Modal.Title>
      </Modal.Header>
        <div className="container">
          <Modal.Body>
            <div className="container">
              <Form.Group className="text-center mb-4">
                <h2>{learningResult.learning_result}</h2>
              </Form.Group>

              <Form.Group>
                <Form.Label>Competencia</Form.Label>
                <h3 className="ml-4">{competence.labor_competition}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Código de la competencia</Form.Label>
                <h3 className="ml-4">{competence.labor_competence_code}</h3>
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

export default DetailLearningResult;
