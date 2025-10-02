import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Spinner, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import api from "../../api"; // use the axios instance

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const renderCategoriesDropdown = () => {
    if (loading) {
      return (
        <NavDropdown 
          title={
            <span className="d-flex align-items-center">
              Categories
              <Spinner animation="border" size="sm" className="ms-2" />
            </span>
          } 
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
        {categories.length === 0 ? (
          <NavDropdown.ItemText className="text-muted">
            No categories available
          </NavDropdown.ItemText>
        ) : (
          categories.map(cat => (
            <div key={cat.id}>
              {/* Category Header */}
              <LinkContainer to={`/category/${cat.slug}`}>
                <NavDropdown.Item className="fw-bold text-dark">
                  {cat.name} 
                </NavDropdown.Item>
              </LinkContainer>

              {/* Subcategories */}
              {cat.subcategories.map(sub => (
                <LinkContainer key={sub.id} to={`/subcategory/${sub.slug}`}>
                  <NavDropdown.Item className="ps-4">{sub.name}</NavDropdown.Item>
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
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/products">
                <Nav.Link>All Products</Nav.Link>
              </LinkContainer>

              {renderCategoriesDropdown()}

              <LinkContainer to="/deals">
                <Nav.Link className="text-danger">Special Offers</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="align-items-center">
              <LinkContainer to="/signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
