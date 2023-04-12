/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import axios from "axios";

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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../../src/components/Headers/header.css";
import { BASE_URL } from "globals.constans";
import { alert } from "./alertsCompetence";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import DetailFormationProgram from "./detailCompetence";
import "assets/css/indexCompetence.css";

const ListCompetence = () => {
  const [competencesAssign, setCompetencesAssign] = useState([]);

  const [search, setSearch] = useState("");

  const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // };

  const showCompetences = async () => {
    await axios.get(`${BASE_URL}competences`).then((response) => {
      setCompetencesAssign(response.data.results);
    });
  };

  useEffect(() => {
    showCompetences();
  }, []);

  const deleteFormationProgram = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar la Competencia?",
      icon: "warning",
    };
    alert(alertParams.title, alertParams.icon, id);
    showCompetences();
  };
  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  let result = [];

  if (!search) {
    result = competencesAssign;
  } else {
    result = competencesAssign.filter((dato) =>
      dato.labor_competence_code
        .toLowerCase()
        .includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <Header />
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
                    <button class="cssbuttons-io-button">
                      {" "}
                      Registrar
                      <div class="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path
                            fill="currentColor"
                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </Link>
                </Col>

                <Col lg="6">
                  <input
                    value={search}
                    onChange={searcher}
                    type="search"
                    placeholder="search"
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
                    <th scope="col">id</th>
                    <th scope="col">Labor Competence-CODE</th>
                    <th scope="col">labor_competition</th>
                    <th scope="col">labor_competition_version</th>
                    <th scope="col">duration</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {result
                    .map((competencesAssign, i = 0) => {
                      return (
                        <tr key={competencesAssign._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{competencesAssign.labor_competence_code}</td>

                          <td className="space">
                            {competencesAssign.labor_competition}
                          </td>

                          <td>{competencesAssign.labor_competition_version}</td>

                          <td>{competencesAssign.duration}</td>

                          <td>
                            <DetailFormationProgram
                              competence={competencesAssign}
                            />

                            <Link
                              to={`/admin/updateCompetence/${competencesAssign._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="">
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                            </Link>

                            <Link
                              to={`/admin/learningresults/bycompetence/${competencesAssign._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button
                                variant="">
                                  <i className="fas fa-circle-plus"></i>
                              </Button>
                            </Link>




                            <Button
                              variant=""
                              onClick={() =>
                                deleteFormationProgram(competencesAssign._id)
                              }
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                    .slice((currentPage - 1) * 5, (currentPage - 1) * 7 + 7)}
                </tbody>
              </Table>

              <CardFooter className="py-4"></CardFooter>
              {/* <PaginationData
                userPerPage={userPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalUsers={totalFormationPrograms}
              /> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListCompetence;
