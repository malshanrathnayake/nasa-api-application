import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import NavBar from "components/nav-bar.js";
import Footer from "components/footer";

class Landing extends React.Component {
  state = {
    apodData: null,
  };
  async componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    try {
      const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=JJegN2BE7D0rdaXxhh7jr1ybIOh0I02PKDN798YJ");
      this.setState({ apodData: response.data });
    } catch (error) {
      console.error("Error fetching APOD data:", error);
    }
  }
  render() {
    const { apodData } = this.state;

    return (
      <>
        <NavBar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white">
                        Utilizing different endpoints
                        <span>from NASA’s APIs</span>
                      </h1>
                      <p className="lead text-white">
                        Access various NASA API endpoints to explore celestial data, images, and information, fostering innovation and discovery.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
          <section className="section section-lg pt-lg-0 mt--200">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h6 className="text-primary text-uppercase">
                            Mars Rover Photos
                          </h6>
                          <p className="description mt-3">
                            Discover Mars up close with stunning photos from NASA's rovers.
                          </p>
                          {/* <div>
                            <Badge color="primary" pill className="mr-1">
                              design
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              system
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              creative
                            </Badge>
                          </div> */}
                          <Button
                            className="mt-4"
                            color="primary"
                            tag={Link}
                            to="/mars-rover"
                          >
                            Explore
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-istanbul" />
                          </div>
                          <h6 className="text-success text-uppercase">
                            Astronomy Picture of the Day
                          </h6>
                          <p className="description mt-3">
                            Astronomy Picture of the Day: Daily celestial wonders and expert commentary.
                          </p>
                          {/* <div>
                            <Badge color="success" pill className="mr-1">
                              business
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                              vision
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                              success
                            </Badge>
                          </div> */}
                          <Button
                            className="mt-4"
                            color="success"
                            tag={Link}
                            to="/apod"
                          >
                            Explore
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-planet" />
                          </div>
                          <h6 className="text-warning text-uppercase">
                            Earth Imagery
                          </h6>
                          <p className="description mt-3">
                            Earth Imagery: High-res satellite photos capturing our planet's beauty from space.
                          </p>
                          {/* <div>
                            <Badge color="warning" pill className="mr-1">
                              marketing
                            </Badge>
                            <Badge color="warning" pill className="mr-1">
                              product
                            </Badge>
                            <Badge color="warning" pill className="mr-1">
                              launch
                            </Badge>
                          </div> */}
                          <Button
                            className="mt-4"
                            color="warning"
                            tag={Link}
                            to="/earth-imagery"
                          >
                            Explore
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg">
            <Container>
              <Row className="row-grid align-items-center">
                <Col md="6">
                  <Card className="bg-default shadow border-0">
                    {apodData && apodData.url && (
                      <a href={apodData.url} target="_blank" rel="noopener noreferrer">
                        <CardImg
                          alt={apodData.title}
                          src={apodData.url}
                          top
                        />
                      </a>
                    )}
                    <blockquote className="card-blockquote">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-bg"
                        preserveAspectRatio="none"
                        viewBox="0 0 583 95"
                      >
                        <polygon
                          className="fill-default"
                          points="0,52 583,95 0,95"
                        />
                        <polygon
                          className="fill-default"
                          opacity=".2"
                          points="0,42 583,95 683,0 0,95"
                        />
                      </svg>
                      <h4 className="display-3 font-weight-bold text-white">
                        NASA Image of the Day
                      </h4>
                      <p className="lead text-italic text-white">
                        Explore captivating images from NASA's vast collection, updated daily.
                      </p>
                    </blockquote>
                  </Card>
                </Col>
                <Col md="6">
                  <div className="pl-md-5">
                    <h3>{apodData && apodData.title}</h3>
                    <p className="lead">
                      Delve into the wonders of space with NASA's Image of the Day API. Discover stunning visuals captured by satellites, telescopes, and spacecraft from across the universe.
                    </p>
                    <p>
                      Enhance your understanding of celestial phenomena and immerse yourself in the beauty of the cosmos through high-resolution imagery and detailed descriptions provided by NASA's vast database.
                    </p>
                    <Link
                      className="font-weight-bold text-warning mt-5"
                      to="/apod"
                    >
                      Discover More Images
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default Landing;
