
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
import { alert } from "plugins/alerts";
import { Link, NavLink as NavLinkRRD, useParams } from "react-router-dom";
import DetailLearningResult from "./detailLearningResults";
import "assets/css/indexCompetence.css";
import { LearningResultByCompetenceService } from "services/learningResults";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Swal from "sweetalert2";
import { deleteLearningResultService } from "services/learningResults";
import Spinner from "../../components/loader"

const LearningResults = () => {

  const { id } =useParams()

  const [learningresult, setLearningresult] = useState([]);
  const [competence, setCompetence] = useState([]);
  const [ loading ,setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // const [userPerPage] = useState(5);
  const [currentPage] = useState(1);

  // const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  // const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  const showLearningresults = async (id) => {
    const data = await LearningResultByCompetenceService(id)
      setLearningresult(data.results.learningresults);
      setCompetence(data.results.competence);
      setLoading(false)
  };

  useEffect(() => {
    showLearningresults(id);
  }, [id, learningresult]);

  const deleteLearningResult = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar el resultado de aprendizaje ?",
      icon: "warning",
    };
    const confirmed = await alert(alertParams);

    if (confirmed.isConfirmed) {
      const data = await deleteLearningResultService(id)
      if(data.status === 'success'){
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          data.message,
          'success'
        )
      }
      else{
        swalWithBootstrapButtons.fire(
          'Error!',
          data.message,
          'error'
        )
      }
      } else if (
      confirmed.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado!',
        '',
        'info'
      )
    }
  };
  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  let result = [];

  if (!search) {
    result = learningresult;
  } else {
    result = learningresult.filter((dato) =>
      dato.learning_result.toLowerCase().includes(search.toLocaleLowerCase())
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
                  <h3>Resultados de aprendizaje de... {competence.labor_competition}
                    <Link
                      to={`/admin/RegisterLearningResult/${competence._id}`}
                      tag={NavLinkRRD}
                      activeclassname="active"
                    >
                      <button className="btn btn-success bg-success">
                        Registrar
                      </button>
                    </Link>
                  </h3>
                </Col>

                <Col lg="6">
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
                    <th scope="col">N°</th>

                    <th scope="col">Resultado de Aprendizaje</th>
                    
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {loading && < Spinner/>}

                  {result
                    .map((learningResult, i = 0) => {
                      return (
                        <tr key={learningResult._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td className="spaces">{learningResult.learning_result}</td>

                         
                          <td>
                            <DetailLearningResult learningResult={learningResult} competence={competence} />

                            <Link
                              to={`/admin/updatelearningResult/${learningResult._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant=""
                              id="btn-program-update">
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                              <UncontrolledTooltip
        className="tooltip-inner"
        delay={0}
        target="btn-program-update"
      >
        Actualizar
      </UncontrolledTooltip>
                            </Link>

                            <Button
                              variant=""id="btn-program-delete"
                              onClick={() => deleteLearningResult(learningResult._id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                            <UncontrolledTooltip
        className="tooltip-inner"
        delay={0}
        target="btn-program-delete"
      >
       eliminar
      </UncontrolledTooltip>
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

export default LearningResults;
