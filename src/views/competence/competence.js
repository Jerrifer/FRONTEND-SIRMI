import axios from "axios";

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    //   Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    // Progress,
    Table,
    Container,
    Row,
    //   UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from 'react';
//  import useModal from "../../hooks/useModal";
import UpdateModalComponent from "../../../src/views/competence/Updatemodal";
import { Button } from "react-bootstrap";
import '../../../src/components/Headers/header.css'
const Competence = () => {

    //    const [isOpenEditModal, OpenEditModal, closeEditModal] = useModal();



    const [competence, setCompetence] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/competences`).then(
            (res) => {
                setCompetence(res.data.data);
                console.log(res.data.data);
            })
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3000/api/v1/competences/${id}`)
            .then(res => {
                console.log(res)
                console.log(res.data)
                window.location.reload();
            }
            )
    }

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="    formulario ">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Competencias</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Norm</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Codigo de Competencias</th>
                                        <th scope="col">Duracion</th>
                                        <th scope="col">Programa de Formacion</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {competence.map((data) => {
                                        return (
                                            <tr key={data.id}>

                                                <td>{data._id}</td>

                                                <td>{data.name}</td>

                                                <td>
                                                    <Badge color="" className="badge-dot mr-4">
                                                        <i className="bg-warning" />
                                                        {data.norm}
                                                    </Badge>
                                                </td>

                                                <td>
                                                    {data.competition_code}
                                                </td>

                                                <td>

                                                    {data.duration}
                                                </td>

                                                <td>

                                                    {data.formationprograms}
                                                </td>
                                                <td>
                                                    <UpdateModalComponent id={data._id} name={data.name} email={data.email} />
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => deleteUser(data._id)}
                                                    >
                                                        <i className="ni ni-fat-remove" />
                                                    </Button>
                                                </td>

                                             

                                                <td className="text-right">
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            className="btn-icon-only text-light"
                                                            href="#pablo"
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <i className="fas fa-ellipsis-v" />
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                                            <DropdownItem
                                                                href="#pablo"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                Another action
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                href="#pablo"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                Something else here
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )}
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <Pagination
                                        className="pagination justify-content-end mb-0"
                                        listClassName="justify-content-end mb-0"
                                    >
                                        <PaginationItem className="disabled">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                2 <span className="sr-only">(current)</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                3
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className="fas fa-angle-right" />
                                                <span className="sr-only">Next</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>

            </Container>
        </>
    );
};

export default Competence;
