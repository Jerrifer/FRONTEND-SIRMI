import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DetailCompetence(data) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  console.log(data.competence);
  const [Competence] = useState(data.competence);
  const [formationPrograms] = useState(Competence.formation_programs);

  return (
    <>
      <Button className="btn-icon-only" variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>

      <Modal show={isShow} size={"lg"} className=" color ">
        <Modal.Header>
          <Modal.Title>Programa de formaión... {Competence._id}</Modal.Title>
        </Modal.Header>

        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-4">
                <h2>{Competence.labor_competition}</h2>
              </Form.Group>
              <Form.Group>
                <Form.Label>Código del programa de formación</Form.Label>
                <h3 className="ml-4">{Competence.labor_competence_code}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Versión del programa de formación</Form.Label>
                <h3 className="ml-4">{Competence.labor_competition_version}</h3>
              </Form.Group>
              <Form.Group>
                <Form.Label>Duración estimada</Form.Label>
                <h3 className="ml-4">{Competence.duration}</h3>
              </Form.Group>

              {formationPrograms.map((formationProgram) => {
                return (
                  <Form.Group key={formationProgram._id}>
                    <h4>{formationProgram.program_name}</h4>
                  </Form.Group>
                );
              })}
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

export default DetailCompetence;
