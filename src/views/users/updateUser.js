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
import { updateUserService } from "services/users";
import { allTrainingCentersService } from "services/trainingCenters";
import { getUserService } from "services/users";

const UpdateUser = () => {
  const navigate = useHistory();
  const { id } = useParams();

  useEffect(() => {
    showUser(id);
    showTrainingcenters()
  }, [id]);

  const [user, setUser] = useState([]);
  const [trainingcenters, setTrainingcenters] = useState([]);

  const showUser = async (id) => {
    const data = await getUserService(id);
    setUser(data.results);
  };

  const showTrainingcenters = async () => {
    const data  = await allTrainingCentersService()
      setTrainingcenters(data.results);
  };

  const changeData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    const data = await updateUserService(id, user);

    if (data.status === "success") {
      swalWithBootstrapButtons.fire(
        "Actualizado exitosamente",
        data.message,
        data.status
      );
      navigate.push("/admin/users");
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
                  <h3 className="mb-0">Actualizar Usuario</h3>
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
                          htmlFor="first_name"
                        >
                          Nombre
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="first_name"
                          name="first_name"
                          placeholder="Primer Nombre"
                          type="text"
                          defaultValue={user.first_name}
                          required
                          onChange={changeData}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="last_name"
                        >
                          Apellidos
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="last_name"
                          name="last_name"
                          placeholder="Segundo Nombre"
                          type="text"
                          defaultValue={user.last_name}
                          required
                          onChange={changeData}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="email">
                          Correo electronico
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="email"
                          name="email"
                          placeholder="Correo electronico"
                          type="email"
                          defaultValue={user.email}
                          required
                          onChange={changeData}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="password"
                        >
                          Contraseña
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="password"
                          name="password"
                          placeholder="Contraseña"
                          type="password"
                          defaultValue={user.password}
                          required
                          onChange={changeData}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="contact_number"
                        >
                          Numero de Contanto
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="contact_number"
                          name="contact_number"
                          placeholder="Numero de Contanto"
                          type="number"
                          defaultValue={user.contact_number}
                          required
                          onChange={changeData}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="document_number"
                        >
                          Numero de Documento
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="document_number"
                          name="document_number"
                          placeholder="Numero de Documento"
                          type="number"
                          defaultValue={user.document_number}
                          required
                          onChange={changeData}
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
                      
                          <select className="input" name="training_center" onChange={changeData}>
                            {trainingcenters.map((trainingcenter) =>
                                <option key={trainingcenter._id} value={trainingcenter._id}>{trainingcenter.training_center}</option>
                            )}
                          </select>
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

export default UpdateUser;
