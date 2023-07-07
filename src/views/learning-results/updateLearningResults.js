import React, { useEffect, useState } from "react";

import {
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

import { Modal, Button, Form } from "react-bootstrap";

import { swalWithBootstrapButtons } from "plugins/alerts";
import { useHistory } from "react-router-dom";
import { updateLearningResultService } from "services/learningResults";

function UpdateLearningresults(props) {

  const navigate = useHistory();

  const [learningResult, setLearningResult] = useState(props.learningResult);

  useEffect(() => {
    console.log(props.learningResult);
  }, [props.learningResult]);

  const [isShow, invokeModal] = useState(false);

  const initModal = () => {
    return invokeModal(!isShow);
  };

  const changeData = (e) => {
    setLearningResult({ ...learningResult, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    console.log(learningResult);
    const data = await updateLearningResultService(learningResult._id, learningResult)
    invokeModal(!isShow);
    if(data.status === 'success') {
      swalWithBootstrapButtons.fire(
        'Actualización exitosa',
        data.message,
        data.status
      )
      navigate.push(`/admin/learningresults/${learningResult.competence}`);
    } else {
      swalWithBootstrapButtons.fire(
        data.message,
        data.results,
        data.status
      )
    }
  };

  return (
    <>
        <Button 
            variant=""
            id={"btn-program-update"+learningResult.competence}
            onClick={initModal}
        >
            <i className="fas fa-pen-alt"></i>
        </Button>
        <UncontrolledTooltip
            delay={0}
            target={"btn-program-update"+learningResult.competence}
        >
        Actualizar resultado
        </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color">
        <Modal.Header className="justify-content-end pb-0">
          <i className="fas fa-remove" style={{cursor: 'pointer'}} onClick={initModal}></i>
        </Modal.Header>
          <Modal.Body>
            <Form onSubmit={update}>
                <div className="px-5">
                    <Form.Group className="text-center mb-4">
                      <h1>Actualizar resultado de aprendizaje</h1>
                    </Form.Group>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Nombre del resultado de Aprendizaje
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Resultado de Aprendizaje"
                          type="text"
                          required
                          name="learning_result"
                          defaultValue={learningResult.learning_result}
                          onChange={(e) => changeData(e)}
                        />
                      </FormGroup>

                  <Button type="submit" className="justify-content-end m-4">
                    Guardar cambios
                  </Button>
                </div>
              </Form>
          </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateLearningresults;
