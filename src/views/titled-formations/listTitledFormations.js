/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../../src/components/Headers/header.css";
import { Link, NavLink as NavLinkRRD, useParams } from "react-router-dom";
import { alert } from "plugins/alerts.js";
import Swal from "sweetalert2";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Spinner from "../../components/loader"
import PaginationData from "plugins/pagination";
import { allTitledFormationsService } from "services/titledFormations";
import { deleteTitledFormationService } from "services/titledFormations";
import { titledFormationsByRmiService } from "services/titledFormations";
import OtherActivity from "views/other-activity/listOtheractivity";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const ListTitledFormations = () => {

  const { id } = useParams();

  const [titledFormations, setTitledFormations] = useState([]);
  const [rmi, setRmi] = useState([]);

  const [search, setSearch] = useState("");
  const [ rendering, setRendering] = useState(0);
  const [ loading ,setLoading] = useState(true);

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    showTitledFormations(id);
  }, [id, rendering]);

  const showTitledFormations = async (id) => {
    const data = await titledFormationsByRmiService(id);
    if (data.status === "success") {
      setTitledFormations(data.results.allTitledFormations);
      setRmi(data.results.rmi);
      setLoading(false)
    } else {
      swalWithBootstrapButtons.fire("Error", data.message, "error");
      setTitledFormations([]);
      setLoading(false)
    }
  };

  const totalTitledFormations = titledFormations.length 

  const deleteTitledFormation = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar el reporte de formación?",
      icon: "warning",
    };
    const confirmed = await alert(alertParams);

    if (confirmed.isConfirmed) {
      const data = await deleteTitledFormationService(id);
      setRendering(rendering + 1)
      if (data.status === "success") {
        swalWithBootstrapButtons.fire("Eliminado!", data.message, "success");
      } else {
        swalWithBootstrapButtons.fire("Error!", data.message, "error");
      }
    } else if (confirmed.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire("Cancelado!", "", "info");
    }
  };

  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  let result = [];

  if (!search) {
    result = titledFormations;
  } else {
    result = titledFormations.filter((dato) =>
      dato.ficha
        .toLowerCase()
        .includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <Header title={"Gestionar reportes "+months[rmi.month]+" "+rmi.year || "MesAño..."} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <Col lg="6">
            <div className="col">
              <Card className="formulario ">
                <CardHeader className="border-0">
                  <Col lg="2" className="p-0">
                      <Link
                        to={`/admin/registertitledformation/${id}`}
                        tag={NavLinkRRD}
                        activeclassname="active"
                        >
                        <button className="btn btn-success bg-success">
                          Registrar
                        </button>
                      </Link>
                  </Col>

                  <Col lg="6" className="d-flex justify-content-center align-items-center">
                  <h2>
                    Reportes de formación
                  </h2>
                </Col>

                  <Col lg="4">
                    <input
                      value={search}
                      onChange={searcher}
                      type="search"
                      placeholder="Buscar por ficha"
                      className="input"
                    />
                  </Col>
                </CardHeader>
                <Table
                  className=" table table-striped table-hover  shadow-lg align-items-center table-flush"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Ficha</th>
                      {/* <th scope="col">Actividad</th> */}
                      <th scope="col">Horas al mes</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                  {loading && <tr><td><Spinner/></td></tr>}

                    {result
                      .map((titledFormation, i = 0) => {
                        return (
                          <tr key={titledFormation._id}>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                {i + 1}
                              </Badge>
                            </td>

                            <td>{titledFormation.ficha}</td>

                            {/* <td>{titledFormation.activity}</td> */}

                            <td>{titledFormation.hours_month}</td>

                            <td>

                              <Link
                                to={`/admin/detailtitledformation/${titledFormation._id}`}
                                tag={NavLinkRRD}
                                activeclassname="active"
                              >
                                <Button variant="" id={"btn-formation-detail"+i}>
                                  <i className="fas fa-eye-solid fa-eye"/>
                                </Button>
                                <UncontrolledTooltip
                                  delay={0}
                                  target={"btn-formation-detail"+i}
                                >
                                  Ver detalle reporte
                                </UncontrolledTooltip>
                              </Link>

                              <Link
                                to={`/admin/updatetitledformation/${titledFormation._id}`}
                                tag={NavLinkRRD}
                                activeclassname="active"
                              >
                                <Button variant="" id={"btn-formation-edit"+i}>
                                  <i className="fas fa-pen-alt"></i>
                                </Button>
                                <UncontrolledTooltip
                                  delay={0}
                                  target={"btn-formation-edit"+i}
                                >
                                  Actualizar reporte
                                </UncontrolledTooltip>
                              </Link>

                              <Button
                                variant=""
                                id={"btn-formation-delete"+i}
                                onClick={() =>
                                  deleteTitledFormation(titledFormation._id)
                                }
                              >
                                <i className="fas fa-trash-alt"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={"btn-formation-delete"+i}
                              >
                                Eliminar reporte
                              </UncontrolledTooltip>
                            </td>
                          </tr>
                        );
                      })
                      .slice((currentPage - 1) * 7, (currentPage - 1) * 7 + 7)}
                  </tbody>
                </Table>

                <CardFooter className="py-4">
                  <PaginationData
                    userPerPage={userPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalData={totalTitledFormations}
                  />
                </CardFooter>
              </Card>
            </div>
          </Col>
          <Col lg="6">
            <OtherActivity />
          </Col>
        </Row>
        {/* <Row>
          <OtherActivity />
        </Row> */}
      </Container>
    </>
  );
};

export default ListTitledFormations;
