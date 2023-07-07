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
import { updateOtherActivityService, getOtherActivityService } from "services/otherActivities";

// import { Swal } from "sweetalert2";

const Updateotheractivity = () => {
  const navigate = useHistory();

  const { id } = useParams();

  useEffect(() => {
    showactivity(id);
  }, [id]);

  const [otheractivity, setOtheractivity] = useState([]);

  const showactivity = async (id) => {
    const data = await getOtherActivityService(id);
    console.log(data);
    setOtheractivity(data.results);

  };

  const changeData = (e) => {
    setOtheractivity({ ...otheractivity, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    // const typeDataTypeProgram = typeof competence.type_program;

    // if (typeDataTypeProgram === "object") {
    //   competence.type_program = competence.type_program._id;
    // }

    const data = await updateOtherActivityService(id, otheractivity);

    if (data.status === "success") {
      swalWithBootstrapButtons.fire(
        "Actualizado exitosamente",
        data.message,
        data.status
      );
      navigate.push(`/admin/titledformations/${otheractivity.rmi}`);
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
                  <h3 className="mb-0">Actualizar actividad</h3>
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
                          htmlFor="activity"
                        >
                          activity
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="activity"
                          name="activity"
                          placeholder="activity"
                          type="text"
                          defaultValue={otheractivity.activity}
                          required
                          onChange={changeData}
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
                          name="description"
                          placeholder="description"
                          type="text"
                          defaultValue={otheractivity.description}
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
                          htmlFor="hours"
                        >
                         hours
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="hours"
                          name="hours"
                          placeholder="hours"
                          type="text"
                          defaultValue={otheractivity.hours}
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

export default Updateotheractivity;
