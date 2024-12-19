import React from "react";
import axios from "axios";

// reactstrap components
import {
    Card,
    CardImg,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import NavBar from "components/nav-bar.js";
import Footer from "components/footer.js";

class Earth extends React.Component {
    state = {
        earthData: null,
    };
    async componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;

        try {
            const response = await axios.get("https://api.nasa.gov/planetary/earth/assets?lon=100.75&lat=1.5&date=2014-02-01&dim=0.15&api_key=JJegN2BE7D0rdaXxhh7jr1ybIOh0I02PKDN798YJ");
            this.setState({ earthData: response.data });
        } catch (error) {
            console.error("Error fetching APOD data:", error);
        }
    }
    render() {
        const { earthData } = this.state;
        return (
            <>
                <NavBar />
                <main ref="main">
                    <div className="position-relative">
                        {/* shape Hero */}
                        <section className="section section-lg section-shaped">
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
                                                Earth Imagery
                                                <span>from NASA’s APIs</span>
                                            </h1>
                                            <p className="lead text-white">
                                                This endpoint retrieves the Landsat 8 image for the supplied location and date. The response will include the date and URL to the image that is closest to the supplied date.
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </section>
                        {/* 1st Hero Variation */}
                    </div>
                    <section className="section section-lg">
                        <Container>
                            <Row className="justify-content-center text-center mb-lg">
                                <Col lg="8">
                                    <h2 className="display-3">Dataset : {earthData && earthData.resource.dataset}</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mb-5 mb-md-0" md="12">
                                    <Card className="shadow border-0">
                                        {earthData && (
                                            <a href={earthData.url} target="_blank" rel="noopener noreferrer">
                                                <CardImg
                                                    alt={earthData.resource.dataset}
                                                    src={earthData.url}
                                                />
                                            </a>
                                        )}
                                    </Card>
                                    <div className="pt-4 text-center">
                                        {earthData && (
                                            <>
                                                <h5 className="title">
                                                    <span className="d-block mb-1">Service Version : {earthData.service_version}</span>
                                                    <small className="h6 text-muted">Date : {earthData.date}</small>
                                                </h5>
                                            </>
                                        )}
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

export default Earth;
