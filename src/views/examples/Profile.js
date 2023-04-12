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
// core components
import UserHeader from "components/Headers/UserHeader.js";
import "../../../src/components/Headers/header.css";
const Profile = () => {
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7  align-items-center" fluid>
        <Col className="order-xl-2 align-items-center  " xl="11">
          <Card className="bg-secondary formulario  ">
            <CardHeader className="bg-white border-0 align-items-center">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">My account</h3>
                </Col>
                <Col className="text-right" xs="4">
                  <Button
                    color="success"
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
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  User information
                </h6>
                <h6 className="heading-small text-muted mb-4">
                  id: {localStorage.getItem('id')}
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Username
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={localStorage.getItem('name')}
                          id="input-username"
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Email address
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          defaultValue={localStorage.getItem('email')}
                          type="email"
                          placeholder="Email"
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
                          First name
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={localStorage.getItem('name')}
                          id="input-first-name"
                          placeholder="First name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Last name
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={localStorage.getItem('lastname')}
                          id="input-last-name"
                          placeholder="Last name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                  Contact information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Address
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          id="input-address"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-city"
                        >
                          Contact Number
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={localStorage.getItem('contact')}
                          id="input-city"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Document
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={localStorage.getItem('document')}
                          id="input-country"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    {/* <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Postal code
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-postal-code"
                          placeholder="Postal code"
                          type="number"
                        />
                      </FormGroup>
                    </Col> */}
                  </Row>
                </div>
                <hr className="my-4" />
                {/* Description */}
                <h6 className="heading-small text-muted mb-4">About me</h6>
                <div className="pl-lg-4">
                  <FormGroup>
                    <label>About Me</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="A few words about you ..."
                      rows="4"
                      defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                      type="textarea"
                    />
                  </FormGroup>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Profile;
