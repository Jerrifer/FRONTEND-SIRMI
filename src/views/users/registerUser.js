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
import { allTrainingCentersService } from "services/trainingCenters";
import { registerUserService } from "services/users";
import Multiselect from "multiselect-react-dropdown";

const RegisterCompetence = () => {
  const navigate = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [documentnumber, setDocumentnumber] = useState("");
  const [trainingcenterSelected, setTrainingcenterSelected] = useState("");
  const [trainingcenters, setTrainingcenters] = useState([]);

  const showTrainingcenters = async () => {
    const data  = await allTrainingCentersService()
      setTrainingcenters(data.results);
  };

  

  useEffect(() => {
    showTrainingcenters()
  }, []);
  

  const register = async (e) => {

    e.preventDefault();

    const body = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      contact_number: contactnumber,
      document_number: documentnumber,
      training_center:trainingcenterSelected._id
    };
    console.log(trainingcenterSelected);

    const data = await registerUserService(body)
    console.log(data.results);
    if(data.status === 'success') {
      swalWithBootstrapButtons.fire(
        'Registro exitoso',
        data.message,
        data.status
      )
    navigate.push("/admin/users");
    } else {
      swalWithBootstrapButtons.fire(
        data.message,
        data.results,
        data.status
      )
    }
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
                          id="input-first_name"
                          placeholder="Nombre"
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
                          placeholder="Apellidos"
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
                          htmlFor="input-email"
                        >
                          Correo electrónico
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Correo electrónico"
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
                          id="input-passwords"
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
                          Número de contacto
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-contact-number"
                          placeholder="Número de contacto"
                          type="number"
                          onChange={(e) => setContactnumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-document-number"
                        >
                          Número de documento
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-document-number"
                          placeholder="Número de documento"
                          type="number"
                          onChange={(e) => setDocumentnumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Centro de formación 
                        </label>
                          <Multiselect
                            required
                            placeholder="Centro de formación"
                            displayValue="training_center"
                            selectionLimit={1}
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={function noRefCheck(e){
                              setTrainingcenterSelected(e)
                            }}
                            options={trainingcenters}
                            avoidHighlightFirstOption={true}
                            closeOnSelect={true}
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
