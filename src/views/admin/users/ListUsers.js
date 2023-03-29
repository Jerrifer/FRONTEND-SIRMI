/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
// import EditUser from "./EditUser";

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
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    // Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
// core components
import AdminHeader from "../../../components/Headers/admin/AdminHeader";
import { useEffect, useState } from 'react';
import useModal from "../../../hooks/useModal";
import UpdateModalComponent from "./UpdateModalComponent";
import { Button } from "react-bootstrap";
import CreateModalComponent from "./CreateModalComponent";
import PaginationData from "../../../components/PaginationData"
import DeleteModalComponent from "./DeleteModalComponent";


const ListUsers = () => {

    const [isOpenEditModal, OpenEditModal, closeEditModal] = useModal();

    const [APIData, setAPIData] = useState([]);

    const totalUsers = APIData.length;

    const [user, setUser] = useState([]);

    const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
    const firstIndex = lastIndex - userPerPage;  // = 6 - 6 = 0


    const [userPerPage, setUserPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const getData = () => {
        axios.get(`http://localhost:3005/api/v1/users`)
            .then((res) => {
                        setAPIData(res.data);
                        // console.log(res.data);
                    })
    }

    useEffect (() => {
        getData()
    }, [getData]);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3005/api/v1/users/${id}`)
            .then(res => {
                getData();
            }
        )
    }

    const paginateData = (req, res) => {
        const page = req.query.page;
        const limit = req.query.limit;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        results.next = {
            page: page + 1,
            limit: limit
        }
        results.previous = {
            page: page - 1,
            limit: limit
        }
        results.results = APIData.slice(startIndex, endIndex);
        res.json(results);
    }

    return (
        <>
            <AdminHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Card tables <CreateModalComponent/></h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Project</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Users</th>
                                        <th scope="col">Actions</th>
                                        {/* <th scope="col">Completion</th> */}
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                {APIData.map((data) => {
                                        return (
                                        <tr key={data.id}>
                                            <th scope="row">
                                                <Media className="align-items-center">
                                                    <a
                                                        className="avatar rounded-circle mr-3"
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <img
                                                            alt="..."
                                                            src={require("../../../assets/img/theme/User_default3.png")}
                                                        />
                                                    </a>
                                                    <Media>
                                                        <span className="mb-0 text-sm">
                                                            User
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                            <td>{data.name}</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    {data.email}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="avatar-group">
                                                    <a
                                                        className="avatar avatar-sm"
                                                        href="#pablo"
                                                        id="tooltip742438047"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <img
                                                            alt="..."
                                                            className="rounded-circle"
                                                            src={require("../../../assets/img/theme/team-1-800x800.jpg")}
                                                        />
                                                    </a>
                                                    <UncontrolledTooltip
                                                        delay={0}
                                                        target="tooltip742438047"
                                                    >
                                                        Ryan Tompson
                                                    </UncontrolledTooltip>
                                                    <a
                                                        className="avatar avatar-sm"
                                                        href="#pablo"
                                                        id="tooltip941738690"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <img
                                                            alt="..."
                                                            className="rounded-circle"
                                                            src={require("../../../assets/img/theme/team-2-800x800.jpg")}
                                                        />
                                                    </a>
                                                    <UncontrolledTooltip
                                                        delay={0}
                                                        target="tooltip941738690"
                                                    >
                                                        Romina Hadid
                                                    </UncontrolledTooltip>
                                                    <a
                                                        className="avatar avatar-sm"
                                                        href="#pablo"
                                                        id="tooltip804044742"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <img
                                                            alt="..."
                                                            className="rounded-circle"
                                                            src={require("../../../assets/img/theme/team-3-800x800.jpg")}
                                                        />
                                                    </a>
                                                    <UncontrolledTooltip
                                                        delay={0}
                                                        target="tooltip804044742"
                                                    >
                                                        Alexander Smith
                                                    </UncontrolledTooltip>
                                                    <a
                                                        className="avatar avatar-sm"
                                                        href="#pablo"
                                                        id="tooltip996637554"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <img
                                                            alt="..."
                                                            className="rounded-circle"
                                                            src={require("../../../assets/img/theme/team-4-800x800.jpg")}
                                                        />
                                                    </a>
                                                    <UncontrolledTooltip
                                                        delay={0}
                                                        target="tooltip996637554"
                                                    >
                                                        Jessica Doe
                                                    </UncontrolledTooltip>
                                                </div>
                                            </td>
                                            <td>
                                                <UpdateModalComponent id={data._id} name={data.name} email={data.email}/>
                                                {/* <Button
                                                    variant="danger"
                                                    onClick={() => deleteUser(data._id)}
                                                >
                                                    <i className="ni ni-fat-remove" />
                                                </Button> */}
                                                <DeleteModalComponent id={data._id}/>
                                            </td>

                                            {/* <td>
                                                <div className="d-flex align-items-center">
                                                    <span className="mr-2">60%</span>
                                                    <div>
                                                        <Progress
                                                            max="100"
                                                            value="60"
                                                            barClassName="bg-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </td> */}
                                            
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
                                ).slice( 
                                    (currentPage - 1) * 5,
                                    (currentPage - 1) * 5 + 5
                                )}
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                    {/* <Pagination
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
                                    </Pagination> */}
                            </CardFooter>
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

export default ListUsers;
