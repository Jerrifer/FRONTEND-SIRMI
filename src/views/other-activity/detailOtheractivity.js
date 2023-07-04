import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UncontrolledTooltip } from "reactstrap";

function DetailOtheractivity({ Otheractivity, index }) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  // const formationPrograms = Competence.formation_programs;

  return (
    <>
      <Button variant="" 
      id={"btn-program-detail"+index}
      onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>
      <UncontrolledTooltip
        
        delay={0}
        target={"btn-program-detail"+index}
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
                <h1>Detalles otra actividad</h1>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Actividad</Form.Label>
                <h3>{Otheractivity.activity}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Código del programa de formación</Form.Label>
                <h3>{Otheractivity.description}</h3>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Versión del programa de formación</Form.Label>
                <h3>{Otheractivity.hours}</h3>
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
