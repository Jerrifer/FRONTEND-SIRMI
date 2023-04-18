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
import "./profile.scss";
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
            <div class="outer-div">
              <div class="inner-div">
                <div class="front">
                  <div class="front__bkg-photo"></div>
                  <div class="front__face-photo"></div>
                  <div class="front__text">
                    <div class="front__text-header">
                      <p class="m-b-10 f-w-600 tm ">Juan Manuell</p>
                      <i class="fas fa-map-marker-alt front-icons"></i>Cauca
                    </div>
                  </div>

                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600 tm">
                      Informacion 
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 tm">correo</p>
                        <h6 class="text-muted f-w-400 tmm">juanma@gmail.com</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 tm">N° celular</p>
                        <h6 class="text-muted f-w-400 tmm">4545154545</h6>
                      </div>
                    </div>

                    <div class="row mt-4">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 tm">N°Cedula</p>
                        <h6 class="text-muted f-w-400 tmm">423423423</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 tm">N°Cedula</p>
                        <h6 class="text-muted f-w-400 tmm">423423423</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg="5">
            <div>
              <div class="outer-div1">
                <div class="inner-div1">
                  <div class="front">
                    <div class="color">otra parte que no se wponert</div>

                    <div class="body">
                      <div class="skill">
                        <div class="skill-name tm">contrato</div>
                        <div class="skill-level">
                          <div class="skill-percent"></div>
                          {/* style="width: 90%"  */}
                        </div>

                        <div class="skill-percent-number">90%</div>
                      </div>
                      <div class="skill">
                        <div class="skill-name tm">horas</div>
                        <div class="skill-level">
                          <div class="skill-percent"></div>
                        </div>
                        <div class="skill-percent-number">80%</div>
                      </div>

                      <div class="skill">
                        <div class="skill-name tm">historial</div>
                        <div class="skill-level">
                          <div class="skill-percent"></div>
                        </div>
                        <div class="skill-percent-number">75%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* *****************************  */}

            <div className=" mt-4">
              <div class="outer-div1">
                <div class="inner-div1">
                  <div class="front">
                    <div class="color"></div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
