import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import {BASE_URL} from 'globals.constans';
import "./input.css";
import { swalWithBootstrapButtons } from "plugins/alerts";

function AssignCompetences(props) {

  const [ isShow, invokeModal ] = useState(false);
  const [selectedCompetencies, setSelectedCompetencies] = useState([]);

  const initModal = () => {
    return invokeModal(!isShow);
  };
  const formationProgram = props.program;
  const competences = props.competences;

  // http://localhost:3000/api/v1/formationprograms/assign/35445698

  const selectedCompetencia = async (e) => {
    e.preventDefault();
    const idsCompetence = selectedCompetencies.map(item => {
      const _idCompetence = item._id
      return _idCompetence;
    });

    console.log(idsCompetence);
    await axios.post(`${BASE_URL}formationprograms/assign/${formationProgram._id}`, {competences: idsCompetence})
    .then((respnose) => {
      console.log(respnose.data);
      initModal()
      swalWithBootstrapButtons.fire(
        'Registro exitoso',
        `Las competencias que seleccionaste fueron asignadas con éxito al programa de formación ${formationProgram.program_name}.`,
        'success'
      )
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <button className="btn btn-success ml-4 bg-success" onClick={initModal}>Asignar</button>

      <Modal show={isShow} size={"xl"} className="color">

        <div className="container">
          <Form onSubmit={selectedCompetencia}>
            <Modal.Body>
              <div className="container ">
                  <Form.Group className="text-center mb-4">
                    <h2>ASIGNAR COMPETENCIAS A: {formationProgram.program_name}</h2>
                  </Form.Group>

                  <Form.Group>
                    <Multiselect
                      displayValue="labor_competition"
                      onKeyPressFn={function noRefCheck(){}}
                      onRemove={function noRefCheck(){}}
                      onSearch={function noRefCheck(){}}
                      onSelect={function noRefCheck(e){
                        setSelectedCompetencies(e)
                      }}
                      options={competences}
                    />
                  </Form.Group>
              </div>
            </Modal.Body>
          
            <Modal.Footer className="justify-content-between">
              <Button variant="danger" onClick={initModal}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Asignar
              </Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default AssignCompetences;
