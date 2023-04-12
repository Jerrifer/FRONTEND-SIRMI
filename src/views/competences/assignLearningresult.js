import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import Multiselect from 'multiselect-react-dropdown';
// import axios from "axios";
// import {BASE_URL} from 'globals.constans';
import "./input.css";

function AssignLearningresult(data) {

  const [ isShow, invokeModal ] = useState(false);
  // const [field, setField] = useState([]);

  const initModal = () => {
    return invokeModal(!isShow);
  };
  

  const [formationProgram] = useState(data.formationProgram);
  // const [competences] = useState(data.competences);

  return (
    <>
      <Button className="btn-icon-only" variant="" onClick={initModal}>
        <i className="fas fa-circle-plus" />
      </Button>

      <Modal show={isShow} size={"lg"} className=" color">
        <Modal.Header>
          <Modal.Title>
            Programa de formaión... {formationProgram._id}
          </Modal.Title>
        </Modal.Header>

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

export default AssignLearningresult;
