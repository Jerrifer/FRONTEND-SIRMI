/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import Spinner from "../../components/loader"

// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import "../../../src/components/Headers/header.css";
import { Link, NavLink as NavLinkRRD, useParams } from "react-router-dom";
import { getTitledFormationService } from "services/titledFormations";
import { getLearningResultService } from "services/learningResults";
import Calendar from "components/calendar/calendar";

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

const DetailTitledFormation = () => {
  const { id } = useParams();

  const [titledFormation, setTitledFormation] = useState({});
  const [learningResults, setLearningResults] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [workDays, setWorkDays] = useState([]);
  const [rmi, setRmi] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showTitledFormation(id);
  }, [id]);

  const showTitledFormation = async (id) => {
    const data = await getTitledFormationService(id);
    console.log("hola");
    console.log(data);
    await setTitledFormation(data.results.titledFormation);
    await setRmi(data.results.titledFormation.rmi);
    await setLearningResults(data.results.learningResults);
    await setSchedules(data.results.titledFormation.schedule);
    await setWorkDays(data.results.titledFormation.work_days);
    await setLoading(false);
  };

  function handleDayClick(day, weekdays) {
    console.log(`Se hizo clic en el día ${day} que cae ${weekdays}`);
  }

  return (
    <>
      <Header title={"Ver detalle de reporte de formación"} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        {loading && <Spinner/>}
        <Row>
          <div className="col">
            <Card className="formulario ">
              <CardHeader className="border-0">
                <Col
                  lg="3"
                  className="d-flex justify-content-center align-items-center"
                >
                  <h2>{months[rmi.month]+rmi.year || "Mes..."} </h2>
                </Col>

                <Col
                  lg="3"
                  className="d-flex justify-content-center align-items-center"
                >
                  <label
                    className="form-control-label"
                    htmlFor="input-activity"
                  >
                    HORAS MES:
                  </label>
                  <h3 className="ml-1">{titledFormation.hours_month}</h3>
                </Col>

                <Col
                  lg="3"
                  className="d-flex justify-content-center align-items-center"
                >
                  <label
                    className="form-control-label"
                    htmlFor="input-ficha"
                  >
                    FICHA:
                  </label>
                  <h3 className="ml-1">{titledFormation.ficha}</h3>
                </Col>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="px-5">
                    {/* <Row className="my-4">
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-activity"
                          >
                            HORAS MES
                          </label>
                          <h3>{titledFormation.hours_month}</h3>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-ficha"
                          >
                            FICHA
                          </label>
                          <h3>{titledFormation.ficha}</h3>
                        </FormGroup>
                      </Col>
                    </Row> */}

                    <Row className="my-4">
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-ficha"
                          >
                            PROGRAMA DE FORMACIÓN
                          </label>
                          <h3>
                            {titledFormation.formation_program?.program_name}
                          </h3>
                        </FormGroup>
                      </Col>
                      
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-activity"
                          >
                            ACTIVIDAD
                          </label>
                          <h3>{titledFormation.activity}</h3>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-activity"
                          >
                            COMPETENCIA LABORAL
                          </label>
                          <h3>
                            {titledFormation.competence?.labor_competition}
                          </h3>
                        </FormGroup>
                      </Col>
                    </Row>

                    
                    <Card className="mb-5">
                      <CardHeader className="bg-white p-2">
                        <Row className="align-items-center">
                          <Col s="8">
                            <h4 className="mb-0">RESULTADOS DE APRENDIZAJE</h4>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        {
                          learningResults.map((learningResult) => {
                            return (
                              <Row key={learningResult.learning_result._id}>
                                <Col lg="8">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-ficha"
                                    >
                                      RESULTADO DE APRENDIZAJE
                                    </label>
                                    <h4>{learningResult.learning_result.learning_result}</h4>
                                  </FormGroup>
                                </Col>
                                <Col lg="4">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-activity"
                                    >
                                      FECHA TERMINACIÓN
                                    </label>
                                    <h4>{learningResult.end_date}</h4>
                                  </FormGroup>
                                </Col>
                              </Row>
                            )
                          })
                        }
                      </CardBody>
                    </Card>

                    <Row>
                      <Col lg="6" >
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-ficha"
                          >
                            Horario
                          </label>
                          <Table
                            className="table table-bordered mt-5"
                            responsive
                          >
                            <thead className="thead">
                              <tr className="bg-green">
                                <th className="text-center">Domingo</th>
                                <th className="text-center">Lunes</th>
                                <th className="text-center">Martes</th>
                                <th className="text-center">Miercoles</th>
                                <th className="text-center">Jueves</th>
                                <th className="text-center">Viernes</th>
                                <th className="text-center">Sábado</th>
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
                                        </div>
                                      : schedule.start_time !== '' && schedule.end_time !== ''?
                                        <div className="d-flex justify-content-around align-items-center bg-secondary rounded">
                                          <h5 className="my-1">{schedule.start_time} - {schedule.end_time}</h5>
                                        </div> 
                                      : <div></div>
                                      }
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </Table>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-activity"
                          >
                            Calendario
                          </label>
                          <Calendar selectedDays={workDays} handleDayClick={handleDayClick} month={rmi.month} year={rmi.year} schedules={schedules} months={months} withHolidays={true}/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DetailTitledFormation;
