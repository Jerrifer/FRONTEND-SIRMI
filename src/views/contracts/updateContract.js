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
import { swalWithBootstrapButtons } from "plugins/alerts";

import { useHistory, useParams } from "react-router-dom";
import { getContractService } from "services/contracts";
import { updateContractService } from "services/contracts";

// import { Swal } from "sweetalert2";

const UpdateContracts = () => {

  const navigate =useHistory();
  const { id } = useParams();

  useEffect(() => {
    showContract(id);
  }, [id]);

  // const [competence, setCompetence] = useState([]);
const [contracts , setContracts] = useState([])


  const showContract = async (id) => {
    const data = await getContractService(id)
      setContracts(data.results);
  };

  const changeData = (e) => {
    setContracts({ ...contracts, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    const data = await updateContractService(id, contracts)
        if (data.status === "success") {
          swalWithBootstrapButtons.fire(
            "Actualizado exitosamente",
            data.message,
            "success"
          );
          navigate.push("/admin/contracts");

        } else {
          swalWithBootstrapButtons.fire(
            "Error por validaciones",
            data.results.errors[0].msg,
            "warning"
          );
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
                          htmlFor="contract_number"
                        >
                        Número de contrato
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-program_name"
                          name="contract_number"
                          placeholder="contract_number"
                          type="text"
                          defaultValue={contracts.contract_number}
                          required
                          onChange={changeData}
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
                          name="object"
                          
                          placeholder="object"
                          type="text"
                          defaultValue={contracts.object}
                        
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
                          htmlFor="pay"
                        >
                         Pago
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="pay"
                          name="pay"
                          placeholder="pay"
                          type="text"
                          defaultValue={contracts.pay}
                          required
                          onChange={changeData}
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
                          name="start_date"
                          placeholder="start_date"
                          type="text"
                          defaultValue={contracts.start_date}
                          required
                          onChange={changeData}
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
                          name="end_date"
                          placeholder="end_date"
                          type="text"
                          defaultValue={contracts.end_date}
                          required
                          onChange={changeData}
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
                          name="type_contract"
                          placeholder="type_contract"
                          type="text"
                          defaultValue={contracts.type_contract}
                          required
                          onChange={changeData}
                        />
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

export default UpdateContracts;
