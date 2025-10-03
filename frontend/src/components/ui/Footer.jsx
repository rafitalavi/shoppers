import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import styles from "./Footer.module.css"; // optional custom styles

const Footer = () => {
  return (
    <footer className={`bg-dark text-light pt-5 ${styles.footer}`}>
      <Container>
        <Row className="gy-4">
          {/* About Section */}
          <Col md={4}>
            <h5 className="fw-bold mb-3 text-uppercase">PremierShop</h5>
            <p className="small">
              PremierShop is your trusted destination for quality products at unbeatable prices. 
              Shop smarter with fast delivery and secure checkout.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h6 className="fw-bold mb-3 text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none d-block py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-light text-decoration-none d-block py-1">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-light text-decoration-none d-block py-1">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none d-block py-1">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none d-block py-1">
                  About Us
                </Link>
              </li>
            </ul>
          </Col>

          {/* Newsletter & Social */}
          <Col md={4}>
            <h6 className="fw-bold mb-3 text-uppercase">Stay Updated</h6>
            <Form className="d-flex mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="me-2"
              />
              <Button variant="primary" type="submit">
                Subscribe
              </Button>
            </Form>

            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5">
                <FaFacebookF />
              </a>
              <a href="#" className="text-light fs-5">
                <FaInstagram />
              </a>
              <a href="#" className="text-light fs-5">
                <FaTwitter />
              </a>
              <a href="#" className="text-light fs-5">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <Row>
          <Col className="text-center">
            <small>
              © {new Date().getFullYear()} <strong>PremierShop</strong>. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
