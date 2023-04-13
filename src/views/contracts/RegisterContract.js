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
import { registerContractService } from "services/contracts";

const RegisterContracts = () => {
  const navigate = useHistory();

  const [contractnumber, setContractnumber] = useState("");
  const [object, setObject] = useState("");
  const [pay, setPay] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [typecontract, setTypecontract] = useState("");

  useEffect(() => {}, []);

  const register = async (e) => {
    e.preventDefault();

    const body = {
      contract_number: contractnumber,
      object: object,
      pay: pay,
      start_date: startdate,
      end_date: enddate,
      type_contract: typecontract,
      user: "6435ba221abd3ec5a6aab6e8"
    };

    const data = await registerContractService(body)
    console.log(data);
    swalWithBootstrapButtons.fire(
      "Registro exitoso",
      data.message, 
      "success"
    );
    navigate.push("/admin/contracts");
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
                  <h3 className="mb-0">Registrar Contrato</h3>
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
                          htmlFor="contract_number"
                        >
                          Número de contrato
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="contract_number"
                          placeholder="contract_number"
                          type="text"
                          required
                          onChange={(e) => setContractnumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="object"
                        >
                          Objeto
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="object"
                          placeholder=" object"
                          type="text"
                          required
                          onChange={(e) => setObject(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="pay"
                        >
                          Pago
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="pay"
                          placeholder="pay"
                          type="text"
                          required
                          onChange={(e) => setPay(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="start_date"
                        >
                          Fecha inicio
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="start_date"
                          placeholder="start_date"
                          type="text"
                          onChange={(e) => setStartdate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="end_date"
                        >
                          Fecha fin
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="end_date"
                          placeholder="end_date"
                          type="text"
                          onChange={(e) => setEnddate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>


                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="type_contract"
                        >
                          Tipo de contrato
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="type_contract"
                          placeholder="contrato"
                          type="text"
                          onChange={(e) => setTypecontract(e.target.value)}
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

export default RegisterContracts;
