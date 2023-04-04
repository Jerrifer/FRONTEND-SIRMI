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
import {BASE_URL} from 'globals.constans';
import axios from "axios";
import { swalWithBootstrapButtons } from 'plugins/alerts'
import './input.css'

// import { Swal } from "sweetalert2";
// import { useParams } from "react-router-dom";

const UpdateFormationProgram = () => {

// const { formationprogram } = useParams()

// console.log(formationprogram);
// console.log('jerri');

useEffect(() => {
    showProgramLevel();
    showThematicLines();
    showTypeProgram();
    showFormationProgram();
  }, []);


const [formationProgram, setFormationProgram] = useState([]);

const [programName, setProgramName] = useState('');
const [programCode, setProgramCode] = useState('');
const [totalDuration, setTotalDuration] = useState('');
const [programVersion, setProgramVersion] = useState('');
const [selectedProgramLevel, setSelectedProgramLevel] = useState('');
const [selectedThematicLine, setSelectedThematicLine] = useState('');
const [selectedTypeProgram, setSelectedTypeProgram] = useState('');

const [programLevels, setProgramLevels] = useState([]);
const [thematicLines, setThematicLines] = useState([]);
const [typePrograms, setTypePrograms] = useState([]);


const id = 12345

  const showFormationProgram = async () => {
    await axios.get(`${BASE_URL}formationprograms/${id}`).then((response) => {
          return setFormationProgram(response.data.results);
    })
  };

  const showProgramLevel = async () => {
    await axios.get(`${BASE_URL}programlevels`).then((response) => {
          return setProgramLevels(response.data.results);
    })
  };

  const showThematicLines = async () => {
    await axios.get(`${BASE_URL}thematiclines`).then((response) => {
      return setThematicLines(response.data.results);
    });
  };

  const showTypeProgram = async () => {
    await axios.get(`${BASE_URL}typeprograms`).then((response) => {
      return setTypePrograms(response.data.results);
    })
  };


//   useEffect(() => {
//     showFormationProgram();
//   }, []);

  const update = async (e) => {
    e.preventDefault();
    
    const data = {
        "program_name": programName,
        "program_code": programCode,
        "total_duration": totalDuration,
        "program_version": programVersion,
        "program_level": selectedProgramLevel,
        "thematic_line": selectedThematicLine,
        "type_program": selectedTypeProgram
    }

    console.log(data)
    const response = await axios.put(`${BASE_URL}formationprograms/${id}`, data);
    const resultUpdate = await response.data.results;
    console.log(resultUpdate)
    swalWithBootstrapButtons.fire(
        'Actualizado exitosamente',
        'El programa de formación se actualizó con éxito.',
        'success'
      )
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
                  <h3 className="mb-0">Actualizar Competencia</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={update}>
                <div className="px-5">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Nombre del programa de formación
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Nombre del programa de formación"
                          type="text"
                          value={formationProgram.program_name}
                          required
                          onChange={(e) => setProgramName(e.target.value)}
                        />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Código del programa de formación
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Código del programa de formación"
                          type="text"
                          defaultValue={formationProgram.program_code}
                          value={formationProgram.program_code}
                          required
                          onChange={(e) => setProgramCode(e.target.value)}
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Versión del programa de formación
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          placeholder="Versión del programa de formación"
                          type="text"
                          defaultValue={formationProgram.program_version}
                          required
                          onChange={(e) => setProgramVersion(e.target.value)}
                        />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Duración estimada
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Duración estimada"
                          type="text"
                          defaultValue={formationProgram.total_duration}
                          required
                          onChange={(e) => setTotalDuration(e.target.value)}
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Titulo del programa
                        </label>
                      
                          <select className=" input"  onChange={(e) => setSelectedProgramLevel(e.target.value)}>
                            {programLevels.map((programLevel) =>
                                <option key={programLevel._id} value={programLevel._id}>{programLevel.program_level}</option>
                            )}
                          </select>
                        

                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Línea tématica
                        </label>
                        <select className="input" onChange={(e) => setSelectedThematicLine(e.target.value)}>
                          {thematicLines.map((thematicLine) => 
                              <option key={thematicLine._id} value={thematicLine._id}>{thematicLine.thematic_line}</option>
                          )}
                        </select>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="4">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Tipo del programa
                        </label>
                        <select className="input" onChange={(e) => setSelectedTypeProgram(e.target.value)}>
                          {typePrograms.map((typeProgram) =>
                              <option key={typeProgram._id} value={typeProgram._id}>{typeProgram.type_program}</option>
                          )}
                        </select>
                        </FormGroup>
                      </Col>
                    </Row>

                        <Button type="submit" className="justify-content-end m-4">Guardar cambios</Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};


export default UpdateFormationProgram;
