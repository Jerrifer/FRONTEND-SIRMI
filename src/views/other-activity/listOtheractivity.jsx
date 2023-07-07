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
import DetailOtheractivity from "./detailOtheractivity";
import "assets/css/indexCompetence.css";
import { alert } from "plugins/alerts.js";
import Swal from "sweetalert2";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Spinner from "../../components/loader";
import { otherActivitiesByRmiService, deleteOtherActivityService } from "services/otherActivities";
import PaginationData from "plugins/pagination";

const OtherActivity = () => {

  const { id } = useParams();

  const [otheractivity, setOtheractivitys] = useState([]);

  const [search, setSearch] = useState("");
  const [ rendering, setRendering] = useState(0);
  const [loading, setLoading] = useState(true);

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    showOtherActivities(id);
  }, [id, rendering]);

  // llamado a la api
  const showOtherActivities = async (id) => {
    const data = await otherActivitiesByRmiService(id);
    if (data.status === "success") {
      console.log(data);
      setOtheractivitys(data.results);
      setLoading(false);
    } else {
      swalWithBootstrapButtons.fire("Error", data.message, "error");
      setLoading(false);
    }
  };

  const totalOtherActivities = otheractivity.length

  // metodo de eliminar

  const deleteOtheractivity = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar el reporte?",
      icon: "warning",
    };
    const confirmed = await alert(alertParams);

    if (confirmed.isConfirmed) {
      const data = await deleteOtherActivityService(id);
      if (data.status === "success") {
        swalWithBootstrapButtons.fire("Eliminado!", data.message, "success");
        setRendering(rendering + 1)
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
    result = otheractivity;
  } else {
    result = otheractivity.filter((dato) =>
      dato.activity
        .toLowerCase()
        .includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
          <div className="col">
            <Card className="formulario ">
              <CardHeader className="border-0">
                <Col lg="2">
                  <Link
                    to={`/admin/registerotheractivity/${id}`}
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
                    Otras actividades
                  </h2>
                </Col>

                <Col lg="4">
                  <input
                    value={search}
                    onChange={searcher}
                    type="search"
                    placeholder="Buscar por actividad"
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
                    <th scope="col">actividad</th>
                    {/* <th scope="col">descripción</th> */}
                    <th scope="col">horas</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td><Spinner/></td></tr>}

                  {result
                    .map((otheractivity, i = 0) => {
                      return (
                        <tr key={otheractivity._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td className="space-400">
                            {otheractivity.activity}
                          </td>

                          {/* <td className="space-400">
                            {otheractivity.description}
                          </td> */}

                          <td>{otheractivity.hours}</td>

                          <td>
                            <DetailOtheractivity Otheractivity={otheractivity} index={i}/>

                            <Link
                              to={`/admin/updateotheractivity/${otheractivity._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="" id={"btn-other-activity-edit"+i}>
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={"btn-other-activity-edit"+i}
                              >
                                Actualizar reporte
                              </UncontrolledTooltip>
                            </Link>

                           

                            <Button
                              variant=""
                              id={"btn-other-activity-delete"+i}
                              onClick={() =>
                                deleteOtheractivity(otheractivity._id)
                              }
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target={"btn-other-activity-delete"+i}
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
                  totalData={totalOtherActivities}
                />
              </CardFooter>
            </Card>
          </div>
    </>
  );
};

export default OtherActivity;
