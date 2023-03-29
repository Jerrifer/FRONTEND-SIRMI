<<<<<<< HEAD
// import { useHistory } from "react-router-dom";
=======
import { useHistory, } from "react-router-dom";
>>>>>>> 465ac4f23467a98136b14252d741b4b4c0d77cb0

// reactstrap components
// import { Button, Container, Row, Col } from "reactstrap";

const AdminHeader = () => {

<<<<<<< HEAD
  // const navigate = useHistory();
=======
  // eslint-disable-next-line no-unused-vars
  const navigate = useHistory();
>>>>>>> 465ac4f23467a98136b14252d741b4b4c0d77cb0

  // const handleClickCreate = (e) => {
  //   navigate.push('/admin/users/create-user');
  //   e.preventDefault();
  // }
  
  return (

    <>
<<<<<<< HEAD
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="17" md="11">
              <h1 className="display-2 text-white">Hello Admin</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <Button
                color="info"
                href="/admin/users/list-users"
                // onClick={(e) => e.preventDefault()}
              >
                List users
              </Button>
              <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                List a user
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
=======
>>>>>>> 465ac4f23467a98136b14252d741b4b4c0d77cb0
    </>
  );
};

export default AdminHeader;
