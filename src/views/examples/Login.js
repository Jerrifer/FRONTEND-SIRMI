import { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { signInService } from "services/auth";
import { swalWithBootstrapButtons } from "plugins/alerts";
// import { signInService } from "services/auth";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    contact_number: "", 
    document_number: "",
  });


  const [setError] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInService(data)
      const login = response.results;
      console.log(response)

      if (response.status === "success") {
        // localStorage.setItem("user", login.user);
        console.log(login);
        localStorage.setItem("name", login.user.first_name);
        localStorage.setItem("lastname", login.user.last_name);
        localStorage.setItem("email", login.user.email);
        localStorage.setItem("contact", login.user.contact_number);
        localStorage.setItem("document", login.user.document_number);
        localStorage.setItem("id", login.user._id);
        localStorage.setItem("training_center", login.user.training_center._id);
        localStorage.setItem("token", login.token);
        swalWithBootstrapButtons.fire(
          "Registro exitoso",
          response.message,
          response.status
        );
        window.location = "/admin/users";
      } else {
        swalWithBootstrapButtons.fire(response.message, response.results, response.status);
      }

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
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Inciar sesión</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    required
                    value={data.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    value={data.password}
                    required
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Inciar sesión
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              {/* <small>Forgot password?</small> */}
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              {/* <small>Create new account</small> */}
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
