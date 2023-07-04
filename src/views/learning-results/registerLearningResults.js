import React, { useEffect, useState } from "react";

import {
  FormGroup,
  Input,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

import { Modal, Button, Form } from "react-bootstrap";

import { swalWithBootstrapButtons } from "plugins/alerts";
import { useHistory } from "react-router-dom";
import { registerLearningResultService } from "services/learningResults";

function RegisterLearningResult({ competence }) {

  const navigate = useHistory();

  const [learningResult, setLearningresult] = useState("");

  useEffect(() => {}, []);

  const [isShow, invokeModal] = useState(false);

  const initModal = () => {
    return invokeModal(!isShow);
  };

  const register = async (e) => {
    e.preventDefault();

    const body = {
      learning_result: learningResult,
      competence: competence._id
    };

    const data = await registerLearningResultService(body)
    invokeModal(!isShow);
    if(data.status === 'success') {
      swalWithBootstrapButtons.fire(
        'Registro exitoso',
        data.message,
        data.status
      )
      navigate.push(`/admin/learningresults/${competence._id}`);
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
      <Button
        variant=""
        className="btn btn-success bg-success"
        id="btn-register-result"
        onClick={initModal}
      >
        Registrar
      </Button>
      <UncontrolledTooltip
        
        delay={0}
        target="btn-register-result"
      >
        Registrar resultado
      </UncontrolledTooltip>

      <Modal show={isShow} size={"lg"} className=" color">
        <Modal.Header className="justify-content-end pb-0">
          <i className="fas fa-remove" style={{cursor: 'pointer'}} onClick={initModal}></i>
        </Modal.Header>
          <Modal.Body>
            <Form onSubmit={register}>
                <div className="px-5">
                    <Form.Group className="text-center mb-4">
                      <h1>Registrar resultado de aprendizaje</h1>
                    </Form.Group>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Nombre del resultado de Aprendizaje
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
          </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterLearningResult;

// Page content
//       <Container className="mt--7  align-items-center" fluid>
//         <Col className="order-xl-2 align-items-center  " xl="11">
//           <Card className="bg-secondary formulario  ">
//             <CardHeader className="bg-white border-0 align-items-center">
//               <Row className="align-items-center">
//                 <Col s="8">
//                   <h3 className="mb-0">Registrar Resultado de Aprendizaje</h3>
//                 </Col>
//               </Row>
//             </CardHeader>
//             <CardBody>
//               <Form onSubmit={register}>
//                 <div className="px-5">
//                   <Row>
//                     <Col lg="6">
//                       <FormGroup>
//                         <label
//                           className="form-control-label"
//                           htmlFor="input-username"
//                         >
//                           Resultado de Aprendizaje
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           id="input-username"
//                           placeholder="Resultado de Aprendizaje"
//                           type="text"
//                           required
//                           onChange={(e) => setLearningresult(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>

//                   </Row>
//                   <Row>

//                   </Row>

//                   <Button
//                     type="submit"
//                     className="btn btn-success m-4 bg-success"
//                   >
//                     Registrar
//                   </Button>
//                 </div>
//               </Form>
//             </CardBody>
//           </Card>
//         </Col>
//       </Container>
