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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../../src/components/Headers/header.css";
import { alert } from "plugins/alerts";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import Detailcontract from "./detailContract";
import "assets/css/indexCompetence.css";
import { allContractsService } from "services/contracts";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Swal from "sweetalert2";
import { deleteContractService } from "services/contracts";
import { contractsByTrainingCenterService } from "services/contracts";

const ListContract = () => {
const [ contracts, setContracts] = useState([]);

  const [search, setSearch] = useState("");

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // };

  const showContracts = async (id) => {
    const data = await contractsByTrainingCenterService(id)
    setContracts(data.results);
  };

  useEffect(() => {
    const idTrainingCenter = localStorage.getItem('training_center')
    showContracts(idTrainingCenter);
  }, []);

  const deleteContract = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar El Contrato?",
      icon: "warning"
    };
    const confirmed = await alert(alertParams);
    if (confirmed.isConfirmed) {
      const data = await deleteContractService(id)
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
    result = contracts;
  } else {
    result = contracts.filter((dato) =>
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
                    <th scope="col">#</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Número de contrato</th>
                    <th scope="col">Objeto</th>
                    <th scope="col">Pago</th>
                    <th scope="col">Fecha inicio</th>
                    <th scope="col">Fecha fin</th>
                    <th scope="col">Tipo de contrato</th>
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

                          <td>{contract.user.first_name} {contract.user.last_name}</td>
                          <td>{contract.contract_number}</td>
                          <td>{contract.object}</td>
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

export default ListContract;
