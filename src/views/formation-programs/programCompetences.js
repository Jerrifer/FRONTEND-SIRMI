/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import axios, { all } from "axios";

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
import { Link, NavLink as NavLinkRRD, useParams } from "react-router-dom";
import AssignCompetences from "./assignCompetences";
import Multiselect from "multiselect-react-dropdown";
import { alert } from "plugins/alerts";

const ProgramCompetences = () => {
  const { id } = useParams();
  
  useEffect(() => {
    showCompetences()
    showFormationProgram(id);
  }, [id]);

  var [allCompetences, setAllCompetences] = useState([]);
  const [competencesByProgram, setCompetencesByProgram] = useState([]);
  const [formationProgram, setFormationProgram] = useState([]);

  const [search, setSearch] = useState("");

  const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const showFormationProgram = async (id) => {
    await axios.get(`${BASE_URL}formationprograms/${id}`).then((response) => {
      setFormationProgram(response.data.results);
      setCompetencesByProgram(response.data.results.competences);
    });
  };

  const showCompetences = async () => {
    await axios.get(`${BASE_URL}competences`).then((response) => {
      setAllCompetences(response.data.results);
    });
  };

  const deleteFormationProgram = async (id) => {
    const alertParams = {
      title: "¿Está seguro de quitarle la competencia al programa de formación?",
      icon: "warning",
      id: formationProgram._id,
      path: `${BASE_URL}/formationprograms/deallocate/`,
      method:'POST',
      body: {competence: id}
    };
    alert(alertParams).then(() => {
      showFormationProgram(formationProgram._id);
      showCompetences();
    })
  };
  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  let competences = [];

  if (!search) {
    competences = competencesByProgram;
  } else {
    competences = competencesByProgram.filter((competence) =>
      competence.labor_competition
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
                <Col lg="8">
                  <h2>
                    COMPETENCIAS DEL PROGRAMA DE FORMACIÓN "{formationProgram.program_name}"
                    <AssignCompetences  program={formationProgram} competences={allCompetences}/>
                  </h2>
                </Col>

                <Col lg="4">
                  <div>
                    <input
                      value={search}
                      onChange={searcher}
                      type="search"
                      placeholder="search"
                      className="input"
                    />
                  </div>
                </Col>
              </CardHeader>
              <Table
                className=" table table-striped table-hover  shadow-lg align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Competencia laboral</th>
                    <th scope="col">Código de la competencia laboral</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {competences.map((competence, i = 0) => {
                      return (
                        <tr key={competence._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{competence.labor_competition}</td>

                          <td>{competence.labor_competence_code}</td>

                          <td>
                            <Button
                              variant=""
                              onClick={() =>
                                deleteFormationProgram(competence._id)
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

export default ProgramCompetences;
