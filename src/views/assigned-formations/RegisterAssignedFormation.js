import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components

import Header from "components/Headers/Header";
import "../../../src/components/Headers/header.css";
import { useHistory } from "react-router-dom";
import { allFormationProgramsService } from "services/formationPrograms";
import "views/formation-programs/input.css";
import AddLearningResults from "./addLearningResults";
import Multiselect from "multiselect-react-dropdown";
import { LearningResultByCompetenceService } from "services/learningResults";
import { optionValueDecorator, selectedValueDecorator, customStyle, closeIcon } from "plugins/multiSelect";
import { registerAssignedFormationService } from "services/assignedFormations";
import { swalWithBootstrapButtons } from "plugins/alerts";

const RegisterAssignedFormation = () => {
  const navigate = useHistory();

  const [ficha, setFicha] = useState("");
  const [activity, setActivity] = useState("");
  const [hoursMonth, setHoursMonth] = useState("");
  const [learningResultSelected, setLearningResultSelected] = useState([]);
  // const [endDate, setEndDate] = useState([]);

  const [formationPrograms, setFormationPrograms] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [learningResults, setLearningResults] = useState([]);
  
  const [disable, setDisable] = useState(true);
  const [disable2, setDisable2] = useState(true);

  useEffect(() => {
    showFormationPrograms();
  }, []);

  const showFormationPrograms = async () => {
    const data = await allFormationProgramsService();
    setFormationPrograms(data.results);
  };

  const showCompetences = async (selectedFormationProgram) => {
    setCompetences(selectedFormationProgram.competences)
    setDisable(false)
  }

  const showLearningResults = async (competence) => {
    const data = await LearningResultByCompetenceService(competence._id)
    setLearningResults(data.results.learningresults)
    setDisable2(false)
  }

  //Formulario dinámico
  const [forms, setForms] = useState([{ id: 1 }]);

  const addForm = () => {
    if (forms.length < 5) {
      setForms(prevForms => [...prevForms, { id: Date.now() }]);
    }
  };

  const removeForm = id => {
    setForms(prevForms => prevForms.filter(form => form.id !== id));
  };

  const postResultSelected = (data) => {
    console.log('jerri');
    console.log(data);
    setLearningResultSelected(prevLearningResultSelected => {
      return {
        ...prevLearningResultSelected,
        [data.learning_result._id]: data.end_date
      };
    });
  };

  const renderForms = () => {
    return forms.map(form => (
      <div key={form.id}>
        <Row >
          <Col lg="11" md="11">
            <AddLearningResults options={learningResults} onSelect={postResultSelected} disable={disable2}/>
          </Col>
          <Col lg="1" md="1" className="d-flex align-items-center">
            {forms.length > 1 && (
              <Button className="my-3" variant='' onClick={() => removeForm(form.id)}>Quitar</Button>
            )}
          </Col>
        </Row>
      </div>
    ));
  };

  const register = async (e) => {
    e.preventDefault();

    const body = {
      ficha: ficha,
      activity: activity,
      hours_month: hoursMonth,
      learning_results: learningResultSelected,
    };

    console.log(body);

    const data = await registerAssignedFormationService(body);
    if (data.status === "success") {
      swalWithBootstrapButtons.fire(
        "Registro exitoso",
        data.message,
        data.status
      );
      console.log(data);
    } else {
      swalWithBootstrapButtons.fire(data.message, data.results, data.status);
    }
    navigate.push("/admin/assignedformations");
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7  align-items-center" fluid>
        <Col className="order-xl-2 align-items-center  " xl="11">
          <Card className="bg-secondary formulario  ">
            <CardHeader className="bg-white border-0 align-items-center">
              <Row className="align-items-center">
                <Col s="8">
                  <h3 className="mb-0">
                    Registrar reporte de formación titulada
                  </h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={register}>
                <div className="px-5">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-ficha"
                        >
                          ficha
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-ficha"
                          placeholder="Ej. 2451475"
                          type="number"
                          required
                          onChange={(e) => setFicha(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-activity"
                        >
                          Actividad
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-activity"
                          placeholder="Ej. Determinar el cumplimiento de las buenas prácticas de calidad en el desarrollo de software."
                          type="text"
                          required
                          onChange={(e) => setActivity(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-hours-month"
                    >
                      Programas de formación
                    </label>
                    <Multiselect
                      required
                      selectedValueDecorator={selectedValueDecorator}
                      optionValueDecorator={optionValueDecorator}
                      customCloseIcon={closeIcon}
                      style={customStyle}
                      avoidHighlightFirstOption={true}
                      closeOnSelect={true}
                      hidePlaceholder={true}
                      loading={formationPrograms.length <= 0}
                      selectionLimit={1}
                      emptyRecordMsg="No hay más datos"
                      showCloseIcon={true}
                      onKeyPressFn={function noRefCheck(){}}
                      onSearch={function noRefCheck(){}}
                      onRemove={function noRefCheck(){
                          setDisable(true)
                      }}
                      onSelect={function noRefCheck(e){
                          showCompetences(e[0])
                      }}
                      placeholder="Seleccionar"
                      displayValue="program_name"
                      options={formationPrograms}
                    />
                  </FormGroup>
                </Col>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                      htmlFor="input-hours-month"
                    >
                      Competencias
                    </label>
                      <Multiselect
                        disable={disable}
                        required
                        selectedValueDecorator={selectedValueDecorator}
                        optionValueDecorator={optionValueDecorator}
                        placeholder="Seleccionar"
                        displayValue="labor_competition"
                        selectionLimit={1}
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={function noRefCheck(e){
                          showLearningResults(e[0])
                        }}
                        hidePlaceholder={true}
                        closeOnSelect={false}
                        loading={competences.length <= 0}
                        avoidHighlightFirstOption={true}
                        emptyRecordMsg="No hay más datos"
                        style={customStyle}
                        customCloseIcon={closeIcon}
                        options={competences}
                      />
                  </FormGroup>
                </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <Card>
                        <CardHeader className="bg-white p-2">
                          <Row className="align-items-center">
                            <Col s="8">
                              <h3 className="mb-0">
                                Resultados de aprendizaje
                              </h3>
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody >
                          <FormGroup className="mb-0">
                            <Button
                              className="mb-3"
                              onClick={addForm}
                              variant=""
                              id="btn-program-remove"
                            >
                              Agregar
                            </Button>
                            {renderForms()}
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label mt-4"
                          htmlFor="input-hours-month"
                        >
                          Horas al mes
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-hours-month"
                          placeholder="Ej. 15"
                          type="number"
                          required
                          onChange={(e) => setHoursMonth(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    className="btn btn-success m-4 bg-success"
                  >
                    Registrar
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default RegisterAssignedFormation;
