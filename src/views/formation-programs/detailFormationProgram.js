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
      <Button id="btn-program-detail" variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>
      <UncontrolledTooltip
        className="tooltip-inner"
        delay={0}
        target="btn-program-detail"
      >
        Ver detalles del programa
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color">
        <Modal.Header>
          <Modal.Title>Programa de formación...</Modal.Title>
        </Modal.Header>

        <div className="container">
          <Modal.Body>
            <div className="">
              <Form.Group className="text-center mb-4">
                <h2>{formationProgram.program_name}</h2>
              </Form.Group>
              <Form.Group>
                <Form.Label>Código del programa de formación</Form.Label>
                <h3 className="ml-4">{formationProgram.program_code}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Versión del programa de formación</Form.Label>
                <h3 className="ml-4">{formationProgram.program_version}</h3>
              </Form.Group>
              <Form.Group>
                <Form.Label>Duración estimada</Form.Label>
                <h3 className="ml-4">{formationProgram.total_duration} (Horas)</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>línea tématica</Form.Label>
                <h3 className="ml-4">{thematicLine.thematic_line}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Tipo del programa</Form.Label>
                <h3 className="ml-4">{typeProgram.type_program}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Titulación del programa</Form.Label>
                <h3 className="ml-4">{programLevel.program_level}</h3>
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
                              <Col lg="1" className="">
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

export default DetailFormationProgram;
