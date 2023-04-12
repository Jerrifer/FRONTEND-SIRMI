import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import axios from "axios";
// import {BASE_URL} from 'globals.constans';
import "./input.css";
import { Card } from "reactstrap";

function AssignCompetences(data) {

  const [ isShow, invokeModal ] = useState(false);
  // const [field, setField] = useState([]);

  const initModal = () => {
    return invokeModal(!isShow);
  };
  console.log(data.competences);

  const [formationProgram] = useState(data.formationProgram);
  const [competences] = useState(data.competences);

  return (
    <>
      <button className="btn btn-success ml-4 bg-success" onClick={initModal}>Asignar</button>

      <Modal show={isShow} size={"lg"} className=" color">

        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-4">
                <h2>{formationProgram}</h2>
              </Form.Group>

              {competences.map((competence) => {
                return (
                <Card className="mt-2">
                  <Form.Group key={competence._id}>
                    <h4>{competence.labor_competition}</h4>
                  </Form.Group>
                </Card>)
              }).slice(0, 5)}
              
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

export default AssignCompetences;
