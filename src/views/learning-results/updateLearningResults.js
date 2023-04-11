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


const UpdateLearningresults = () => {
  const navigate = useHistory();
  const { id } = useParams();

  useEffect(() => {
    showLearningresults(id);
  }, [id]);

  const [learningresults, setLearningresults] = useState([]);

  const showLearningresults = async (id) => {
    await axios.get(`${BASE_URL}learningresults/${id}`).then((response) => {
      setLearningresults(response.data.results);
    });
  };

  const changeData = (e) => {
    setLearningresults({ ...learningresults, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    const typeDataTypeProgram = typeof learningresults.type_program;

    if (typeDataTypeProgram === "object") {
      learningresults.type_program = learningresults.type_program._id;
    }

    await axios.put(`${BASE_URL}learningresults/${id}`, learningresults)
      .then((response) => {
        console.log(response);

        const resultUpdate = response.data;
        if (resultUpdate.status === "success") {
          swalWithBootstrapButtons.fire(
            "Actualizado exitosamente",
            resultUpdate.message,
            "success"
          );
          navigate.push("/admin/learningresults");
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
                  <h3 className="mb-0">Actualizar Resultado de Aprendizaje</h3>
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
                          htmlFor="input-email"
                        >
                          Resultado de Aprendizaje
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="learning_result"
                          name="learning_result"
                          placeholder="Resultado de Aprendizaje"
                          type="text"
                          defaultValue={learningresults.learning_result}
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

export default UpdateLearningresults;
