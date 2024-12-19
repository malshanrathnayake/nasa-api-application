import React from "react";
import axios from "axios";

// reactstrap components
import {
    Button,
    Card,
    CardImg,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroup,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import NavBar from "components/nav-bar.js";
import Footer from "components/footer.js";

class Mars extends React.Component {
    state = {
        roverPhotos: [],
        selectedCamera: "",
        searchQuery: "",
    };

    componentDidMount() {
        this.fetchRoverPhotos();
    }

    fetchRoverPhotos = async () => {
        const { selectedCamera, searchQuery } = this.state;
        let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=JJegN2BE7D0rdaXxhh7jr1ybIOh0I02PKDN798YJ`;

        if (selectedCamera) {
            apiUrl += `&camera=${selectedCamera}`;
        }

        try {
            const response = await axios.get(apiUrl);
            let data = response.data.photos;

            if (searchQuery) {
                data = data.filter(photo =>
                    photo.camera.full_name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            const shuffledPhotos = data.sort(() => Math.random() - 0.5);
            const randomPhotos = shuffledPhotos.slice(0, 12);
            this.setState({ roverPhotos: randomPhotos });
        } catch (error) {
            console.error("Error fetching rover photos:", error);
        }
    };

    handleCameraChange = (event) => {
        this.setState({ selectedCamera: event.target.value }, this.fetchRoverPhotos);
    };

    handleSearchInputChange = (event) => {
        this.setState({ searchQuery: event.target.value }, this.fetchRoverPhotos);
    };

    render() {
        const { roverPhotos, selectedCamera } = this.state;

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
                                                Mars Rover Photos
                                                <span>from NASA’s APIs</span>
                                            </h1>
                                            <p className="lead text-white">
                                                This API is designed to collect image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars and make it more easily available to other developers, educators, and citizen scientists.
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
                                    <h2 className="display-3">Images of Curiosity Rover {selectedCamera ? selectedCamera : ""} camera</h2>
                                </Col>
                            </Row>
                            <Row className="justify-content-center text-center mb-lg">
                                <Col lg="6">
                                    <FormGroup>
                                        <Input
                                            type="select"
                                            name="select"
                                            id="selectCamera"
                                            onChange={this.handleCameraChange}
                                            value={selectedCamera}
                                        >
                                            <option value="">Select Camera</option>
                                            <option value="FHAZ">FHAZ</option>
                                            <option value="NAVCAM">NAVCAM</option>
                                            <option value="MAST">MAST</option>
                                            <option value="CHEMCAM">CHEMCAM</option>
                                            <option value="MAHLI">MAHLI</option>
                                            <option value="MARDI">MARDI</option>
                                            <option value="RHAZ">RHAZ</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <InputGroup className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Search by camera name..."
                                            onChange={this.handleSearchInputChange}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button color="primary">Search</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                {roverPhotos.map((photo) => (
                                    <Col key={photo.id} className="mb-5 mb-md-0" md="4">
                                        <Card className="shadow border-0">
                                            <CardImg
                                                alt={photo.camera.full_name}
                                                src={photo.img_src}
                                                style={{ height: "300px" }}
                                            />
                                        </Card>
                                        <div className="pt-4 text-center">
                                            <h5 className="title">
                                                <span className="d-block mb-1">{photo.camera.full_name}</span>
                                                <small className="h6 text-muted">Earth Date {photo.earth_date}</small>
                                            </h5>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>
                </main>
                <Footer />
            </>
        );
    }
}

export default Mars;
