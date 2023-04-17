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
import { useHistory, useParams } from "react-router-dom";
import { registerLearningResultService } from "services/learningResults";

const RegisterLearningResult = () => {

  const { id } = useParams();

  const navigate = useHistory();

  const [learningResult, setLearningresult] = useState("");
 
  useEffect(() => {}, []);

  const register = async (e) => {
    e.preventDefault();

    const body = {
      learning_result: learningResult,
      competence: id
    };

    const data = registerLearningResultService(body)
    if(data.status === 'success') {
      swalWithBootstrapButtons.fire(
        'Registro exitoso',
        data.message,
        data.status
      )
      navigate.push(`/admin/learningresults/${id}`);
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
                  <h3 className="mb-0">Registrar Resultado de Aprendizaje</h3>
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
                          Resultado de Aprendizaje
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Resultado de Aprendizaje"
                          type="text"
                          required
                          onChange={(e) => setLearningresult(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                   
                  </Row>
                  <Row>
                    
                  
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

export default RegisterLearningResult;
