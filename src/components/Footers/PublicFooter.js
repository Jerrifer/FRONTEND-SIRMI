
/*eslint-disable*/

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="py-5">
    <Container>
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://www.creative-tim.com?ref=adr-auth-footer"
              target="_blank"
            >
              Fabrica de Software
            </a>
          </div>
        </Col>
       y
      </Row>
    </Container>
  </footer>
  );
};

export default Footer;
