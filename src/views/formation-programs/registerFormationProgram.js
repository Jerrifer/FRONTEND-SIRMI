import React, { useState } from "react";

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
// import { Swal } from "sweetalert2";

const RegisterFormationProgram = () => {

const [programName, setProgramName] = useState('');
const [programCode, setProgramCode] = useState('');
const [totalDuration, setTotalDuration] = useState('');
const [programVersion, setProgramVersion] = useState('');
const [programLevel, setProgramLevel] = useState(1);
const [thematicLine, setThematicLine] = useState(1);
const [typeProgram, setTypeProgram] = useState('C');


  // const totalUsers = competence;

  const register = async (e) => {
    e.preventDefault();
    
    const data = {
        "program_name": programName,
        "program_code": programCode,
        "total_duration": totalDuration,
        "program_version": programVersion,
        "program_level": programLevel,
        "thematic_line": thematicLine,
        "type_program": typeProgram
    }
    const response = await axios.post(`${BASE_URL}formationprograms`, data);
    const resultRegister = await response.data;
    console.log(resultRegister)
    swalWithBootstrapButtons.fire(
        'Registrado exitosamente',
        'El programa de formación se registro con éxito.',
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
                  <h3 className="mb-0">Registrar Competencia</h3>
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
                          htmlFor="input-username"
                        >
                          Nombre de la competencia laboral
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Nombre de la competencia laboral"
                          type="text"
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
                          Código de la competencia laboral
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Código de la competencia laboral"
                          type="text"
                          required
                          onChange={(e) => setProgramCode(e.target.value)}
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    //
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Versión de la competencia laboral
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          placeholder="Versión de la competencia laboral"
                          type="text"
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
                          onChange={(e) => setTotalDuration(e.target.value)}
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    //
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Titulo del programa
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          placeholder="Titulo del programa"
                          type="text"
                          required
                        />
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
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Línea tématica"
                          type="text"
                        />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Tipo del programa
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Tipo del programa"
                          type="text"
                        />
                        </FormGroup>
                      </Col>
                    </Row>

                        <Button type="submit" className="justify-content-end m-4">Registrar</Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};


export default RegisterFormationProgram;
