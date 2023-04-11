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

import Header from "components/Headers/Header";
import "../../../src/components/Headers/header.css";
import {BASE_URL} from 'globals.constans';
import axios from "axios";
import { swalWithBootstrapButtons } from 'plugins/alerts'
import './input.css'
import { useHistory, useParams } from "react-router-dom";

// import { Swal } from "sweetalert2";

const UpdateFormationProgram = () => {
  
  const navigate = useHistory();
  const { id } = useParams()

  useEffect(() => {
    showProgramLevel();
    showThematicLines();
    showTypeProgram();
    showFormationProgram(id);
  }, [id]);


  const [formationProgram, setFormationProgram] = useState([]);

  const [programLevels, setProgramLevels] = useState([]);
  const [thematicLines, setThematicLines] = useState([]);
  const [typePrograms, setTypePrograms] = useState([]);

  const showFormationProgram = async (id) => {
    await axios.get(`${BASE_URL}formationprograms/${id}`).then((response) => {
          setFormationProgram(response.data.results);
    })
  };

  const showProgramLevel = async () => {
    await axios.get(`${BASE_URL}programlevels`).then((response) => {
          setProgramLevels(response.data.results);
    })
  };

  const showThematicLines = async () => {
    await axios.get(`${BASE_URL}thematiclines`).then((response) => {
      setThematicLines(response.data.results);
    });
  };

  const showTypeProgram = async () => {
    await axios.get(`${BASE_URL}typeprograms`).then((response) => {
      setTypePrograms(response.data.results);
    })
  };
  console.log(formationProgram);
  
  const changeData = (e) => {
    setFormationProgram({...formationProgram,
        [e.target.name]: e.target.value
    })
}

  const update = async (e) => {
    e.preventDefault();

    const typeDataTypeProgram = typeof(formationProgram.type_program)

    if (typeDataTypeProgram === 'object') {
      formationProgram.type_program = formationProgram.type_program._id
    }

    delete(formationProgram.competences)

    console.log(formationProgram);
    await axios.put(`${BASE_URL}formationprograms/${id}`, formationProgram).then((response) => {
      const resultUpdate = response.data;
      if (resultUpdate.status === 'success') {
        swalWithBootstrapButtons.fire(
          'Actualizado exitosamente',
          resultUpdate.message,
          'success'
        )
        navigate.push("/admin/formationprograms");
      } else {
        swalWithBootstrapButtons.fire(
          'Error por validaciones',
          resultUpdate.results.errors[0].msg,
          'warning'
        )
      }
    }).catch((error) => {
      console.log(error);
      swalWithBootstrapButtons.fire(
        'Hubo un error',
        error.response.data.message,
        'error'
      )
    })
    
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
                  <h3 className="mb-0">Actualizar el programa de formación "{formationProgram.program_name}"</h3>
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
                          id="input-program_name"
                          name="program_name"
                          placeholder="Nombre del programa de formación"
                          type="text"
                          defaultValue={formationProgram.program_name}
                          required
                          onChange={changeData}
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
                          name="program_code"
                          placeholder="Código del programa de formación"
                          type="text"
                          disabled
                          defaultValue={formationProgram.program_code}
                          value={formationProgram.program_code}
                          required
                          onChange={changeData}
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
                          name="program_version"
                          placeholder="Versión del programa de formación"
                          type="text"
                          defaultValue={formationProgram.program_version}
                          required
                          onChange={changeData}
                        />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Duración estimada (Horas)
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          name="total_duration"
                          placeholder="Duración estimada"
                          type="text"
                          defaultValue={formationProgram.total_duration}
                          required
                          onChange={changeData}
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
                      
                          <select className=" input" name="program_level" onChange={changeData}>
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
                        <select className="input" name="thematic_line" onChange={changeData}>
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
                        <select className="input" name="type_program" onChange={changeData}>
                          {typePrograms.map((typeProgram) =>
                              <option key={typeProgram._id} value={typeProgram._id}>{typeProgram.type_program}</option>
                          )}
                        </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="justify-content-end">
                      <Button type="submit" className="justify-content-end m-4">Guardar cambios</Button>
                    </Row>
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
