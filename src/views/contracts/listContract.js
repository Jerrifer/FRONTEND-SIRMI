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
import { alert } from "plugins/alerts";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import Detailcontract from "./detailContract";
import "assets/css/indexCompetence.css";

const ListContracte = () => {
const [ contract, setContract] = useState([]);

  const [search, setSearch] = useState("");

  const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // };

  const showContracts = async () => {
    await axios.get(`${BASE_URL}contracts`).then((response) => {
      setContract(response.data.results);
      console.log(response.data.results);
    });
  };

  useEffect(() => {
    showContracts();
  }, []);

  const deleteContract = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar El Contrato?",
      icon: "warning",
      id: id,
      path: `${BASE_URL}contracts/`,
      focus: 'El programa de formación'
    };
    alert(alertParams);
    showContracts();
  };
  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  let result = [];

  if (!search) {
    result = contract;
  } else {
    result = contract.filter((dato) =>
      dato.contract_number
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
                    to={`/admin/RegisterContracts`}
                    tag={NavLinkRRD}
                    activeclassname="active"
                  >
                    <button class="btn btn-success bg-success">
                      Registrar
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
                    <th scope="col">contract_number</th>
                    <th scope="col">object</th>
                    <th scope="col">pay</th>
                    <th scope="col">start_date</th>
                    <th scope="col">end_date</th>
                    <th scope="col">type_contract</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {result
                    .map((contract, i = 0) => {
                      return (
                        <tr key={contract._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{contract.contract_number}</td>

                          <td className="space">
                            {contract.object}
                          </td>

                          <td>{contract.pay}</td>

                          <td>{contract.start_date}</td>
                          <td>{contract.end_date}</td>
                          <td>{contract.type_contract}</td>

                          <td>
                            <Detailcontract
                              contract={contract}
                            />

                            <Link
                              to={`/admin/updateleContracts/${contract._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="">
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                            </Link>

                           



                            <Button
                              variant=""
                              onClick={() =>
                                deleteContract(contract._id)
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

export default ListContracte;
