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
import DetailCompetence from "./detailCompetence";
import "assets/css/indexCompetence.css";
import { alert } from "plugins/alerts.js";
import { allCompetencesService } from "services/competences";
import { deleteCompetenceService } from "services/competences";
import Swal from "sweetalert2";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Spinner from "../../components/loader"
import PaginationData from "plugins/pagination";

const ListCompetence = () => {
  const [competences, setCompetences] = useState([]);

  const [search, setSearch] = useState("");
  const [ rendering, setRendering] = useState(0);
  const [ loading ,setLoading] = useState(true);

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  useEffect(() => {
    showCompetences();
  }, [rendering]);

  // llamado a la api
  const showCompetences = async () => {
    const data = await allCompetencesService();
    setCompetences(data.results);
    setLoading(false)
  };

  const totalCompetences = competences.length

  const deleteCompetence = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar el programa de formación?",
      icon: "warning",
    };
    const confirmed = await alert(alertParams);

    if (confirmed.isConfirmed) {
      const data = await deleteCompetenceService(id);
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
    result = competences;
  } else {
    result = competences.filter((dato) =>
      dato.labor_competence_code
        .toLowerCase()
        .includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <Header title={"Gestionar competencias"} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="formulario ">
              <CardHeader className="border-0">
                <Col lg="6">
                  <Link
                    to={`/admin/RegisterCompetence`}
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
                    <th scope="col">Código</th>
                    <th scope="col">Competencia laboral</th>
                    <th scope="col">Versión</th>
                    <th scope="col">Duración</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {loading && <tr><td><Spinner/></td></tr>}

                  {result
                    .map((competence, i = 0) => {
                      return (
                        <tr key={competence._id}>
                          <td className="text-center">
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td className="text-center">{competence.labor_competence_code}</td>

                          <td className="spaces">
                            {competence.labor_competition}
                          </td>

                          <td className="text-center">{competence.labor_competition_version}</td>

                          <td className="text-center">{competence.duration}</td>

                          <td>
                            <DetailCompetence Competence={competence} />

                            <Link
                              to={`/admin/learningresults/${competence._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button 
                              variant=""
                              id={"btn-program-competence"+competence.labor_competence_code}
                              >
                                <i className="fas fa-award"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={"btn-program-competence"+competence.labor_competence_code}
                              >
                                Resultados de aprendizaje
                              </UncontrolledTooltip>
                            </Link>

                            <Link
                              to={`/admin/updateCompetence/${competence._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="" id={"btn-program-edit"+competence.labor_competence_code}>
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={"btn-program-edit"+competence.labor_competence_code}
                              >
                                Actualizar competencia
                              </UncontrolledTooltip>
                            </Link>

                            <Button
                              variant=""
                              id={"btn-program-delete"+competence.labor_competence_code}
                              onClick={() =>
                                deleteCompetence(competence._id)
                              }
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                            <UncontrolledTooltip
                              
                              delay={0}
                              target={"btn-program-delete"+competence.labor_competence_code}
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
                  totalData={totalCompetences}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListCompetence;
