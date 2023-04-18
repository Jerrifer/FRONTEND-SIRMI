import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UncontrolledTooltip } from "reactstrap";

function DetailCompetence({ Competence }) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  // const formationPrograms = Competence.formation_programs;

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
        Ver detalles de Competencia
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color ">
        <Modal.Header>
          <Modal.Title>Competencia... </Modal.Title>
        </Modal.Header>
        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-5">
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
                <h3 className="ml-4">{Competence.duration || "Sin registrar"}</h3>
              </Form.Group>

              {/* {formationPrograms.map((formationProgram) => {
                return (
                  <Form.Group key={formationProgram._id}>
                    <h4>{formationProgram.program_name}</h4>
                  </Form.Group>
                );
              })} */}
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

export default DetailCompetence;
