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

import UpdateModalComponent from "../../../src/views/competence/Updatemodal";
import { Button } from "react-bootstrap";
import "../../../src/components/Headers/header.css";
import PaginationData from "../../components/pagination/PaginationData";
import { BASE_URL } from "../../globals.constans";
import CreateModal from "./components/CreateModal";
// import './indexCompetence.css'

const Competence = () => {
  // console.log('compe');

  const [competence, setCompetence] = useState([]);
  const totalUsers = competence.length;
  // const totalUsers = competence;

  const [search, setSearch] = useState("");

  const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // const shoData = async () => {
  //   const response = await fetch(`${BASE_URL}competences`);
  //   const data = await response.json();
  //   setCompetence(data.results);
  //   // console.log(data.results)
  // };

  // useEffect(() => {
  //   shoData();
  // },[]);

  //funcion psrs trser los datos de la api
  useEffect(() => {
    axios.get(`${BASE_URL}competences`).then((res) => {
      setCompetence(res.data.results);
      console.log(res.data.results);
    });
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`${BASE_URL}competences/${id}`).then((res) => {
      console.log(res.data.results);
      window.location.reload();
    });
  };
  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value)
  };

  //metodo de filtrado

  let result = [];

  if (!search) {
    result = competence;
  } else {
    result = competence.filter((dato) =>
      dato.labor_competition
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
                <Col lg="5">
                  <h3 className="mb-0">Competencias</h3>
                </Col>
                <CreateModal />
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
                    <th scope="col">formation_programs</th>
                    {/* <th scope="col">Programa de Formación</th> */}
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {result
                    .map((data) => {
                      return (
                        <tr key={data._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-warning" />
                              {data.labor_competence_code}
                            </Badge>
                          </td>


                          <td className="space">{data.labor_competition}</td>
                          <td className="space">{data.labor_competition_version}</td>
                          <td>{data.duration}</td>
                          <td>{data.formation_programs}</td>

                          <td>
                            <UpdateModalComponent
                              id={data._id}
                              name={data.name}
                              email={data.email}
                            />
                            <Button
                              variant=""
                              onClick={() => deleteUser(data._id)}
                            >
                              x
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                    .slice((currentPage - 1) * 5, (currentPage - 1) * 5 + 5)}
                </tbody>
              </Table>

              <CardFooter className="py-4"></CardFooter>
              <PaginationData
                userPerPage={userPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalUsers={totalUsers}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Competence;
