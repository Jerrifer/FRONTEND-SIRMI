import React, { useState } from "react";
import { Modal, Button, Form, Accordion } from "react-bootstrap";
// import axios from "axios";
// import {BASE_URL} from 'globals.constans';
import "./input.css";
import { Card } from "reactstrap";
function DetailFormationProgram(data) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  // console.log(data.formationProgram);
  const [formationProgram] = useState(data.formationProgram);
  const [thematicLine] = useState(formationProgram.thematic_line);
  const [typeProgram] = useState(formationProgram.type_program);
  const [programLevel] = useState(formationProgram.program_level);
  const [competences] = useState(formationProgram.competences);

  return (
    <>
      <Button className="btn-icon-only" variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>

      <Modal show={isShow} size={"lg"} className=" color">
        {/* <Modal.Header>
          <Modal.Title>
          </Modal.Title>
        </Modal.Header> */}

        <div className="container">
          <Modal.Body>
            <div className="container ">
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
                <h3 className="ml-4">{formationProgram.total_duration}</h3>
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

              <Form.Group className="text-center">
                <Form.Label>Competencias laborales</Form.Label>
              </Form.Group>

              {/* {competences.map((competence) => {
                return <Form.Group key={competence._id}><h4>{competence.labor_competition}</h4></Form.Group>
              })} */}
              <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header >
                      <h3>Competencias laborales</h3>
                </Accordion.Header>
                  <Accordion.Body>
                  {competences.map((competence) => {
                    return  <Form.Group key={competence._id}><Card className="p-2 mt-2"><h4 className="mt-2">{competence.labor_competition}</h4></Card></Form.Group>
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
