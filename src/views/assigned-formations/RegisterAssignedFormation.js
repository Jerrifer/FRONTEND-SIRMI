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
import { swalWithBootstrapButtons } from "plugins/alerts";
import { useHistory } from "react-router-dom";
import { registerAssignedFormationService } from "services/assignedFormations";
import { allFormationProgramsService } from "services/formationPrograms";
import "views/formation-programs/input.css";
import AddLearningResults from "./addLearningResults";
import Multiselect from "multiselect-react-dropdown";
import { LearningResultByCompetenceService } from "services/learningResults";
import MultiSelectCustom from "plugins/multiSelect";

const RegisterAssignedFormation = () => {
  const navigate = useHistory();

  const [ficha, setFicha] = useState("");
  const [activity, setActivity] = useState("");
  const [hoursMonth, setHoursMonth] = useState("");
  const [learningResultSelected, setLearningResultSelected] = useState([]);

  const [formationPrograms, setFormationPrograms] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [learningResults, setLearningResults] = useState([]);

  useEffect(() => {
    showFormationPrograms();
  }, []);

  const showFormationPrograms = async () => {
    const data = await allFormationProgramsService();
    setFormationPrograms(data.results);
  };


  const [remove, setRemove] = useState(true);
  const [remove2, setRemove2] = useState(true);

  const showCompetences = async (selectedFormationProgram) => {
    setCompetences(selectedFormationProgram.competences)
    setRemove(false)
  }

  const showLearningResults = async (competence) => {
    const data = await LearningResultByCompetenceService(competence._id)
    setLearningResults(data.results.learningresults)
    setRemove2(false)
  }

  const [forms, setForms] = useState([{ id: 1 }]);

  const addForm = () => {
    if (forms.length < 5) {
      setForms(prevForms => [...prevForms, { id: Date.now() }]);
    }
  };

  const removeForm = id => {
    setForms(prevForms => prevForms.filter(form => form.id !== id));
  };

  // const selectedValueDecorator = (selectedItem) => {
  //   return (
  //     <div className="selected">
  //       <h6 className="t6">{selectedItem}</h6>
  //     </div>
  //   );
  // };
  

  // const optionValueDecorator = (option) => {
  //   return (
  //     <div>
  //       <h6>{option}</h6>
  //     </div>
  //   );
  // }; 

  // const customStyle = {
  //   closeIcon: {
  //     background: 'black'
  //   },
  //   optionContainer: {
  //     backgroundColor: '#f9f9f9',
  //   },
  //   option: {
  //     color: '#333',
  //   },
  //   chips: {
  //     color: '#000', // Aquí puedes definir el color que desees
  //     background: '#ffff',
  //     border: 'none',
  //     boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.1)',
  //   },
  //   searchBox: {
  //     border: 'none',
  //     'border-bottom': '1px solid black',
  //     'border-radius': '0px'
  //   },
  //   inputField: {
  //     color: '#0000',
  //   },
  // };

  const renderForms = () => {
    return forms.map(form => (
      <div key={form.id}>
        <AddLearningResults options={learningResults} onSelect={setLearningResultSelected} disable={remove2} />
        {forms.length > 1 && (
          <Button className="my-3" variant='' onClick={() => removeForm(form.id)}>Quitar</Button>
        )}
      </div>
    ));
  };

  const register = async (e) => {
    e.preventDefault();

    const body = {
      ficha: ficha,
      activity: activity,
      hours_month: hoursMonth,
      learning_results:learningResultSelected
    };

    console.log(body);

    // const data = await registerAssignedFormationService(body);
    // if (data.status === "success") {
    //   swalWithBootstrapButtons.fire(
    //     "Registro exitoso",
    //     data.message,
    //     data.status
    //   );
    //   console.log(data);
    // } else {
    //   swalWithBootstrapButtons.fire(data.message, data.results, data.status);
    // }
    // navigate.push("/admin/assignedformations");
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
                          type="text"
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
                          placeholder="Ej. Determinar el cumplimiento de las buenas prácticas de calidad en el desarrollo de software"
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
                   <MultiSelectCustom options={formationPrograms} setRemove={setRemove} onSelect={showCompetences} />
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
                    <MultiSelectCustom options={competences} setRemove={setRemove2} onSelect={showLearningResults} disable={remove} />
                      {/* <Multiselect
                        disable={remove}
                        required
                        selectedValueDecorator={selectedValueDecorator}
                        placeholder="Competencias"
                        displayValue="labor_competition"
                        selectionLimit={1}
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={function noRefCheck(e){
                          showLearningResults(e[0])
                        }}
                        options={competences} 
                        avoidHighlightFirstOption={true}
                        closeOnSelect={true}
                        emptyRecordMsg="No hay más datos"
                      /> */}
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
                        <CardBody>
                          <FormGroup>
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
                          className="form-control-label"
                          htmlFor="input-hours-month"
                        >
                          Horas al mes
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-hours-month"
                          placeholder="Ej. 48"
                          type="text"
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
