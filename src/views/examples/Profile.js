// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import "./profile.scss";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import "../../../src/components/Headers/header.css";
import { useEffect, useState } from "react";
import { getUserService } from "services/users";
import fondo from "assets/img/brand/photo-pinos.webp";

const Profile = () => {

  useEffect(() => {
    showDataUser()
  })

  const [user, setUser ] = useState([])
  const [trainingCenter, setTrainingCenter ] = useState([])
  const [regionale, setRegionale ] = useState([])

  const showDataUser = async () => {
    const idUser = localStorage.getItem('id')
    const data = await getUserService(idUser)
    setUser(data.results)
    setTrainingCenter(data.results.training_center)
    setRegionale(data.results.training_center.municipalitie.regionale)
  }


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
                  <div class="front__bkg-photo" style={{backgroundImage: `url(${fondo})` }}></div>
                  <div class="front__face-photo"></div>
                  <div class="front__text">
                    <div class="front__text-header">
                      <p class="m-b-10 f-w-600 tm ">{user.first_name} {user.last_name}</p>
                      <i class="fas fa-map-marker-alt front-icons"></i> Instructor
                    </div>
                  </div>

                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600 tm">
                      Informacion 
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 tm">Correo electrónico</p>
                        <h6 class="text-muted f-w-400 tmm">{user.email}</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 tm">Número de contacto</p>
                        <h6 class="text-muted f-w-400 tmm">{user.contact_number}</h6>
                      </div>
                    </div>

                    <div class="row mt-4">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 tm">Número de identificación</p>
                        <h6 class="text-muted f-w-400 tmm">{user.document_number}</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600 tm">Estado</p>
                        <h6 class="text-muted f-w-400 tmm">Activo</h6>
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
                    <div class="color-dasd">Estado de horas</div>

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
                    <div class="color-dasd">Ubicación</div>
                      <div class="body">
                          <div class="row mt-4">
                            <div class="col-sm-6">
                              <p class="m-b-10 f-w-600 tm">Regional</p>
                              <h6 class="text-muted f-w-400 tmm">{regionale.regionale}</h6>
                            </div>
                            <div class="col-sm-6">
                              <p class="m-b-10 f-w-600 tm">Centro de formación</p>
                              <h6 class="text-muted f-w-400 tmm">{trainingCenter.training_center}</h6>
                            </div>
                      </div>
                    </div>
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
