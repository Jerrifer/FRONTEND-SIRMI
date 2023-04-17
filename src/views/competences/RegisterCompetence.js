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
import { registerCompetenceService } from "services/competences";

const RegisterCompetence = () => {
  const navigate = useHistory();

  const [programName, setProgramName] = useState("");
  const [programCode, setProgramCode] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [programVersion, setProgramVersion] = useState("");

  useEffect(() => {}, []);

  const register = async (e) => {
    e.preventDefault();

    const body = {
      labor_competence_code: programName,
      labor_competition: programCode,
      labor_competition_version: totalDuration,
      duration: programVersion,
    };


    const data = await registerCompetenceService(body);
    if(data.status === 'success') {
      swalWithBootstrapButtons.fire(
        'Registro exitoso',
        data.message,
        data.status
      )
      console.log(data);
    } else {
      swalWithBootstrapButtons.fire(
        data.message,
        data.results,
        data.status
      )
    }
      navigate.push("/admin/competence");
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
                          Codigo de Competencia Laboral
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder=" Codigo de Competencia Laboral"
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
                          Competencia laboral
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder=" Competencia laboral"
                          type="text"
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
                          Duración estimada (Horas)
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

export default RegisterCompetence;
