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
import { BASE_URL } from "globals.constans";
import axios from "axios";
import { swalWithBootstrapButtons } from "plugins/alerts";
import { useHistory } from "react-router-dom";

const RegisterCompetence = () => {
  const navigate = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [documentnumber, setDocumentnumber] = useState("");

  useEffect(() => {}, []);

  const register = async (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      contact_number: contactnumber,
      document_number: documentnumber,
    };

    const response = await axios.post(`${BASE_URL}users`, data);
    const resultRegister = await response.data.results;
    console.log(resultRegister);
    swalWithBootstrapButtons.fire(
      "Registro exitoso",
      "El Usuario se registro con éxito.",
      "success"
    );
    navigate.push("/admin/users");
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
                  <h3 className="mb-0">Registrar Usuario</h3>
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
                          Nombre
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Primer Nombre"
                          type="text"
                          required
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Apellidos
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Segundo Nombre"
                          type="text"
                          required
                          onChange={(e) => setLastName(e.target.value)}
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
                          Correo electronico
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          placeholder="Correo electronico"
                          type="email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Contraseña
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Contraseña"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Numero de Contanto
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Numero de Contanto"
                          type="number"
                          onChange={(e) => setContactnumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Numero de Documento
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Numero de Documento"
                          type="number"
                          onChange={(e) => setDocumentnumber(e.target.value)}
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
