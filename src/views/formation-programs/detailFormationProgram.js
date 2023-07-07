import React, { useState } from "react";
import { Modal, Button, Form, Accordion } from "react-bootstrap";
import "./input.css";
import { Card, Col, Row, UncontrolledTooltip } from "reactstrap";

function DetailFormationProgram({ formationProgram }) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  const thematicLine = formationProgram.thematic_line;
  const typeProgram = formationProgram.type_program;
  const programLevel = formationProgram.program_level;
  const competences = formationProgram.competences;

  return (
    <>
      <Button id={"btn-program-detail"+formationProgram.program_code} variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>
      <UncontrolledTooltip
        delay={0}
        target={"btn-program-detail"+formationProgram.program_code}
      >
        Ver detalles del programa
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color">
        <Modal.Header className="justify-content-end pb-0">
          <i className="fas fa-remove" style={{cursor: 'pointer'}} onClick={initModal}></i>
        </Modal.Header>

        <div className="container">
          <Modal.Body>
            <div className="">
              <Form.Group className="text-center mb-4">
                <h1 className="m-2">Detalles programa de formación</h1>
                <hr className="mt-3"></hr>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Programa de formación</Form.Label>
                <h3>{formationProgram.program_name}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Código del programa de formación</Form.Label>
                <h3>{formationProgram.program_code}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Versión del programa de formación</Form.Label>
                <h3>{formationProgram.program_version}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Duración estimada</Form.Label>
                <h3>{formationProgram.total_duration} (Meses)</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>línea tématica</Form.Label>
                <h3>{thematicLine.thematic_line}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Tipo del programa</Form.Label>
                <h3>{typeProgram.type_program}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Titulación del programa</Form.Label>
                <h3>{programLevel.program_level}</h3>
              </Form.Group>

              {/* {competences.map((competence) => {
                return <Form.Group key={competence._id}><h4>{competence.labor_competition}</h4></Form.Group>
              })} */}

              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Button className="custom-accordion-button">
                    Ver competencias laborales
                  </Accordion.Button>
                  <Accordion.Body>
                    {competences.map((competence) => {
                      return (
                        <Form.Group key={competence._id}>
                          <Card className="p-2 mt-2">
                            <Row>
                              <Col lg="1" className="d-flex align-items-center justify-content-center">
                                <i className="ni ni-check-bold" />
                              </Col>
                              <Col lg="11">
                                <h4 className="mt-2">
                                  {competence.labor_competition}
                                </h4>
                              </Col>
                            </Row>
                          </Card>
                        </Form.Group>
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default DetailFormationProgram;
