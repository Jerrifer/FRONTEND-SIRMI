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
    setRegionale(data.results.training_center?.municipalitie?.regionale)
  }


  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7  align-items-center" fluid>
        <Row>
          <Col lg="5">
            <div className="outer-div">
              <div className="inner-div">
                <div className="front">
                  <div className="front__bkg-photo" style={{backgroundImage: `url(${fondo})` }}></div>
                  <div className="front__face-photo"></div>
                  <div className="front__text">
                    <div className="front__text-header">
                      <p className="m-b-10 f-w-600 tm ">{user.first_name} {user.last_name}</p>
                      <h3 className="d-flex justify-content-center"><i className="ni ni-single-02 text-default front-icons"></i>Instructor</h3>
                    </div>
                  </div>

                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600 tm">
                      Informacion 
                    </h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600 tm">Correo electrónico</p>
                        <h6 className="text-muted f-w-400 tmm">{user.email}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600 tm">Número de contacto</p>
                        <h6 className="text-muted f-w-400 tmm">{user.contact_number}</h6>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600 tm">Número de identificación</p>
                        <h6 className="text-muted f-w-400 tmm">{user.document_number}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600 tm">Estado</p>
                        <h6 className="text-muted f-w-400 tmm">Activo</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg="5">
            <div>
              <div className="outer-div1">
                <div className="inner-div1">
                  <div className="front">
                    <div className="color-dasd">Estado de horas</div>

                    <div className="body">
                      <div className="skill">
                        <div className="skill-name tm">contrato</div>
                        <div className="skill-level">
                          <div className="skill-percent"></div>
                          {/* style="width: 90%"  */}
                        </div>

                        <div className="skill-percent-number">90%</div>
                      </div>
                      <div className="skill">
                        <div className="skill-name tm">horas</div>
                        <div className="skill-level">
                          <div className="skill-percent"></div>
                        </div>
                        <div className="skill-percent-number">80%</div>
                      </div>

                      <div className="skill">
                        <div className="skill-name tm">historial</div>
                        <div className="skill-level">
                          <div className="skill-percent"></div>
                        </div>
                        <div className="skill-percent-number">75%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* *****************************  */}

            <div className=" mt-4">
              <div className="outer-div1">
                <div className="inner-div1">
                  <div className="front">
                    <div className="color-dasd">Ubicación</div>
                      <div className="body">
                          <div className="row mt-4">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600 tm">Regional</p>
                              <h6 className="text-muted f-w-400 tmm">{regionale.regionale}</h6>
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600 tm">Centro de formación</p>
                              <h6 className="text-muted f-w-400 tmm">{trainingCenter.training_center}</h6>
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
