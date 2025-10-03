import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Spinner, Alert, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import { useLocation } from "react-router-dom"; // ✅ import
import api from "../../api";
import styles from './NavBar.module.css'

const NavBar = () => {
  const location = useLocation(); // ✅ current route
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const [categoriesRes, subcategoriesRes] = await Promise.all([
          api.get("/categories/"),
          api.get("/subcategories/")
        ]);

        const categoriesWithSubs = categoriesRes.data.map(cat => ({
          ...cat,
          subcategories: subcategoriesRes.data.filter(sub => sub.category_id === cat.id)
        }));

        setCategories(categoriesWithSubs);
      } catch (err) {
        console.error("Failed to fetch navigation data:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await api.get("/cart/count/");
        setCartCount(res.data.count);
      } catch {
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, []);

  const renderCategoriesDropdown = () => {
    if (loading) {
      return (
        <NavDropdown 
          title={<span className="d-flex align-items-center">Categories <Spinner animation="border" size="sm" className="ms-2" /></span>} 
          id="categories-dropdown"
          disabled
        >
          <NavDropdown.ItemText>Loading categories...</NavDropdown.ItemText>
        </NavDropdown>
      );
    }

    if (error) {
      return (
        <NavDropdown title="Categories" id="categories-dropdown" disabled>
          <NavDropdown.ItemText className="text-danger">
            <small>Failed to load categories</small>
          </NavDropdown.ItemText>
        </NavDropdown>
      );
    }

    return (
      <NavDropdown title="Categories" id="categories-dropdown">
        <LinkContainer to="/products">
          <NavDropdown.Item className={location.pathname === "/products" ? "fw-bold text-primary" : "fw-bold"}>
            All Products
          </NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />

        {categories.length === 0 ? (
          <NavDropdown.ItemText className="text-muted">
            No categories available
          </NavDropdown.ItemText>
        ) : (
          categories.map(cat => (
            <div key={cat.id}>
              <LinkContainer to={`/category/${cat.slug}`}>
                <NavDropdown.Item className={location.pathname === `/category/${cat.slug}` ? "fw-bold text-primary" : "fw-bold text-dark"}>
                  {cat.name}
                </NavDropdown.Item>
              </LinkContainer>

              {cat.subcategories.map(sub => (
                <LinkContainer key={sub.id} to={`/subcategory/${sub.slug}`}>
                  <NavDropdown.Item className={location.pathname === `/subcategory/${sub.slug}` ? "ps-4 text-primary" : "ps-4"}>
                    {sub.name}
                  </NavDropdown.Item>
                </LinkContainer>
              ))}

              <NavDropdown.Divider />
            </div>
          ))
        )}
      </NavDropdown>
    );
  };

  return (
    <>
      {error && (
        <Alert variant="warning" className="mb-0 py-2 text-center">
          <small>{error}</small>
        </Alert>
      )}

      <Navbar bg="white" expand="lg" className="border-bottom shadow-sm" sticky="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold text-primary">PremierShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link className={location.pathname === "/" ? "text-primary fw-bold" : ""}>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/products">
                <Nav.Link className={location.pathname === "/products" ? "text-primary fw-bold" : ""}>All Products</Nav.Link>
              </LinkContainer>

              {renderCategoriesDropdown()}

              <LinkContainer to="/deals">
                <Nav.Link className={location.pathname === "/deals" ? "text-danger fw-bold" : "text-danger"}>Special Offers</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="align-items-center">
              <LinkContainer to="/cart">
                <Nav.Link className="position-relative">
                  <FaCartShopping size={20} />
                  {cartCount > 0 && (
                    <Badge 
                      bg="danger" 
                      pill 
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/signup">
                <Nav.Link className={location.pathname === "/signup" ? "text-primary fw-bold" : ""}>Sign Up</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link className={location.pathname === "/login" ? "text-primary fw-bold" : ""}>Log In</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
