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
        onClick={initModal}
      >
        <i className="fas fa-eye-solid fa-eye" />
      </Button>
      <UncontrolledTooltip
        className="tooltip-inner"
        delay={0}
        target="btn-program-detail"
      >
        Ver detalle de competencia
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color ">
        <Modal.Header className="justify-content-end pb-0">
          <i className="fas fa-remove" style={{cursor: 'pointer'}} onClick={initModal}></i>
        </Modal.Header>
        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-5">
                <h1>Detalles competencia laboral</h1>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Competencia laboral</Form.Label>
                <h3>{Competence.labor_competition}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Código de la competencia laboral</Form.Label>
                <h3>{Competence.labor_competence_code}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Versión de la competencia laboral</Form.Label>
                <h3>{Competence.labor_competition_version}</h3>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Duración estimada</Form.Label>
                <h3>{Competence.duration || "Sin registrar"}</h3>
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
        </div>
      </Modal>
    </>
  );
}

export default DetailCompetence;
