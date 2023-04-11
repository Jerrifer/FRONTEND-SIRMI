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

const RegisterLearningResult = () => {
  const navigate = useHistory();

  const [learningResult, setLearningresult] = useState("");
 
  useEffect(() => {}, []);

  const register = async (e) => {
    e.preventDefault();

    const data = {
      learning_result: learningResult,
     
    };

    const response = await axios.post(`${BASE_URL}learningresults`, data);
    const resultRegister = await response.data.results;
    console.log(resultRegister);
    swalWithBootstrapButtons.fire(
      "Registro exitoso",
      "El Resultado de Aprendizaje se registro con éxito.",
      "success"
    );
    navigate.push("/admin/learningresults");
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
