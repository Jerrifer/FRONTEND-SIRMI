import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  Col
} from "reactstrap";
// core components
import AdminHeader from "components/Headers/admin/AdminHeader.js";

const Profile = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const navigate = useHistory();

  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3005/api/v1/users';
      const {data: res} = await axios.post(url, data);
      navigate.push('/auth/login');
      console.log(res.message);
    } catch (error) {
      if( error.response && 
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data);
        }
    }
    // console.log(data);
  }

  return (
    <>
      <AdminHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Name"
                            type="text"
                            name="name" 
                            value={data.name}
                            require
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="example@example.com"
                            type="email"
                            name="email" 
                            value={data.email}
                            onChange={handleChange}
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
                            Password
                          </label>
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
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button className="mt-4" color="primary" type="submit">
                        Create account
                      </Button>
                    </div>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
