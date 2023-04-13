import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DetailLearningResult(data) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  console.log(data.users);
  const [learningResult] = useState(data.learningResult);
  const [competence] = useState(data.competence);

  console.log(learningResult);
  return (
    <>
      <Button className="btn-icon-only" variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>

      <Modal show={isShow} size={"lg"} className=" color">

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
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default DetailLearningResult;
