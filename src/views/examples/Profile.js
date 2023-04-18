// reactstrap components
import {
  // Button,
  // Card,
  // CardHeader,
  // CardBody,
  // FormGroup,
  // Form,
  // Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import "./profile.css";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import "../../../src/components/Headers/header.css";
const Profile = () => {
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7  align-items-center" fluid>
        <Row>
          <Col lg="5">
            <div className="profile  mr-3 mt-4">

              <div className="perfil">
                <div className="info">
                <div className="images">
                  <img src="https://lostramites.com.co/wp-content/uploads/logo-de-Sena-sin-fondo-Blanco-300x300.png" alt =""
                    />
                    </div>
                <div className="name">
                  <h1>jerri fernando meneses</h1>
                </div>
                </div>

                <div className="content">
                  <div>
                    <h6>fsefse</h6>
                  </div>

                  <div>
                    <h6>fsefse</h6>
                  </div>

                  <div>
                    <h6>fsefse</h6>
                  </div>

                  <div>
                    <h6>fsefse</h6>
                  </div>
                  <div>
                    <h6>fsefse</h6>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg="5">
            <div className="card-top  mt-4">
              <h1>ggdfgdfg</h1>
            </div>
            <div className="card-top mt-5">
              <h1>ggdfgdfg</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
