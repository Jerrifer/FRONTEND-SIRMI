import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Col, Row, UncontrolledTooltip } from "reactstrap";

function DetailCompetence({ Competence }) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  // const formationPrograms = Competence.formation_programs;

  return (
    <>
      <Button variant="" 
        id={"btn-program-detail"+Competence.labor_competence_code}
        onClick={initModal}
      >
        <i className="fas fa-eye-solid fa-eye" />
      </Button>
      <UncontrolledTooltip
        delay={0}
        target={"btn-program-detail"+Competence.labor_competence_code}
      >
        Ver detalles de competencia
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className="color ">
        <Modal.Header className="justify-content-end pb-0">
          <i className="fas fa-remove" style={{cursor: 'pointer'}} onClick={initModal}></i>
        </Modal.Header>
        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-5">
                <h1 className="m-2">Detalles competencia laboral</h1>
                <hr className="mt-3"></hr>
              </Form.Group>

              <Form.Group className="mb-4 text-center">
                <Form.Label className="text-center">Competencia laboral</Form.Label>
                <h3>{Competence.labor_competition}</h3>
              </Form.Group>

              <Row>
                <Col lg="4">
                  <Form.Group className="mb-4">
                  <Form.Label>Código</Form.Label>
                  <h3>{Competence.labor_competence_code}</h3>
                  </Form.Group>
                </Col>
                <Col lg="4">
                  <Form.Group className="mb-4">
                    <Form.Label>Duración estimada</Form.Label>
                    <h3>{Competence.duration || "Sin registrar"}</h3>
                  </Form.Group>
                </Col>
                <Col lg="4">
                  <Form.Group className="mb-4">
                    <Form.Label>Versión</Form.Label>
                    <h3>{Competence.labor_competition_version}</h3>
                  </Form.Group>
                </Col>
              </Row>

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
