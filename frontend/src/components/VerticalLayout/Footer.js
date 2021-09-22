import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © EMS.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                Designed & Developed{" "}
                <i className="mdi mdi-heart text-danger"></i> by SquirrieLabs
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
