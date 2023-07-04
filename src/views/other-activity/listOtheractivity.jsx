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
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import DetailOtheractivity from "./detailOtheractivity";
import "assets/css/indexCompetence.css";
import { alert } from "plugins/alerts.js";
import Swal from "sweetalert2";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Spinner from "../../components/loader";
import { allOtherActivityService } from "services/otherActivity";
import { deleteOtheractivityService } from "services/otherActivity";
import PaginationData from "plugins/pagination";
const OtherActivity = () => {
  const [otheractivity, setOtheractivitys] = useState([]);

  const [search, setSearch] = useState("");
  const [ rendering, setRendering] = useState(0);
  const [loading, setLoading] = useState(true);

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    showOtheractivity();
  }, [rendering]);

  // llamado a la api
  const showOtheractivity = async () => {
    const data = await allOtherActivityService();
    setOtheractivitys(data.results);
    setLoading(false);
  };

  const totalOtherActivities = otheractivity.length

  // metodo de eliminar

  const deleteOtheractivity = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar el programa de formación?",
      icon: "warning",
    };
    const confirmed = await alert(alertParams);

    if (confirmed.isConfirmed) {
      const data = await deleteOtheractivityService(id);
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
      <Header title={"Otras actividades"}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="formulario ">
              <CardHeader className="border-0">
                <Col lg="6">
                  <Link
                    to={`/admin/registerOtheractivity`}
                    tag={NavLinkRRD}
                    activeclassname="active"
                  >
                    <button className="btn btn-success bg-success">
                      Registrar
                    </button>
                  </Link>
                </Col>

                <Col lg="6">
                  <input
                    value={search}
                    onChange={searcher}
                    type="search"
                    placeholder="Buscar"
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
                    <th scope="col">activity</th>
                    <th scope="col">description</th>
               
                    <th scope="col">hours</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td><Spinner/></td></tr>}

                  {result
                    .map((otheractivitys, i = 0) => {
                      return (
                        <tr key={otheractivitys._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{otheractivitys.activity}</td>

                          <td className="spaces">
                            {otheractivitys.description}
                          </td>

                          <td>{otheractivitys.hours}</td>

                          <td>
                            <DetailOtheractivity Otheractivity={otheractivitys} index={i}/>

                            <Link
                              to={`/admin/Updateotheractivity/${otheractivitys._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="" id={"btn-program-edit"+i}>
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={"btn-program-edit"+i}
                              >
                                Actualizar competencia
                              </UncontrolledTooltip>
                            </Link>

                           

                            <Button
                              variant=""
                              id={"btn-program-delete"+i}
                              onClick={() =>
                                deleteOtheractivity(otheractivitys._id)
                              }
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target={"btn-program-delete"+i}
                            >
                              Eliminar Competencia 
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
        </Row>
      </Container>
    </>
  );
};

export default OtherActivity;
