import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DemoNavbar extends React.Component {

  handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('tokenExpiration');

    toast.success("Logging Out", {
      position: 'top-right',
      autoClose: 600,
      onClose: ()=> {
        window.location.href = "/";
      }
    });
  };

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/landing-page" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/nasa-logo.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/landing-page">
                        <img
                          alt="..."
                          src={require("assets/img/brand/nasa-logo-black.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/mars-rover">
                      Mars Rover Photos
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/apod">
                      Astronomy Picture of the Day
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/earth-imagery">
                      Earth Imagery
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-lg-auto" navbar>
                  {/* <NavItem>
                    <NavLink tag={Link} to="/profile-page">
                      Profile
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink tag={Link} onClick={this.handleLogout}>
                      Logout
                    </NavLink>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
