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
import { getLearningResultService } from "services/learningResults";
import { updateLearningResultService } from "services/learningResults";


const UpdateLearningresults = () => {
  const navigate = useHistory();
  const { id } = useParams();

  useEffect(() => {
    showLearningresults(id);
  }, [id]);

  const [learningResults, setLearningResults] = useState([]);

  const showLearningresults = async (id) => {
    const data = await getLearningResultService(id)
      setLearningResults(data.results);
  };

  const changeData = (e) => {
    setLearningResults({ ...learningResults, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    const data = await updateLearningResultService(id, learningResults)
        console.log(data);

        if (data.status === "success") {
          swalWithBootstrapButtons.fire(
            "Actualizado exitosamente",
            data.message,
            data.status
          );
          navigate.push(`/admin/learningresults/${learningResults.competence._id}`);
        } else {
          swalWithBootstrapButtons.fire(
            data.message,
            data.results,
            data.status
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
                          defaultValue={learningResults.learning_result}
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
