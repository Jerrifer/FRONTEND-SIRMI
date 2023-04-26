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
  Table,
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
import {
  optionValueDecorator,
  selectedValueDecorator,
  customStyle,
  closeIcon,
} from "plugins/multiSelect";
import { swalWithBootstrapButtons } from "plugins/alerts";
import TrainingSchedule from "./trainingSchedule";
import { registerTitledFormationService } from "services/titledFormations";
import Calendar from "components/calendar/calendar";

const RegisterTitledFormation = () => {
  const navigate = useHistory();

  const [ficha, setFicha] = useState("");
  const [activity, setActivity] = useState("");
  const [hoursMonth, setHoursMonth] = useState("");
  const [learningResultSelected, setLearningResultSelected] = useState([]);
  const [competenceSelected, setCompetenceSelected] = useState([]);
  const [schedules, setSchedules] = useState([
    {
      _id: 1,
      date: "",
    },
    {
      _id: 2,
      date: "",
    },
    {
      _id: 3,
      date: "",
    },
    {
      _id: 4,
      date: "",
    },
    {
      _id: 5,
      date: "",
    },
    {
      _id: 6,
      date: "",
    },
    {
      _id: 7,
      date: "",
    },
  ]);
  // const [endDate, setEndDate] = useState([]);

  const [formationPrograms, setFormationPrograms] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [learningResults, setLearningResults] = useState([]);
  const [formationProgramSelected, setFormationProgramSelected] = useState([]);

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
    setCompetences(selectedFormationProgram.competences);
    setFormationProgramSelected(selectedFormationProgram);
    setDisable(false);
  };

  const showLearningResults = async (competence) => {
    const data = await LearningResultByCompetenceService(competence._id);
    setCompetenceSelected(competence);
    setLearningResults(data.results.learningresults);
    setDisable2(false);
  };

  //Formulario dinámico
  const [forms, setForms] = useState([{ id: 1 }]);

  const addForm = () => {
    if (forms.length < 5) {
      setForms((prevForms) => [...prevForms, { id: Date.now() }]);
    }
  };

  const removeForm = (id) => {
    setForms((prevForms) => prevForms.filter((form) => form.id !== id));
  };

  const postResultSelected = (data) => {
    setLearningResultSelected((prevLearningResultSelected) => {
      const newResult = {
        learning_result: data.learning_result._id,
        end_date: data.end_date,
      };
      return {
        ...prevLearningResultSelected,
        [data.learning_result._id]: newResult,
      };
    });

    const learningResultsFilter = learningResults.filter(
      (learningResult) => learningResult !== data.learning_result
    );
    setLearningResults(learningResultsFilter);
  };

  const renderForms = () => {
    return forms.map((form) => (
      <div key={form.id}>
        <Row>
          <Col lg="11" md="11">
            <AddLearningResults
              options={learningResults}
              onSelect={postResultSelected}
              disable={disable2}
            />
          </Col>
          <Col lg="1" md="1" className="d-flex align-items-center">
            {forms.length > 1 && (
              <Button
                className="my-3"
                variant=""
                onClick={() => removeForm(form.id)}
              >
                Quitar
              </Button>
            )}
          </Col>
        </Row>
      </div>
    ));
  };

  // const checkSchedule = (schedule) => {
  //   setSchedules((prevSchedules) => {
  //     return {
  //       ...prevSchedules,
  //       [schedule._id]: schedule,
  //     };
  //   });
  // };

  const updateSchedule = (_id, newDate) => {
    const updatedSchedules = schedules.map((schedule) => {
      if (schedule._id === _id) {
        return {
          ...schedule,
          date: newDate,
        };
      }
      return schedule;
    });

    setSchedules(updatedSchedules);
  };


  // updateSchedule(23312123, "18:00 - 21:00");

  const register = async (e) => {
    e.preventDefault();

    const learningResults = Object.values(learningResultSelected);

    const body = {
      ficha: ficha,
      activity: activity,
      hours_month: hoursMonth,
      formation_program: formationProgramSelected._id,
      competence: {
        competence: competenceSelected._id,
        learning_results: learningResults,
      },
      schedule: schedules,
    };

    console.log(body);

    const data = await registerTitledFormationService(body);
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
    navigate.push("/admin/titledformations");
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
                          onKeyPressFn={function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          onRemove={function noRefCheck() {
                            setDisable(true);
                          }}
                          onSelect={function noRefCheck(e) {
                            showCompetences(e[0]);
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
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={function noRefCheck() {
                            setDisable2(true);
                          }}
                          onSearch={function noRefCheck() {}}
                          onSelect={function noRefCheck(e) {
                            showLearningResults(e[0]);
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
                        <CardBody>
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
                  {/* Horario */}
                  <Row>
                    <Col lg="2">
                      <TrainingSchedule schedule={updateSchedule} />
                    </Col>
                    <Col lg="10" className="p-5">
                      <Table
                        className=" table table-striped table-hover shadow-lg align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead">
                          <tr>
                            <th>Lunes</th>
                            <th>Martes</th>
                            <th>Miercoles</th>
                            <th>Jueves</th>
                            <th>Viernes</th>
                            <th>Sabado</th>
                            <th>Domingo</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {schedules.map((schedule) => {
                              return (
                                <td key={schedule._id}>
                                  <div className="d-flex">
                                    <h5>{schedule.date}</h5>
                                    {
                                      schedule.date !== '' ?
                                        <i className="ni ni-fat-remove" style={{fontSize: '20px', cursor: 'pointer'}} onClick={() => {updateSchedule(schedule._id, '')}}></i>
                                      : ''
                                    }
                                   
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  <Row className="m-5">
                    <Calendar />
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

export default RegisterTitledFormation;
