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
  UncontrolledTooltip,
} from "reactstrap";
// core components

import Header from "components/Headers/Header";
import "../../../src/components/Headers/header.css";
import { useHistory, useParams } from "react-router-dom";
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
import { getRmiService } from "services/rmi";
import ComplementaryFormation from "./complementaryFormation";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const RegisterTitledFormation = () => {

  const { id } = useParams();

  const navigate = useHistory();

  const [ficha, setFicha] = useState("");
  const [activity, setActivity] = useState("");
  const [hoursMonth, setHoursMonth] = useState(0);
  const [learningResultSelected, setLearningResultSelected] = useState([]);
  const [competenceSelected, setCompetenceSelected] = useState([]);
  const [schedules, setSchedules] = useState([
    {
      _id: 0,
      start_time: "",
      end_time: "",
      hours_per_day: "",
      shared_event: false
    },
    {
      _id: 1,
      start_time: "",
      end_time: "",
      hours_per_day: "",
      shared_event: false
    },
    {
      _id: 2,
      start_time: "",
      end_time: "",
      hours_per_day: "",
      shared_event: false
    },
    {
      _id: 3,
      start_time: "",
      end_time: "",
      hours_per_day: "",
      shared_event: false
    },
    {
      _id: 4,
      start_time: "",
      end_time: "",
      hours_per_day: "",
      shared_event: false
    },
    {
      _id: 5,
      start_time: "",
      end_time: "",
      hours_per_day: "",
      shared_event: false
    },
    {
      _id: 6,
      start_time: "",
      end_time: "",
      hours_per_day: "",
      shared_event: false
    },
  ]);
  // const [endDate, setEndDate] = useState([]);

  const [formationPrograms, setFormationPrograms] = useState([]);
  const [rmi, setRmi] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [learningResults, setLearningResults] = useState([]);
  const [formationProgramSelected, setFormationProgramSelected] = useState([]);
  const [selectedDays, setSelectedDays ] = useState([])
  const [complementary, setComplementary ] = useState(false)

  const [disable, setDisable] = useState(true);
  const [disable2, setDisable2] = useState(true);

  useEffect(() => {
    showFormationPrograms();
    showRmi(id);
  }, [id]);

  const showFormationPrograms = async () => {
    const data = await allFormationProgramsService();
    setFormationPrograms(data.results);
  };

  const showRmi = async (id) => {
    const data = await getRmiService(id)
    setRmi(data.results)
  }


  const showCompetences = async (selectedFormationProgram) => {
    await setCompetences(selectedFormationProgram.competences);
    await setFormationProgramSelected(selectedFormationProgram);
    await setDisable(false);
  };

  const showLearningResults = async (competence) => {
    const data = await LearningResultByCompetenceService(competence._id);
    setCompetenceSelected(competence);
    setLearningResults(data.results.learningresults);
    setDisable2(false);
  };

  //Formulario dinámico
  const [formsLearningResults, setFormsLearningResults] = useState([{ id: 1 }]);
  const [formsDates, setFormsDates] = useState([{ id: 1 }]);

  const addFormLearningResults = () => {
    if (formsLearningResults.length < 5) {
      setFormsLearningResults((prevForms) => [...prevForms, { id: Date.now() }]);
    }
  };

  const addFormDates = () => {
    if (formsDates.length < 5) {
      setFormsDates((prevForms) => [...prevForms, { id: Date.now() }]);
    }
  };

  const removeFormLearningResults = (id) => {
    setFormsLearningResults((prevForms) => prevForms.filter((form) => form.id !== id));
  };

  const removeFormDates = (id) => {
    setFormsDates((prevForms) => prevForms.filter((form) => form.id !== id));
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

  const renderFormsLearningResults = () => {
    return formsLearningResults.map((form) => (
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
            {formsLearningResults.length > 1 && (
              <Button
                className="my-3"
                variant=""
                onClick={() => removeFormLearningResults(form.id)}
              >
                Quitar
              </Button>
            )}
          </Col>
        </Row>
      </div>
    ));
  };

  const renderFormsDates = () => {
    return formsDates.map((form) => (
      <div key={form.id}>
        <Row>
          <Col lg="11" md="11">
            <ComplementaryFormation
              months={months}
              year={rmi.year}
              schedules={schedules}
            />
          </Col>
          <Col lg="1" md="1" className="d-flex align-items-center">
            {formsLearningResults.length > 1 && (
              <Button
                className="my-3"
                variant=""
                onClick={() => removeFormDates(form.id)}
              >
                Quitar
              </Button>
            )}
          </Col>
        </Row>
      </div>
    ));
  };

  const updateSchedule = (_id, newStartTime, newEndTime, hoursPerDay, sharedEvent) => {

    const updatedSchedules = schedules.map((schedule) => {
      if (schedule._id === _id) {
        return {
          ...schedule,
          start_time: newStartTime,
          end_time: newEndTime,
          hours_per_day: hoursPerDay,
          shared_event: sharedEvent
        };
      }
      return schedule;
    });

    setSchedules(updatedSchedules);
  };
  
  function handleDayClick(day, weekdays) {
    const designatedDays = Object.values(selectedDays);
    const isDesignatedDay = designatedDays.includes(day);
    if(isDesignatedDay) {
      const filtrados = designatedDays.filter(item => item !== day)
      return setSelectedDays(filtrados)
    }
    setSelectedDays({ ...selectedDays, [day]: day});
    console.log(`Se hizo clic en el día ${day} que cae ${weekdays}`);

  }

  // Este hook está para scuchar cambios en el horario o los días seleccionados en el 
  // calendario y ejecutar las funcions que actualizaran el valor de las horas al mes del reporte
  useEffect(() => {
    const countResult = totalHoursCount(selectedDays, rmi, schedules)
    const totalHours = convertDecimalToHoursMinutes(countResult)
    setHoursMonth(totalHours)
  },[selectedDays, rmi, schedules])

  function totalHoursCount(selectedDays, rmi, schedules) {
    //Pasando de objeto a array los días trabajados (Osea los seleccionados en el calendario)
    const workDays = Object.values(selectedDays);
    //Mapeamos los días trabajados y los metemos en un array de objetos en el que se tiene el día y en que cae (Lunes, martes, etc.)
    const newWorkDays = workDays.map((workDay) => {
      const dayToDate = new Date(rmi.year, rmi.month, workDay)
      return(
        {
          week_day : dayToDate.getDay(),
          day : workDay
        }
      )
    })

    //filtramos el horario con sólo los que fueron seleccionados
    const selectedWeekDays = schedules.filter((weekday) => weekday.start_time !== '' && weekday.end_time !== '')

    //Ahora lo que queremos es mapear los días trabajados y según el día de la semana (lunes, martes, etc.) se sumara el valor que hay en hours_per_day del día de la semana
    let count = 0;
    selectedWeekDays.map((weekDay) => {
      return (
        newWorkDays.map((workDay) => {
          if (weekDay._id === workDay.week_day) {
            count = count + weekDay.hours_per_day 
          }
          return (
            count
          )
        })
      )
    })

    // retornamos la cantidad
    return count
  }

  // sacado de chat una función que le pasó un valor decimal y me lo devuelve en formato hh:mm
  function convertDecimalToHoursMinutes(totalHoursDecimal) {
    var totalHours = Math.floor(totalHoursDecimal);
    var totalMinutes = Math.round((totalHoursDecimal % 1) * 60);
    var result = ('0' + totalHours).slice(-2) + ':' + ('0' + totalMinutes).slice(-2);
    return result;
  }


  const register = async (e) => {
    e.preventDefault();

    const learningResults = Object.values(learningResultSelected);
    const workDays = Object.values(selectedDays);

    let newWorkDays = []
    workDays.map((workDay) => {
      const dayToDate = new Date(rmi.year, rmi.month, workDay)
      return(
        newWorkDays.push({
          week_day : dayToDate.getDay(),
          day : workDay
        })
      )
    })
    
    console.log("jerri");
    console.log(newWorkDays);
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
      work_days: newWorkDays,
      rmi: id,
    };

    let hola = schedules[0].start_date + schedules[0].end_date
    console.log("hola");
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
    navigate.push(`/admin/titledformations/${id}`);
  };

  return (
    <>
      <Header title={"Registrar reporte de formación titulada"}/>
      {/* Page content */}
      <Container className="mt--7  align-items-center" fluid>
        <Col className="order-xl-2 align-items-center  " xl="11">
          <Card className="bg-secondary formulario  ">
            <CardHeader className="bg-white border-0 align-items-center">
              <Row className="align-items-center">
                <Col s="8">
                  <h3 className="mb-0">
                    Mes: {months[rmi.month]}
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
                          // required
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
                          // required
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
                          // required
                          selectedValueDecorator={selectedValueDecorator}
                          optionValueDecorator={optionValueDecorator}
                          customCloseIcon={closeIcon}
                          style={customStyle}
                          avoidHighlightFirstOption={true}
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
                          // required
                          selectedValueDecorator={selectedValueDecorator}
                          optionValueDecorator={optionValueDecorator}
                          customCloseIcon={closeIcon}
                          style={customStyle}
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
                          loading={competences.length <= 0}
                          avoidHighlightFirstOption={true}
                          emptyRecordMsg="No hay más datos"
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
                              onClick={addFormLearningResults}
                              variant=""
                              id="btn-program-remove"
                            >
                              Agregar
                            </Button>
                            {renderFormsLearningResults()}
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Col>
                    
                  </Row>
                  {/* Select a time */}
                  <Row>
                    <Col lg="2">
                      <TrainingSchedule schedule={updateSchedule} />
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
                          value={hoursMonth}
                          type="text"
                          disabled
                          // onChange={(e) => setHoursMonth(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                      {/* Schedule */}
                    <Col lg="10" className="p-5">
                      <Table
                        className=" table table-striped table-hover shadow-lg align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead">
                          <tr>
                            <th className="text-center w-15">Domingo</th>
                            <th className="text-center w-15">Lunes</th>
                            <th className="text-center w-15">Martes</th>
                            <th className="text-center w-15">Miercoles</th>
                            <th className="text-center w-15">Jueves</th>
                            <th className="text-center w-15">Viernes</th>
                            <th className="text-center w-15">Sábado</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {schedules.map((schedule) => {
                              return (
                                <td key={schedule._id}>
                                  {
                                    schedule.shared_event ? 
                                    <div  className="d-flex justify-content-around align-items-center bg-yellow rounded">
                                      <UncontrolledTooltip
                                        delay={0}
                                        target={"dsfdsf"+schedule._id}
                                      >
                                        Envento compartido
                                      </UncontrolledTooltip>
                                      <h5 id={"dsfdsf"+schedule._id} className="my-1">{schedule.start_time} - {schedule.end_time}</h5>
                                      <i className="ni ni-fat-remove" style={{fontSize: '20px', cursor: 'pointer'}} onClick={() => {updateSchedule(schedule._id, '', '', '')}}></i>
                                    </div>
                                  : schedule.start_time !== '' && schedule.end_time !== ''?
                                    <div className="d-flex justify-content-around align-items-center bg-secondary rounded">
                                      <h5 className="my-1">{schedule.start_time} - {schedule.end_time}</h5>
                                      <i className="ni ni-fat-remove" style={{fontSize: '20px', cursor: 'pointer'}} onClick={() => {updateSchedule(schedule._id, '', '', '')}}></i>
                                    </div> 
                                  : <div></div>
                                  }
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </Table>
                      {/* Calendar */}
                      <Row className="mt-4 d-flex justify-content-center">
                        <Calendar selectedDays={selectedDays} handleDayClick={handleDayClick} month={rmi.month} year={rmi.year} schedules={schedules} months={months}/>
                      </Row>
                    </Col>
                  </Row>

                  <div>
                    <div className="d-flex justify-content-start">
                      <label htmlFor="customCheck1">
                        <h6 className="mr-4">¿El reporte es de formación complementaria?</h6>
                      </label>
                      <span className="clearfix"/>
                      <label className="custom-toggle">
                        <input type="checkbox" id="customCheck1" onChange={() => {setComplementary(!complementary)}}/>
                        <span className="custom-toggle-slider rounded-circle" />
                      </label>
                    </div>
                  </div>
                  
                  {
                    complementary ?
                      <FormGroup className="mb-0">
                        <Input
                          className="form-control-alternative w-25"
                          id="input-hours-month"
                          placeholder="Ej. 15"
                          type="text"
                          // onChange={(e) => setHoursMonth(e.target.value)}
                        />
                        <Button
                          className="mb-3"
                          onClick={addFormDates}
                          variant=""
                          id="btn-program-remove"
                        >
                          Agregar
                        </Button>
                        {renderFormsDates()}
                      </FormGroup>
                    :
                    <></>
                  }
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
