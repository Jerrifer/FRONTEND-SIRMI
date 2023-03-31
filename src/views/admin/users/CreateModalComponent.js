import React from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Input } from "reactstrap";
import { Icon } from "semantic-ui-react";

function CreateModalComponent() {
  const [isShow, invokeModal] = useState(false);

  const initModal = () => {
    return invokeModal(!isShow);
  };

  // form updating data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [/* error, */ setError] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const url = "http://localhost:3500/api/v1/users";
      const { data: res } = await axios.post(url, data).then((res) => {
        console.log(res);
        initModal();
      });
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data);
      }
    }
  };

  return (
    <>
      <Icon size="20" variant="success" onClick={initModal}>
        <i class="fas fa-plus"></i>
      </Icon>

      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <p>Are you sure you want to Create this user?</p>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Input
                className="form-control-alternative"
                placeholder="Name"
                type="text"
                name="name"
                value={data.name}
                require
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Input
                className="form-control-alternative"
                id="input-email"
                placeholder="example@example.com"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Input
                className="form-control-alternative"
                defaultValue="Lucky"
                id="input-first-name"
                placeholder="First name"
                type="text"
                name="password"
                value={data.password}
                require
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
            <Button color="primary" type="submit">
              Create account
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default CreateModalComponent;
