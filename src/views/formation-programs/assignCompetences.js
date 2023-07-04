import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Multiselect from 'multiselect-react-dropdown';
import "./input.css";
import { swalWithBootstrapButtons } from "plugins/alerts";
import { assignCompetencesService } from "services/formationPrograms";

function AssignCompetences({program, competences, setRendering, rendering}) {

  const [ isShow, invokeModal ] = useState(false);
  const [selectedCompetencies, setSelectedCompetencies] = useState([]);

  const initModal = () => {
    return invokeModal(!isShow);
  };
  const formationProgram = program;
  console.log(formationProgram.competences);
  console.log(competences);

  const selectedCompetences = async (e) => {
    e.preventDefault();
    const idsCompetence = selectedCompetencies.map(item => {
      const _idCompetence = item._id
      return _idCompetence;
    });
  const data = await assignCompetencesService(formationProgram._id, {competences: idsCompetence})
    initModal()
    if(data.status === 'success') {
      swalWithBootstrapButtons.fire(
        data.message,
        '',
        data.status
      )
      setRendering(rendering + 1)
    } else {
      swalWithBootstrapButtons.fire(
        data.message,
        data.results,
        data.status
      )
    }
  }

  return (
    <>
      <button className="btn btn-success ml-4 bg-success" onClick={initModal}>Asignar</button>

      <Modal show={isShow} size={"xl"} className="color">

        <div className="container">
          <Form onSubmit={selectedCompetences}>
            <Modal.Body>
              <div className="container pt-2" style={{height : '200px'}}>
                  <Form.Group className="text-center mb-4">
                    <h2>ASIGNAR COMPETENCIAS A: {formationProgram.program_name}</h2>
                  </Form.Group>

                  <Form.Group className="pt-4">
                    <Multiselect
                      disablePreSelectedValues
                      placeholder="Competencias"
                      displayValue="labor_competition"
                      onKeyPressFn={function noRefCheck(){}}
                      onRemove={function noRefCheck(){}}
                      onSearch={function noRefCheck(){}}
                      onSelect={function noRefCheck(e){
                        setSelectedCompetencies(e)
                      }}
                      options={competences}
                      selectedValues={formationProgram.competences}
                      emptyRecordMsg="No hay más competencias"
                    />
                  </Form.Group>
              </div>
            </Modal.Body>
          
            <Modal.Footer className="justify-content-between">
              <Button variant="danger" onClick={initModal}>
                Cerrar
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
