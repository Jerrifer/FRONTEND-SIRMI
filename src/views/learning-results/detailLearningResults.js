import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DetailLearningresult(data) {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };

  console.log(data.users);
  const [users] = useState(data.users);

  return (
    <>
      <Button className="btn-icon-only" variant="" onClick={initModal}>
        <i className="fas fa-eye-solid fa-eye" />
      </Button>

      <Modal show={isShow} size={"lg"} className=" color">
        <Modal.Header>
          <Modal.Title>Resultado de Aprendizaje... {users._id}</Modal.Title>
        </Modal.Header>

        <div className="container">
          <Modal.Body>
            <div className="container ">
              <Form.Group className="text-center mb-4">
                <h2>{users.learning_result}</h2>
                
              </Form.Group>
              

              
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default DetailLearningresult;
