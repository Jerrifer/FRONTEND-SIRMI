import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Multiselect from 'multiselect-react-dropdown';
import "./input.css";
import { swalWithBootstrapButtons } from "plugins/alerts";
import { assignCompetencesService } from "services/formationPrograms";

function AssignCompetences(props) {

  const [ isShow, invokeModal ] = useState(false);
  const [selectedCompetencies, setSelectedCompetencies] = useState([]);

  const initModal = () => {
    return invokeModal(!isShow);
  };
  const formationProgram = props.program;
  const competences = props.competences;

  const selectedCompetencia = async (e) => {
    e.preventDefault();
    const idsCompetence = selectedCompetencies.map(item => {
      const _idCompetence = item._id
      return _idCompetence;
    });

    const data = assignCompetencesService(formationProgram._id, {competences: idsCompetence})
      initModal()
      swalWithBootstrapButtons.fire(
        'Asignación exitosa',
        data.message,
        'success'
      )
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
