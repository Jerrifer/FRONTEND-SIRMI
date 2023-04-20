import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UncontrolledTooltip } from "reactstrap";

function DetailOtheractivity({ Competence }) {
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
        Ver detalle de competencia
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color ">
        <Modal.Header>
          <Modal.Title>activityuu </Modal.Title>
        </Modal.Header>
        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-5">
                <h2>{Competence.activity}</h2>
              </Form.Group>
              <Form.Group>
                <Form.Label>Código del programa de formación</Form.Label>
                <h3 className="ml-4">{Competence.description}</h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Versión del programa de formación</Form.Label>
                <h3 className="ml-4">{Competence.hours}</h3>
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

export default DetailOtheractivity;
