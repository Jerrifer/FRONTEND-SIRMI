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
import { registerOtherActivityService } from "services/otherActivity";

const RegisterCompetence = () => {
  const navigate = useHistory();

  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");

  useEffect(() => {}, []);

  const register = async (e) => {
    e.preventDefault();

    const body = {
      activity: activity,
      description: description,
      hours: hours,
    };


    const data = await registerOtherActivityService(body);
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
      navigate.push("/admin/otheractivity");
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
                  <h3 className="mb-0">Registrar actividad</h3>
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
                          htmlFor="activity"
                        >
                          activity
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="activity"
                          placeholder=" activity"
                          type="text"
                          required
                          onChange={(e) => setActivity(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="description"
                        >
                          description
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="description"
                          placeholder=" description"
                          type="text"
                          required
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="hours"
                        >
                          hours
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="hours"
                          placeholder="hours"
                          type="text"
                          required
                          onChange={(e) => setHours(e.target.value)}
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
