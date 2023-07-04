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
import { registerContractService } from "services/contracts";
import { getUserService } from "services/users";
import { TextArea } from "semantic-ui-react";
import Multiselect from "multiselect-react-dropdown";
import { optionValueDecorator } from "plugins/multiSelect";
import { closeIcon } from "plugins/multiSelect";
import { allThematicLinesService } from "services/thematicLines";
import { customStyle } from "plugins/multiSelect";

export const selectedValueDecorator = (selectedItem) => {
  return (
    <div style={{maxWidth: '300px', overflow: 'hidden'}}>
        <h6 className="t6">{selectedItem}</h6>
    </div>
  );
  };

const RegisterContracts = () => {
  const navigate = useHistory();
  const id = useParams()

  const [user, setUser] = useState([])
  const [thematicLines, setThematicLines] = useState([])

  useEffect(() => {
    showUser(id)
    showThematicLines()
  }, [id]);
  
  const [contractnumber, setContractnumber] = useState("");
  const [object, setObject] = useState("");
  const [pay, setPay] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [typecontract, setTypecontract] = useState("");
  const [thematicLineSelected, setThematicLineSelected] = useState("");

  const showThematicLines = async () => {
    const data = await allThematicLinesService()
    setThematicLines(data.results)
  }

  const showUser = async (id) => {
    const data = await getUserService(id.id)
    setUser(data.results)
  }

  const register = async (e) => {
    e.preventDefault();

    const body = {
      contract_number: contractnumber,
      object: object,
      pay: pay,
      start_date: startdate,
      end_date: enddate,
      type_contract: typecontract,
      user: id.id,
      thematic_line: thematicLineSelected,
    };

    const data = await registerContractService(body)
    if(data.status === 'success') {
      swalWithBootstrapButtons.fire(
        'Registro exitoso',
        data.message,
        data.status
      )
      navigate.push(`/admin/contracts/${id.id}`);
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
                  <h3 className="mb-0">Registrar Contrato a {user.first_name} {user.last_name}</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={register}>
                <div className="px-5">
                  <Row>
                    <Col lg="4">
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
                          placeholder="Ej. 123456"
                          type="text"
                          required
                          onChange={(e) => setContractnumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
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
                          placeholder="Ej. Prestación de Servicios"
                          type="text"
                          onChange={(e) => setTypecontract(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="thematic_line"
                        >
                          Línea tématica
                        </label>
                        <Multiselect
                            id="thematic_line"
                            required
                            selectedValueDecorator={selectedValueDecorator}
                            optionValueDecorator={optionValueDecorator}
                            customCloseIcon={closeIcon}
                            style={customStyle}    
                            avoidHighlightFirstOption={true}
                            closeOnSelect={true}
                            hidePlaceholder={true}
                            loading={thematicLines.length <= 0}
                            selectionLimit={1}
                            emptyRecordMsg="No hay más datos"
                            showCloseIcon={true}
                            onKeyPressFn={function noRefCheck() {}}
                            onSearch={function noRefCheck() {}}
                            onRemove={function noRefCheck() {}}
                            onSelect={function noRefCheck(e) {
                              setThematicLineSelected(e[0]);
                            }}
                            placeholder="Seleccionar"
                            displayValue="thematic_line"
                            options={thematicLines}
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
                          Valor y forma de Pago
                        </label>
                        <TextArea
                          className="form-control-alternative rounded-5"
                          id="pay"
                          placeholder="Ej. El valor total del presente contrato asciende a la suma de..."
                          type="text"
                          required
                          rows="4" cols="71"
                          onChange={(e) => setPay(e.target.value)}
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
                        <TextArea
                          className="form-control-alternative"
                          id="object"
                          placeholder="Ej. PRESTAR SERVICIOS PERSONALES DE CARACTER TEMPORAL COMO INSTRUCTOR CONTRATISTA..."
                          type="text"
                          required
                          rows="4" cols="71"
                          onChange={(e) => setObject(e.target.value)}
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
                          type="date"
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
                          type="date"
                          onChange={(e) => setEnddate(e.target.value)}
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
