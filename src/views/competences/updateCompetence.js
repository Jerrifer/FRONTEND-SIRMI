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
import { BASE_URL } from "globals.constans";
import axios from "axios";
import { swalWithBootstrapButtons } from "plugins/alerts";

import { useParams } from "react-router-dom";

// import { Swal } from "sweetalert2";

const UpdateCompetence = () => {
  const { id } = useParams();

  useEffect(() => {
    showFormationProgram(id);
  }, [id]);

  const [competence, setCompetence] = useState([]);

  const showFormationProgram = async (id) => {
    await axios.get(`${BASE_URL}competences/${id}`).then((response) => {
      setCompetence(response.data.results);
    });
  };

  const changeData = (e) => {
    setCompetence({ ...competence, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    const typeDataTypeProgram = typeof competence.type_program;

    if (typeDataTypeProgram === "object") {
      competence.type_program = competence.type_program._id;
    }

    // console.log(formationProgram);
    await axios
      .put(`${BASE_URL}competences/${id}`, competence)
      .then((response) => {
        console.log(response);

        const resultUpdate = response.data;
        if (resultUpdate.status === "success") {
          swalWithBootstrapButtons.fire(
            "Actualizado exitosamente",
            resultUpdate.message,
            "success"
            
          );
        } else {
          swalWithBootstrapButtons.fire(
            "Error por validaciones",
            resultUpdate.results.errors[0].msg,
            "warning"
          );
        }
        console.log(resultUpdate);
      })
      .catch((error) => {
        console.log(error);
        swalWithBootstrapButtons.fire(
          "Hubo un error",
          error.response.data.message,
          "error"
        );
      });
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
                          Codigo de Competencia Laboral
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-program_name"
                          name="program_name"
                          placeholder="Nombre del programa de formación"
                          type="text"
                          defaultValue={competence.labor_competition}
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
                          Competencia laboral
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          name="program_code"
                          placeholder="Código del programa de formación"
                          type="text"
                          defaultValue={competence.labor_competence_codeKF}
                          value={competence.labor_competence_code}
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
                          versión de competencia laboral
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          name="program_version"
                          placeholder="Versión del programa de formación"
                          type="text"
                          defaultValue={competence.labor_competition_version}
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
                          Duración estimada
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          name="duration"
                          placeholder="Duración estimada"
                          type="text"
                          defaultValue={competence.duration}
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
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button type="submit" className="justify-content-end m-4">
                    Guardar cambios
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

export default UpdateCompetence;
