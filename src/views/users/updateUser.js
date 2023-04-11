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
import { BASE_URL } from "globals.constans";
import axios from "axios";
import { swalWithBootstrapButtons } from "plugins/alerts";

import { useHistory, useParams } from "react-router-dom";


const UpdateUser = () => {
  const navigate = useHistory();
  const { id } = useParams();

  useEffect(() => {
    showFormationProgram(id);
  }, [id]);

  const [user, setUser] = useState([]);

  const showFormationProgram = async (id) => {
    await axios.get(`${BASE_URL}users/${id}`).then((response) => {
      setUser(response.data.results);
    });
  };

  const changeData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    const typeDataTypeProgram = typeof user.type_program;

    if (typeDataTypeProgram === "object") {
      user.type_program = user.type_program._id;
    }

    await axios.put(`${BASE_URL}users/${id}`, user)
      .then((response) => {
        console.log(response);

        const resultUpdate = response.data;
        if (resultUpdate.status === "success") {
          swalWithBootstrapButtons.fire(
            "Actualizado exitosamente",
            resultUpdate.message,
            "success"
          );
          navigate.push("/admin/users");
        } else {
          swalWithBootstrapButtons.fire(
            "Error por validaciones",
            resultUpdate.results.errors[0].msg,
            "warning"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        swalWithBootstrapButtons.fire(
          "Hubo un error",
          error.response.data.message,
          "error"
        );
      });
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
                          htmlFor="input-username"
                        >
                          Nombre
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-program_name"
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
                          htmlFor="input-email"
                        >
                          Apellidos
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
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
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Correo electronico
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
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
                          htmlFor="input-email"
                        >
                          Contraseña
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
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
                          htmlFor="input-email"
                        >
                          Numero de Contanto
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
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
                          htmlFor="input-email"
                        >
                          Numero de Documento
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          name="document_number"
                          placeholder="Numero de Documento"
                          type="number"
                          defaultValue={user.document_number}
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

export default UpdateUser;
