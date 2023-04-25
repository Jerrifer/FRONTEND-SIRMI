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
// import { BASE_URL } from "globals.constans";
// import axios from "axios";
import { swalWithBootstrapButtons } from "plugins/alerts";

import { useHistory, useParams } from "react-router-dom";
import { getTitledFormationService } from "services/titledFormations";
import { updateTitledFormationService } from "services/titledFormations";

// import { Swal } from "sweetalert2";

const UpdateTitledFormation = () => {
  const navigate = useHistory();

  const { id } = useParams();

  useEffect(() => {
    showTitledFormation(id);
  }, [id]);

  const [titledFormation, setTitledFormation] = useState([]);

  const showTitledFormation = async (id) => {
    const data = await getTitledFormationService(id);
    setTitledFormation(data.results);

    // console.log(data);
  };

  const changeData = (e) => {
    setTitledFormation({ ...titledFormation, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    const data = await updateTitledFormationService(id, titledFormation);
    if (data.status === "success") {
      swalWithBootstrapButtons.fire(
        "Actualizado exitosamente",
        data.message,
        data.status
      );
      navigate.push("/admin/titledformations");
    } else {
      swalWithBootstrapButtons.fire(data.message, data.results, data.status);
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
                  <h3 className="mb-0">Actualizar reporte de formación asignada</h3>
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
                          htmlFor="input-ficha"
                        >
                          Ficha
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-ficha"
                          name="ficha"
                          placeholder="Ej. 24514755"
                          type="text"
                          defaultValue={titledFormation.ficha}
                          required
                          onChange={changeData}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-activity"
                        >
                          Actividad
                        </label>
                        <Input
                          disabled
                          className="form-control-alternative"
                          id="input-activity"
                          name="activity"
                          placeholder="Ej. Determinar el cumplimiento de las buenas prácticas de calidad en el desarrollo de software"
                          type="text"
                          defaultValue={titledFormation.activity}
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
                          htmlFor="input-hours-month"
                        >
                          Horas al mes
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-hours-month"
                          name="hours_month"
                          placeholder="Ej. 48"
                          type="text"
                          defaultValue={titledFormation.hours_month}
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

export default UpdateTitledFormation;
